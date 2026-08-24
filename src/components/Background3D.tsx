import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { WebGLFallback } from './WebGLFallback';

// WebGL availability detection helper
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

// Abstract morphing particle wave system (Mobile Optimized)
const MorphingParticles = ({ scrollRatio, isMobile }: { scrollRatio: number; isMobile: boolean }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const numPoints = isMobile ? 800 : 2000;
  const gridDim = Math.sqrt(numPoints);

  // Generate round glowing particle texture (avoiding blocky squares)
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.Texture();

    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    return new THREE.CanvasTexture(canvas);
  }, []);

  // Precompute states in memory
  const states = useMemo(() => {
    const arr = [];
    
    // State 0: Horizontal wave grid
    const pos0 = new Float32Array(numPoints * 3);
    for (let i = 0; i < numPoints; i++) {
      const x = (i % gridDim) - gridDim / 2;
      const y = Math.floor(i / gridDim) - gridDim / 2;
      pos0[i * 3] = x * (isMobile ? 0.28 : 0.35);
      pos0[i * 3 + 1] = y * (isMobile ? 0.28 : 0.35);
      pos0[i * 3 + 2] = Math.sin(x * 0.25) * Math.cos(y * 0.25) * (isMobile ? 0.5 : 0.8);
    }
    arr.push(pos0);

    // State 1: Double-peak wave
    const pos1 = new Float32Array(numPoints * 3);
    for (let i = 0; i < numPoints; i++) {
      const x = (i % gridDim) - gridDim / 2;
      const y = Math.floor(i / gridDim) - gridDim / 2;
      pos1[i * 3] = x * (isMobile ? 0.26 : 0.32);
      pos1[i * 3 + 1] = y * (isMobile ? 0.26 : 0.32);
      pos1[i * 3 + 2] = (Math.sin(x * 0.4) * (isMobile ? 0.5 : 0.8)) + (Math.cos(y * 0.4) * (isMobile ? 0.5 : 0.8));
    }
    arr.push(pos1);

    // State 2: Dynamic spiral vortex
    const pos2 = new Float32Array(numPoints * 3);
    for (let i = 0; i < numPoints; i++) {
      const theta = i * 0.08;
      const r = Math.sqrt(i) * (isMobile ? 0.12 : 0.16);
      pos2[i * 3] = r * Math.cos(theta);
      pos2[i * 3 + 1] = r * Math.sin(theta);
      pos2[i * 3 + 2] = Math.sin(r * 2) * (isMobile ? 0.4 : 0.6);
    }
    arr.push(pos2);

    // State 3: Holographic 3D Sphere
    const pos3 = new Float32Array(numPoints * 3);
    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(2 * (i / numPoints) - 1);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      const radius = isMobile ? 1.6 : 2.4;
      pos3[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos3[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos3[i * 3 + 2] = radius * Math.cos(phi);
    }
    arr.push(pos3);

    // State 4: Tunnel/Tube Cylinder
    const pos4 = new Float32Array(numPoints * 3);
    const circumferencePoints = isMobile ? 25 : 40;
    const spacingZ = isMobile ? 0.18 : 0.12;
    for (let i = 0; i < numPoints; i++) {
      const theta = (i % circumferencePoints) * (Math.PI * 2 / circumferencePoints);
      const z = Math.floor(i / circumferencePoints) * spacingZ - (isMobile ? 2.5 : 3.0);
      const radius = isMobile ? 1.1 : 1.6;
      pos4[i * 3] = radius * Math.cos(theta);
      pos4[i * 3 + 1] = radius * Math.sin(theta);
      pos4[i * 3 + 2] = z;
    }
    arr.push(pos4);

    return arr;
  }, [gridDim, isMobile, numPoints]);

  // Attribute buffers
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(numPoints * 3);
    const col = new Float32Array(numPoints * 3);
    return [pos, col];
  }, [numPoints]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();

    const scaledRatio = scrollRatio * 4;
    const index = Math.min(Math.floor(scaledRatio), 3);
    const fraction = scaledRatio - index;

    const fromState = states[index];
    const toState = states[index + 1];

    const teal = new THREE.Color('#087f8c');
    const magenta = new THREE.Color('#d61a7a');
    const coral = new THREE.Color('#f37021');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < numPoints; i++) {
      const i3 = i * 3;

      const x1 = fromState[i3];
      const y1 = fromState[i3 + 1];
      const z1 = fromState[i3 + 2];

      const x2 = toState[i3];
      const y2 = toState[i3 + 1];
      const z2 = toState[i3 + 2];

      let currX = THREE.MathUtils.lerp(x1, x2, fraction);
      let currY = THREE.MathUtils.lerp(y1, y2, fraction);
      let currZ = THREE.MathUtils.lerp(z1, z2, fraction);

      if (index === 0 || index === 1) {
        currZ += Math.sin(t * 1.5 + currX * 0.5) * (isMobile ? 0.1 : 0.15);
      } else if (index === 2) {
        currZ += Math.cos(t * 2.0 + Math.sqrt(currX * currX + currY * currY)) * (isMobile ? 0.06 : 0.1);
      } else if (index === 3) {
        const pulse = 1 + Math.sin(t * 1.2) * 0.03;
        currX *= pulse;
        currY *= pulse;
        currZ *= pulse;
      }

      positions[i3] = currX;
      positions[i3 + 1] = currY;
      positions[i3 + 2] = currZ;

      let targetColor = teal;
      if (scrollRatio < 0.25) {
        targetColor = Math.sin(currX * 0.3 + t) > 0.5 ? white : teal;
      } else if (scrollRatio < 0.5) {
        const blend = (scrollRatio - 0.25) / 0.25;
        targetColor = teal.clone().lerp(magenta, blend);
      } else if (scrollRatio < 0.75) {
        const blend = (scrollRatio - 0.5) / 0.25;
        targetColor = magenta.clone().lerp(coral, blend);
      } else {
        const blend = (scrollRatio - 0.75) / 0.25;
        targetColor = coral.clone().lerp(teal, blend);
      }

      colors[i3] = targetColor.r;
      colors[i3 + 1] = targetColor.g;
      colors[i3 + 2] = targetColor.b;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;

    pointsRef.current.rotation.y = t * 0.03;
    pointsRef.current.rotation.z = Math.sin(t * 0.05) * 0.05;

    // React to mouse movement
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, mouse.x * 0.3, 0.05);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, mouse.y * 0.3, 0.05);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.075 : 0.065}
        sizeAttenuation={true}
        map={particleTexture}
        vertexColors={true}
        transparent={true}
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Scene camera coordinator
const ScrollingScene = ({ isMobile }: { isMobile: boolean }) => {
  const { camera } = useThree();
  const [scrollVal, setScrollVal] = useState(0);

  useFrame(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    setScrollVal(ratio);

    // Responsive camera pan & zoom metrics
    const panLimit = isMobile ? 0.4 : 1.8;
    const baseZoom = isMobile ? 6.8 : 6.0;
    const tubeZoom = isMobile ? 3.0 : 2.0;

    let targetCam = new THREE.Vector3(0, 0, baseZoom);
    let targetLook = new THREE.Vector3(0, 0, 0);

    if (ratio < 0.25) {
      // Home
      targetCam.set(0, isMobile ? 0.2 : 0.8, baseZoom);
      targetLook.set(0, 0, 0);
    } else if (ratio < 0.5) {
      // About: Pan camera slightly left to place particles right
      const t = (ratio - 0.25) / 0.25;
      targetCam.lerpVectors(new THREE.Vector3(0, isMobile ? 0.2 : 0.8, baseZoom), new THREE.Vector3(-panLimit, 0.4, baseZoom - 0.5), t);
      targetLook.lerpVectors(new THREE.Vector3(0, 0, 0), new THREE.Vector3(isMobile ? 0 : 0.5, 0, 0), t);
    } else if (ratio < 0.75) {
      // Services: Shift camera to place particles left
      const t = (ratio - 0.5) / 0.25;
      targetCam.lerpVectors(new THREE.Vector3(-panLimit, 0.4, baseZoom - 0.5), new THREE.Vector3(panLimit, -0.2, baseZoom - 0.2), t);
      targetLook.lerpVectors(new THREE.Vector3(isMobile ? 0 : 0.5, 0, 0), new THREE.Vector3(isMobile ? 0 : -0.5, 0, 0), t);
    } else {
      // Portfolio & Designs: Dive down the center of the cylinder tunnel
      const t = (ratio - 0.75) / 0.25;
      targetCam.lerpVectors(new THREE.Vector3(panLimit, -0.2, baseZoom - 0.2), new THREE.Vector3(0, 0, tubeZoom), t);
      targetLook.lerpVectors(new THREE.Vector3(isMobile ? 0 : -0.5, 0, 0), new THREE.Vector3(0, 0, -1.0), t);
    }

    camera.position.lerp(targetCam, 0.04);
    const currentLook = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
    currentLook.lerp(targetLook, 0.04);
    camera.lookAt(currentLook);
  });

  return (
    <>
      <ambientLight intensity={0.9} />
      <MorphingParticles scrollRatio={scrollVal} isMobile={isMobile} />
    </>
  );
};

export const Background3D: React.FC = () => {
  const [webGLOk, setWebGLOk] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setWebGLOk(isWebGLAvailable());
    
    // Track mobile viewports
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!webGLOk) {
    return <WebGLFallback />;
  }

  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[#020202]">
      {/* Background blueprint grid dots */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      <Canvas 
        camera={{ fov: 60, position: [0, 0.8, 6.0] }} 
        dpr={typeof window !== 'undefined' && window.devicePixelRatio > 1.5 ? 1.5 : 1}
      >
        <ScrollingScene isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default Background3D;
