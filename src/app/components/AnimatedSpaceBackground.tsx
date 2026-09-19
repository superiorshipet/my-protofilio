import { useEffect, useRef } from 'react';
import type * as Three from 'three';

type ThreeModule = typeof Three;

type ShootingStar = {
  points: Three.Points;
  positions: Float32Array;
  active: boolean;
  t: number;
  start: Three.Vector3;
  dir: Three.Vector3;
  speed: number;
};

function makeStars(THREE: ThreeModule, count: number, spread: number, size: number, color: number, opacity: number) {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color,
    size,
    transparent: true,
    opacity,
    sizeAttenuation: true,
  });

  return new THREE.Points(geo, mat);
}

function makeGlowSprite(THREE: ThreeModule, color: string, size: number, opacity: number) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, color);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  const tex = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({
    map: tex,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(size, size, 1);

  return sprite;
}

function disposeObject(THREE: ThreeModule, object: Three.Object3D) {
  object.traverse((child) => {
    if (child instanceof THREE.Points || child instanceof THREE.Sprite) {
      child.geometry?.dispose();

      if (Array.isArray(child.material)) {
        child.material.forEach((material) => material.dispose());
        return;
      }

      const material = child.material as Three.PointsMaterial | Three.SpriteMaterial;
      if ('map' in material) {
        material.map?.dispose();
      }
      material.dispose();
    }
  });
}

export function AnimatedSpaceBackground() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cleanup: (() => void) | null = null;
    let cancelled = false;

    const boot = async () => {
      const THREE = await import('three');
      const wrap = wrapRef.current;

      if (!wrap || cancelled) return;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x070a12, 0.0013);

      const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 3000);
      camera.position.set(0, 0, 70);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.domElement.setAttribute('aria-hidden', 'true');
      wrap.appendChild(renderer.domElement);

      const starsFar = makeStars(THREE, 2200, 1400, 1, 0x8fa3c8, 0.5);
      const starsMid = makeStars(THREE, 1100, 800, 1.5, 0xbfe8ff, 0.65);
      const starsNear = makeStars(THREE, 400, 460, 2, 0x2ee6d6, 0.75);
      scene.add(starsFar, starsMid, starsNear);

      const nebula1 = makeGlowSprite(THREE, 'rgba(46,230,214,0.55)', 300, 0.45);
      const nebula2 = makeGlowSprite(THREE, 'rgba(123,91,255,0.5)', 360, 0.4);

      if (nebula1) {
        nebula1.position.set(-140, 40, -220);
        scene.add(nebula1);
      }

      if (nebula2) {
        nebula2.position.set(160, -60, -260);
        scene.add(nebula2);
      }

      const makeShootingStar = (): ShootingStar => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(12 * 3);
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const mat = new THREE.PointsMaterial({
          color: 0xffffff,
          size: 1.5,
          transparent: true,
          opacity: 0.9,
          sizeAttenuation: true,
        });

        const points = new THREE.Points(geo, mat);
        scene.add(points);

        return {
          points,
          positions,
          active: false,
          t: 0,
          start: new THREE.Vector3(),
          dir: new THREE.Vector3(),
          speed: 0,
        };
      };

      const shootingStars = [makeShootingStar(), makeShootingStar()];

      const launch = (star: ShootingStar) => {
        star.start.set((Math.random() - 0.5) * 300 + 120, Math.random() * 90 + 30, -100 - Math.random() * 150);
        star.dir.set(-1.5, -0.7, 0.1).normalize();
        star.t = 0;
        star.active = true;
        star.speed = 90 + Math.random() * 50;
      };

      let mouseX = 0;
      let mouseY = 0;
      let t = 0;
      let nextShoot = 3;
      let last = performance.now();
      let animationFrame = 0;

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
      };

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      const animate = (now: number) => {
        animationFrame = requestAnimationFrame(animate);

        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        t += dt;

        starsFar.rotation.y += dt * 0.006;
        starsMid.rotation.y += dt * 0.011;
        starsNear.rotation.y += dt * 0.017;

        if (nebula1) {
          nebula1.position.x = -140 + Math.sin(t * 0.12) * 14;
        }

        if (nebula2) {
          nebula2.position.y = -60 + Math.cos(t * 0.1) * 14;
        }

        nextShoot -= dt;
        if (nextShoot <= 0) {
          const idle = shootingStars.find((star) => !star.active);
          if (idle) launch(idle);
          nextShoot = 2.5 + Math.random() * 3.5;
        }

        shootingStars.forEach((star) => {
          if (!star.active) return;

          star.t += dt;
          const head = star.start.clone().addScaledVector(star.dir, star.t * star.speed);

          for (let i = 0; i < 12; i += 1) {
            const p = head.clone().addScaledVector(star.dir, -i * 2.2);
            star.positions[i * 3] = p.x;
            star.positions[i * 3 + 1] = p.y;
            star.positions[i * 3 + 2] = p.z;
          }

          star.points.geometry.attributes.position.needsUpdate = true;
          (star.points.material as Three.PointsMaterial).opacity = Math.max(0, 0.9 - star.t * 0.22);

          if (star.t > 3.8) {
            star.active = false;
          }
        });

        camera.position.x += (mouseX * 10 - camera.position.x) * 0.03;
        camera.position.y += (-mouseY * 6 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);
      animationFrame = requestAnimationFrame(animate);

      cleanup = () => {
        cancelAnimationFrame(animationFrame);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        disposeObject(THREE, scene);
        renderer.dispose();
        renderer.domElement.remove();
      };

      if (cancelled) {
        cleanup();
      }
    };

    void boot();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <div ref={wrapRef} className="space-three-bg" />;
}
