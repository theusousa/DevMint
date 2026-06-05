import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function Logo3D({ unlocking = false }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ unlocking: false });

  useEffect(() => { stateRef.current.unlocking = unlocking; }, [unlocking]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setClearColor(0x050505);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.04);

    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 120);
    camera.position.set(0, 1.2, 9);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    controls.minDistance = 5;
    controls.maxDistance = 18;
    controls.maxPolarAngle = Math.PI * 0.7;
    controls.target.set(0, 0, 0);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.08));
    const mainGreen = new THREE.PointLight(0x0dff7a, 18, 22); mainGreen.position.set(0, 0, 6); scene.add(mainGreen);
    const sideGreen = new THREE.PointLight(0x0dff7a, 7, 16); sideGreen.position.set(4, 3, -2); scene.add(sideGreen);
    const backGreen = new THREE.PointLight(0x0dff7a, 5, 14); backGreen.position.set(-4, -2, -4); scene.add(backGreen);
    const bottomGreen = new THREE.PointLight(0x0dff7a, 4, 12); bottomGreen.position.set(0, -4, 2); scene.add(bottomGreen);
    const fillWhite = new THREE.DirectionalLight(0xffffff, 0.45); fillWhite.position.set(-3, 4, 2); scene.add(fillWhite);
    const fillWhite2 = new THREE.DirectionalLight(0xffffff, 0.35); fillWhite2.position.set(3, -2, 3); scene.add(fillWhite2);
    const rimLight = new THREE.DirectionalLight(0x0dff7a, 1.4); rimLight.position.set(0, -3, -4); scene.add(rimLight);

    // Materials
    const darkMat = new THREE.MeshPhysicalMaterial({
      color: 0x111111, metalness: 0, roughness: 0, transmission: 1, thickness: 0.5,
      transparent: true, opacity: 0.06, side: THREE.DoubleSide, depthWrite: false, ior: 1.45,
    });
    const neonMat = new THREE.MeshStandardMaterial({
      color: 0x0dff7a, emissive: 0x0dff7a, emissiveIntensity: 2.2, metalness: 0, roughness: 0.05,
    });

    const SCALE = 3 / 88;
    const sv = (x, y, z = 0) => new THREE.Vector3((x - 48) * SCALE, -(y - 48) * SCALE, z);

    const logo = new THREE.Group();
    scene.add(logo);

    function addNeonLine(pts, radius = 0.08) {
      const curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5);
      const geo = new THREE.TubeGeometry(curve, 40, radius, 10, false);
      const mesh = new THREE.Mesh(geo, neonMat);
      mesh.castShadow = true;
      logo.add(mesh);
    }

    function roundedRect3D(s, r, z = 0.1, seg = 14) {
      const pts = [];
      for (let i = 0; i <= seg; i++) pts.push(new THREE.Vector3(-s + r + (2 * (s - r) / seg) * i, -s, z));
      for (let i = 1; i <= seg; i++) { const a = -Math.PI / 2 + (Math.PI / 2) * (i / seg); pts.push(new THREE.Vector3(s - r + Math.cos(a) * r, -s + r + Math.sin(a) * r, z)); }
      for (let i = 1; i <= seg; i++) pts.push(new THREE.Vector3(s, -s + r + (2 * (s - r) / seg) * i, z));
      for (let i = 1; i <= seg; i++) { const a = (Math.PI / 2) * (i / seg); pts.push(new THREE.Vector3(s - r + Math.cos(a) * r, s - r + Math.sin(a) * r, z)); }
      for (let i = 1; i <= seg; i++) pts.push(new THREE.Vector3(s - r - (2 * (s - r) / seg) * i, s, z));
      for (let i = 1; i <= seg; i++) { const a = Math.PI / 2 + (Math.PI / 2) * (i / seg); pts.push(new THREE.Vector3(-s + r + Math.cos(a) * r, s - r + Math.sin(a) * r, z)); }
      for (let i = 1; i <= seg; i++) pts.push(new THREE.Vector3(-s, s - r - (2 * (s - r) / seg) * i, z));
      for (let i = 1; i <= seg; i++) { const a = Math.PI + (Math.PI / 2) * (i / seg); pts.push(new THREE.Vector3(-s + r + Math.cos(a) * r, -s + r + Math.sin(a) * r, z)); }
      pts.push(pts[0].clone());
      return pts;
    }

    // Auras
    const auraMat = (op) => new THREE.MeshBasicMaterial({ color: 0x0dff7a, transparent: true, opacity: op, side: THREE.BackSide, depthWrite: false, blending: THREE.AdditiveBlending });
    const innerAura = new THREE.Mesh(new THREE.SphereGeometry(2.6, 32, 32), auraMat(0.07)); scene.add(innerAura);
    const midAura = new THREE.Mesh(new THREE.SphereGeometry(4.0, 32, 32), auraMat(0.035)); scene.add(midAura);
    const outerAura = new THREE.Mesh(new THREE.SphereGeometry(6.5, 32, 32), auraMat(0.015)); scene.add(outerAura);

    // Glass body
    const bodyShape = new THREE.Shape();
    const bs = 1.5, br = 0.35;
    bodyShape.moveTo(-bs + br, -bs);
    bodyShape.lineTo(bs - br, -bs);
    bodyShape.quadraticCurveTo(bs, -bs, bs, -bs + br);
    bodyShape.lineTo(bs, bs - br);
    bodyShape.quadraticCurveTo(bs, bs, bs - br, bs);
    bodyShape.lineTo(-bs + br, bs);
    bodyShape.quadraticCurveTo(-bs, bs, -bs, bs - br);
    bodyShape.lineTo(-bs, -bs + br);
    bodyShape.quadraticCurveTo(-bs, -bs, -bs + br, -bs);
    const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, { depth: 0.35, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 6 });
    bodyGeo.center();
    const body = new THREE.Mesh(bodyGeo, darkMat);
    body.castShadow = true; body.receiveShadow = true; body.position.z = -0.18;
    logo.add(body);

    // Neon square outline
    const sqCurve = new THREE.CatmullRomCurve3(roundedRect3D(1.5, 0.35, 0.22), true, 'catmullrom', 0.3);
    logo.add(new THREE.Mesh(new THREE.TubeGeometry(sqCurve, 300, 0.045, 10, true), neonMat));

    // Brackets + M
    addNeonLine([sv(29, 34, 0.24), sv(20, 48, 0.24), sv(29, 62, 0.24)], 0.11);
    addNeonLine([sv(67, 34, 0.24), sv(76, 48, 0.24), sv(67, 62, 0.24)], 0.11);
    addNeonLine([sv(36, 58, 0.24), sv(36, 40, 0.24), sv(48, 52, 0.24), sv(60, 40, 0.24), sv(60, 58, 0.24)], 0.11);

    // Particles
    const PARTICLE_COUNT = 380;
    const particleGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 22;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 22;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({ color: 0x0dff7a, size: 0.07, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
    scene.add(particles);

    // Grid + mirror
    const grid = new THREE.GridHelper(30, 30, 0x0dff7a, 0x0dff7a);
    grid.material.transparent = true; grid.material.opacity = 0.22; grid.position.y = -3.5;
    scene.add(grid);
    const mirror = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.MeshStandardMaterial({ color: 0x000000, metalness: 1, roughness: 0.7, transparent: true, opacity: 0.4 }));
    mirror.rotation.x = -Math.PI / 2; mirror.position.y = -3.5;
    scene.add(mirror);

    // Shockwave rings (hidden until unlock)
    const swMat = () => new THREE.MeshBasicMaterial({ color: 0x0dff7a, transparent: true, opacity: 0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false });
    const shockwave = new THREE.Mesh(new THREE.RingGeometry(0.82, 1.0, 80), swMat());
    const shockwave2 = new THREE.Mesh(new THREE.RingGeometry(0.9, 1.0, 80), swMat());
    shockwave.visible = false; shockwave2.visible = false;
    scene.add(shockwave); scene.add(shockwave2);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    const WARP_DUR = 0.95;
    let raf;
    let warpStart = null;
    let startDist = 0;
    const easeInCubic = (x) => x * x * x;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      neonMat.emissiveIntensity = 2.8 + Math.sin(t * 1.8) * 1.1;
      mainGreen.intensity = 12 + Math.sin(t * 1.5) * 4;
      sideGreen.intensity = 6 + Math.sin(t * 1.1) * 2;
      bottomGreen.intensity = 3.5 + Math.sin(t * 0.9 + 1) * 1.2;
      innerAura.material.opacity = 0.06 + Math.sin(t * 1.2) * 0.03;
      midAura.material.opacity = 0.03 + Math.sin(t * 0.9 + 0.5) * 0.015;
      outerAura.material.opacity = 0.012 + Math.sin(t * 0.7 + 1) * 0.008;
      logo.position.y = Math.sin(t * 0.7) * 0.08;

      const up = stateRef.current.unlocking;
      const pos = particles.geometry.attributes.position.array;
      if (up) {
        for (let i = 0; i < PARTICLE_COUNT * 3; i++) pos[i] *= 1.06; // burst outward, flies past camera
      } else {
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          pos[i * 3 + 1] += 0.004;
          if (pos[i * 3 + 1] > 11) pos[i * 3 + 1] = -11;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      if (up) {
        // Warp: dive into the logo
        if (warpStart === null) { warpStart = t; startDist = camera.position.length(); controls.enabled = false; controls.autoRotate = false; }
        const e = easeInCubic(Math.min((t - warpStart) / WARP_DUR, 1));
        const dist = startDist + (0.5 - startDist) * e;
        camera.position.normalize().multiplyScalar(dist);
        camera.lookAt(0, 0, 0);
        camera.fov = 42 + 50 * e;
        camera.updateProjectionMatrix();
        logo.rotation.y += 0.05 + e * 0.6;
        neonMat.emissiveIntensity = 3 + e * 10;
        mainGreen.intensity = 16 + e * 50;
        innerAura.material.opacity = 0.07 + e * 0.6;
        particles.material.size = 0.07 + e * 0.55;

        // Shockwave rings expanding from the logo
        shockwave.visible = true; shockwave2.visible = true;
        shockwave.lookAt(camera.position);
        const sw = 0.5 + e * 17;
        shockwave.scale.set(sw, sw, sw);
        shockwave.material.opacity = 0.95 * (1 - e);
        const e2 = Math.max(0, e - 0.16);
        const sw2 = 0.5 + e2 * 20;
        shockwave2.lookAt(camera.position);
        shockwave2.scale.set(sw2, sw2, sw2);
        shockwave2.material.opacity = 0.7 * Math.max(0, 1 - e * 1.2);
      } else {
        controls.update();
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      controls.dispose();
      renderer.dispose();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
      });
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, display: 'block' }} />;
}
