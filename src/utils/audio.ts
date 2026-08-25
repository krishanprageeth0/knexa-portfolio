const HOVER_BASE64 = 'UklGRmQBAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YUABAADK9/bHfTULEECJzfDlsGgrESZgptrnxohGHyJOj8jfypRUKidNisHXxJBVLzBYksLQtYBLMT9upMfDnWc/OVmMuMSqek08UX6sv66DVkFQeqa6rINYRlV+pralfFZKX4eqsZlwUlFtla2nh2JRXoGiq5ZyV1h0l6idfV9YbI6koIRlWWmJoZ+GaFxqiJ6dhWlebYqemYFnYXOOnZR6ZWV7k5uMcmRshJeWgWtmd46YjHVnboSVkn5sanyQlIZxanaKlIp2a3OGkox6bXGDkY18bnGCj419b3KCj4x8cHODjop7cHWEjoh4cXiHjYR2cnyJi4B0dICLiHtzeIWLg3d0fomJfXR4g4qDeHV+iId9dXmEiYF3d4CIhXt2fYaHfnd6hIeAeHmCh4J5eICGg3t4foaEfHh+hYR9eH2EhH15fQ==';
const CLICK_BASE64 = 'UklGRgQCAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YeABAACfvt373L2egGNGKQ0lQl56lbDK5Ni+o4pwWD8nJD1VbYWcssjdxq+Zg25ZRTAyR1xwhJeqvc+/rJqHdWNSQTZIWWp7i5yru8GxoZGCc2RVR0JRX258ipeksbmsnpGEeGxfU0hSXmp2go2Yo66topeMgndtY1lQWGJsdoCJkpukqqCXjoZ9dGxkXFhhaXF5gYmQl5+jnJSNhn94cWpkXWNpcHd9g4mPlZuclpCKhH95dG5pZGZrcXZ7gIWKj5SYlpGMh4N+enVxbWlpbnJ2en6ChoqOkpSQjYmFgn57d3RwbW1wc3d6fYCDhomMj5CNioeEgX58eXd0cW9xdHd5fH6Bg4WHioyNi4iGhIKAfnt5d3Z0cnR2eHp8foCBg4WHiIqKiIaFg4GAfn17enh3dXV3eHp7fX5/gYKDhIaHiIeGhIOCgYB/fXx7enl4d3h5ent8fX5/gIGCg4OEhYaFhIODgoGAf35+fXx7e3p5eXp7e3x9fX5/f4CBgYKCg4SEhIODgoGBgIB/f35+fX18fHt7ent8fHx9fX5+f3+AgICBgYGCgoODgoKCgYGAgIB/f39+fn5+fX19fHx8fHx9fX19fn5+f39/f4CAgICAgYGBgYGCgYGBgYGAgICAgH9/f38=';
const SUCCESS_BASE64 = 'UklGRoQJAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YWAJAAB/qMrf5Nm/mnBJLBwcLUxznMDZ493HpXxUNCAcKENokLbS4d/Or4hgPSUcJDpdhKvL3eDTuJNrRyweITNSeaDC2ODYwJ53UTMiIC5JbZW40t7byKmDXDsmIClBY4muy9zczrKOZ0UsISY5WX6kw9fd0rqYck4zJCQzT3OZutLc1sKifVk6JyMuR2iOsczZ2MisiGNDLCQqP16Dp8TW2c20k25MMiYoOVV4nbzR2dG8nXlVOSknM0xukrPM19TDpoNgQS0nL0VkiKrF1NXIr41qSjMoLD5bfaC90NXMtpd0UzkrKzlSc5a1y9TQvaF+XEAuKjRKaYysxdLRw6mIZkgzKzFDYIKjvs/SyLGScFA5LS8+WHiat8vSy7ibelk/MC45UG+Qr8XQzr6khGNHNC41SWWGpr/Nz8OsjWxOOS8yQ119nbjKz8ezlnZXPzExPlVzlLDFzsq5n39gRTUxOU5qiqi/zMu+p4hpTTkxNkhigaC5yczCrpFyVT8zNUJaeJeyxMvGtJp7XUU2ND5Tb46qn77Pz72cdE4yJy9Kb5i6z9HBpIBeRTtAU26KoKysopF+b2hpcXyGjIqDd2xlZm+AlKawrqGJbFE+OkVfgaXB0My4lm9LMis2UnabucrJuJt6XUlDS111jZ2lopeIeXBucnyFjI2He25jX2RyhputtbCfhGZLOzlIY4epw8/IspBqSTQxPll8nrjDwK6Tdl5PTFZnfI6ZnJeMgHZydHyFjZCNgnRlXFpjdYyis7iwnH9hRzk6S2mMrcTMw6uKZkk4N0ZhgZ+0vLaljHNgVVZgcIGOlZSNg3p0dXuFjpSTi31tXlZYZHiRqLe6r5h6XEQ5PVBukK/DyL2khGNJPD5PaIafsLWtnIZxYlxfaneEjY+Lg3t1dHiCjZaZlYl4ZlhRVmV9l626u62UdlhCOUBVc5SxwsS3nn9hS0JGV2+JnqutpJSBcWZkaXN+h4uJg3t0cXR9iZWdnZaGc2BSTlZogZuxvLqqkHFVQTxFW3mYsb++sJd6YE5ITl91i52lpJuMfXFra3J7g4iIg3tzbm51gYqltrWjhGJIPkdggqG2uq6XfGZZWWJwfYWIh4WFiY6Tk4x+bV5XW2qBmKisoo11YVhdboSYop2MdWBVWm2Jpba2pIZjSD1EXX+ht72ymn1kVlVfb3+Kj42IhIOGio2KgnVoYGBqfI+epJ6PemlfYm+Ck5yZinViWF1uiaO0taSHZUo9Q1t9n7e/tJx+Y1NRXG6Bj5SSioN+f4OHiYV9cmlmanageGlZybkIBxZ2hxgI6Wk4d2ZVxgcIihsbKjiGdMP0RbfJ62v7WdfmNST1pug5KZloyCenh8goeIg3pxampyfouVl5GGeW9tcn2Ij46Fd2lhZHKInq2voohpT0FGW3qctL21nX9jUU5ZboSVnJiOgHZzdn6Gi4qCeG9rbXeDjpSTi4F3cnR6g4mJg3htZml1iJypq5+Ia1JFSFt5mbK7tJ2AZFJOWW6Elp6ajn9zbnF7ho2PiX5za2pwe4eRlJCIfnd1d32ChIB5cWxueIeYpKach25XSkxdeJauuLGdgWZUUFpuhZefm49+cWtteIWLoaSTdVtUYn6YopmFcm12hpCNf25lanmIj4qAen+Nm5yKbE9EUnWduLmkg2hdY3F8gH17gIqUlYl0Y2BviqGnmHpeUlx2kaCci3lxd4ONi35uZWp5iZGOg3p7h5WZjHJXSVNyl7K3pIVqXmJwfYKAfX+IkZKIdmVhboigqJx/YVJYb4udnpF/dXeBiYh8bmVqeYqUkYV6eIGPlo54Xk9Vb5Kts6SHbF9jcH6Eg39/hY2PiHdnYm6Gnqmeg2VSVGmGm6CWhXl4foWFe25manmLlpSIenV8iZKPfmZWWG2Mpq+jiW9hY3B/hoWAfoKJjYd5amVuhJyooIdoU1JkgZihmop9eHyCgnpuZ2t6jJeWintzd4OPkINtXFprh6CqoYpyZGVxf4eGgX1/hYqHe25nboKZpqGKa1RQYHyWop2PgHl6fn95b2lseoyYl4t7cXN+jJCHdGNeaYGZpZ+LdWdncoCIh4F8fIKHh35xam+AlqShjG5XUF54k6KgkoN5eHt9eHBrbnuMmJiMe29veomQi3tpYWh8k6CdjXhqaXOAiYiBe3p/hYaAdW1wf5OhoI5yWVFcdZChopWFenZ5enhxbW97i5iZjXxubHaGkI+Bb2RoeIybm417bmx0gYmIgXl3fIOGgnlxcX2Pnp6PdVxSW3KNoKOYh3p1dnh3c29xfIuXmI58bmpzg5CRhnVoZ3SGlZiOfnFvdoGJiIF4dXmBhoV9dHN8jJqckHhgVFtwi56jmYl7dHR3d3Rxc3yKlpiOfW5ocICPlIt6a2dwgZCVjoF1cneBiIiAd3N3f4aHgHh1e4iWmpB7ZFdbb4icopqKe3Nzdnd2c3R8iZSXjn5uaG5+jpWPf29nbXyLko+EeXV5gYiHgHZydX2GiYR7dnmFkZeQfWhaXG2GmqGbi3xzcnV4d3V2fIeSlY5/b2dtfI2WkoNyaGp3ho+Phnx4eoGHhn91cHN8hoqHf3h4gY2Uj4BsXl5tg5egm4x9c3F1eHl3d3yGkJSOf3BobHuMl5SHdWloc4KNj4mAe3yBhoV+dW9ye4aMioJ6eH6JkI6CcGJgbIGUnpqMfXNxdHl6eXl8hI2SjYByaWx5i5aWinhqZ29+io+Lg319gYWEfXRvcXqGjYyEe3d7hY2NhHRmY2x/kZuZjX50cXV6fHt6fIOLj4yBc2pseImWl4x6a2ZseoiOjYaAfoGEg3x0b3B5hY6Oh313eIGKjIV4a2ZtfY6Yl4x/dHJ1en19e3yBiI2LgnVsbXeIlZeOfGxlaneFjo6Jgn+AgoF8dG9weYWOkIl+dnZ9houHe29pbXuLlZWMf3Vydnt/fnx8f4aLioN3bm53hpOXj35uZWl1g42Pi4SAgIGAe3RvcHiFj5GLgHZ0eoOKiH9zbG55iJKTjIB2c3Z8gIB9e32DiImEenFvdoSRlpCAcGZoc4GNkIyGgX+Af3t0cHB4hI+SjIF3c3eAiImCd29veISPkYuBeHV3fYGBfnt8gIaIhXxzcXaDj5WQgnFnZ3GAjJGOh4J/f356dXBxeISOko2Cd3J1foeKhXtycHaBi4+KgXl2eX6Cgn56en6Eh4V+dnJ2gY2TkINzaGc=';

// Pre-create native HTML5 Audio elements
const hoverAudio = typeof window !== 'undefined' ? new Audio('data:audio/wav;base64,' + HOVER_BASE64) : null;
const clickAudio = typeof window !== 'undefined' ? new Audio('data:audio/wav;base64,' + CLICK_BASE64) : null;
const successAudio = typeof window !== 'undefined' ? new Audio('data:audio/wav;base64,' + SUCCESS_BASE64) : null;

let isMuted = false;

if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('knexa_sfx_muted');
  if (stored !== null) {
    isMuted = stored === 'true';
  }
}

// Global user gesture listener to unlock all HTML5 audio elements instantly on click/touch
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    // Play and immediately pause to unlock the audio elements under the click gesture event stack
    if (hoverAudio) {
      hoverAudio.muted = true;
      hoverAudio.play().then(() => {
        hoverAudio.pause();
        hoverAudio.muted = false;
      }).catch(() => {});
    }
    if (clickAudio) {
      clickAudio.muted = true;
      clickAudio.play().then(() => {
        clickAudio.pause();
        clickAudio.muted = false;
      }).catch(() => {});
    }
    if (successAudio) {
      successAudio.muted = true;
      successAudio.play().then(() => {
        successAudio.pause();
        successAudio.muted = false;
      }).catch(() => {});
    }
    window.removeEventListener('click', unlockAudio);
    window.removeEventListener('touchstart', unlockAudio);
  };
  window.addEventListener('click', unlockAudio, { passive: true });
  window.addEventListener('touchstart', unlockAudio, { passive: true });
}

export const sfx = {
  getMuted: () => isMuted,
  setMuted: (val: boolean) => {
    isMuted = val;
    localStorage.setItem('knexa_sfx_muted', String(val));
    return isMuted;
  },
  
  playHover: () => {
    if (isMuted || !hoverAudio) return;
    try {
      hoverAudio.currentTime = 0;
      hoverAudio.play().catch(() => {});
    } catch (e) {}
  },
  
  playClick: () => {
    if (isMuted || !clickAudio) return;
    try {
      clickAudio.currentTime = 0;
      clickAudio.play().catch(() => {});
    } catch (e) {}
  },
  
  playCompile: () => {
    if (isMuted || !clickAudio) return;
    try {
      clickAudio.currentTime = 0;
      clickAudio.play().catch(() => {});
    } catch (e) {}
  },
  
  playSuccess: () => {
    if (isMuted || !successAudio) return;
    try {
      successAudio.currentTime = 0;
      successAudio.play().catch(() => {});
    } catch (e) {}
  }
};
