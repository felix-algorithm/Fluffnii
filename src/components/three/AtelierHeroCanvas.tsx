"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useDeviceTier } from "@/lib/deviceTier";
import { cn } from "@/lib/cn";
import { disposeThreeResources, isDocumentDarkTheme } from "./disposeThree";

export interface AtelierHeroCanvasProps {
  className?: string;
  interactive?: boolean;
}

const TOTEM_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;

  varying vec3 vViewNormal;
  varying vec3 vViewPos;
  varying vec3 vLocalPos;
  varying float vWave;

  void main() {
    vec3 pos = position;
    float harmonic =
      sin(pos.x * 2.6 + uTime * 0.85) *
      cos(pos.y * 2.4 - uTime * 0.65) *
      sin(pos.z * 2.2 + uTime * 0.55);

    float displacement = harmonic * 0.055;
    vec3 displaced = pos + normal * displacement;

    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    vViewNormal = normalize(normalMatrix * normal);
    vViewPos = -mvPosition.xyz;
    vLocalPos = displaced;
    vWave = harmonic;

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const TOTEM_FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uDarkMix;
  uniform vec2 uPointer;

  varying vec3 vViewNormal;
  varying vec3 vViewPos;
  varying vec3 vLocalPos;
  varying float vWave;

  void main() {
    vec3 viewDir = normalize(vViewPos);
    vec3 smoothN = normalize(vViewNormal);

    vec3 dpdx = dFdx(vViewPos);
    vec3 dpdy = dFdy(vViewPos);
    vec3 rawCross = cross(dpdy, dpdx);
    float crossLen = length(rawCross);
    vec3 facetN = crossLen > 0.0001 ? rawCross / crossLen : smoothN;
    vec3 N = normalize(mix(smoothN, facetN, 0.36));

    float ndotv = clamp(dot(N, viewDir), 0.0, 1.0);
    float fresnel = pow(1.0 - ndotv, 2.45);
    float velvetSheen = pow(1.0 - abs(ndotv - 0.18), 3.2) * 0.45;

    // FluffNii palette colors
    vec3 cream = vec3(0.961, 0.973, 0.988);
    vec3 taupe = vec3(0.863, 0.910, 0.961);
    vec3 butter = vec3(1.000, 0.941, 0.651);
    vec3 coral = vec3(1.000, 0.706, 0.635);
    vec3 espresso = vec3(0.118, 0.208, 0.341);
    vec3 nightCore = vec3(0.078, 0.106, 0.157);

    vec3 lightCore = mix(taupe, cream, clamp(vLocalPos.y * 0.45 + 0.55, 0.0, 1.0));
    vec3 darkCore = mix(nightCore, espresso, clamp(vLocalPos.y * 0.45 + 0.6, 0.0, 1.0));
    vec3 coreColor = mix(lightCore, darkCore, uDarkMix);

    float iridPhase = vWave * 1.8 + vLocalPos.x * 0.9 + uPointer.x * 0.6 + uTime * 0.32;
    vec3 iridBand = mix(coral, butter, 0.5 + 0.5 * sin(iridPhase));

    vec3 keyLightDir = normalize(vec3(0.55 + uPointer.x * 0.35, 0.75 + uPointer.y * 0.25, 0.65));
    float diffuse = max(dot(N, keyLightDir), 0.0);
    vec3 halfVec = normalize(keyLightDir + viewDir);
    float spec = pow(max(dot(N, halfVec), 0.0), 32.0);

    vec3 shadowTone = mix(espresso * 0.85, nightCore, uDarkMix);
    vec3 litBase = mix(shadowTone, coreColor, 0.38 + diffuse * 0.62);

    vec3 finalColor = litBase;
    finalColor = mix(finalColor, iridBand, clamp(fresnel * 0.78 + velvetSheen * 0.25, 0.0, 0.92));
    finalColor += mix(coral, butter, 0.65) * spec * mix(0.28, 0.48, uDarkMix);
    finalColor += espresso * (1.0 - diffuse) * (1.0 - uDarkMix) * 0.1;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const PARTICLE_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    vec3 pos = position;
    pos.y += sin(uTime * 0.45 + aPhase) * 0.18;
    pos.x += cos(uTime * 0.32 + aPhase * 1.3) * 0.14;
    pos.z += sin(uTime * 0.28 + aPhase * 0.7) * 0.12;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uPixelRatio * (26.0 / max(1.5, -mvPosition.z));
    vAlpha = 0.5 + 0.4 * sin(uTime * 0.9 + aPhase * 2.0);
  }
`;

const PARTICLE_FRAGMENT_SHADER = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float soft = smoothstep(0.5, 0.08, dist);
    gl_FragColor = vec4(vColor, soft * vAlpha);
  }
`;

function HeroFallbackPoster({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none select-none",
        className
      )}
    >
      <div
        className="w-[76%] aspect-square max-w-[420px] rounded-full blur-2xl opacity-75 dark:opacity-55"
        style={{
          background:
            "radial-gradient(circle at 38% 34%, rgba(255,240,166,0.78), rgba(255,180,162,0.44) 44%, rgba(30,53,87,0.18) 74%, transparent 100%)",
        }}
      />
      <div className="absolute w-[62%] aspect-square max-w-[330px] rounded-full border border-espresso/15 dark:border-butter/20" />
      <div className="absolute w-[46%] aspect-square max-w-[240px] rounded-full border border-coral/35 dark:border-coral/25 rotate-12" />
    </div>
  );
}

/**
 * Interactive Three.js studio stage featuring a sculpted iridescent Fresnel totem,
 * sewing-thread orbital rings, particle field scaled by `deviceTier`, and scroll/pointer rig.
 */
export default function AtelierHeroCanvas({
  className,
  interactive = true,
}: AtelierHeroCanvasProps) {
  const { tier, enableWebGL, dpr, particleCount, stepDown } = useDeviceTier();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    if (!enableWebGL || contextLost) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: tier === "high",
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setContextLost(true);
      return;
    }

    renderer.setPixelRatio(dpr);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;

    const scene = new THREE.Scene();
    const initialW = Math.max(container.clientWidth, 1);
    const initialH = Math.max(container.clientHeight, 1);
    renderer.setSize(initialW, initialH, false);

    const camera = new THREE.PerspectiveCamera(38, initialW / initialH, 0.1, 100);
    camera.position.set(0, 0.12, 5.4);

    const totemGroup = new THREE.Group();
    scene.add(totemGroup);

    const darkMixInit = isDocumentDarkTheme() ? 1 : 0;
    const totemMaterial = new THREE.ShaderMaterial({
      vertexShader: TOTEM_VERTEX_SHADER,
      fragmentShader: TOTEM_FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uDarkMix: { value: darkMixInit },
        uPointer: { value: new THREE.Vector2(0, 0) },
      },
    });

    const coreDetail = tier === "high" ? 3 : 2;
    const coreGeom = new THREE.IcosahedronGeometry(1.12, coreDetail);
    const coreMesh = new THREE.Mesh(coreGeom, totemMaterial);
    totemGroup.add(coreMesh);

    const cageBaseGeom = new THREE.IcosahedronGeometry(1.2, 1);
    const cageEdgesGeom = new THREE.EdgesGeometry(cageBaseGeom);
    cageBaseGeom.dispose();
    const cageMaterial = new THREE.LineBasicMaterial({
      color: darkMixInit ? 0xfff0a6 : 0x1e3557,
      transparent: true,
      opacity: darkMixInit ? 0.24 : 0.16,
    });
    const cageMesh = new THREE.LineSegments(cageEdgesGeom, cageMaterial);
    totemGroup.add(cageMesh);

    // Sculpted Kemono-inspired atelier crest arcs
    const crestGeom = new THREE.TorusGeometry(0.42, 0.018, 10, 42, Math.PI * 0.72);
    const crestMat = new THREE.MeshBasicMaterial({
      color: darkMixInit ? 0xffb4a2 : 0x1e3557,
      transparent: true,
      opacity: 0.42,
    });
    const crestLeft = new THREE.Mesh(crestGeom, crestMat);
    crestLeft.position.set(-0.74, 0.92, -0.08);
    crestLeft.rotation.set(0.2, 0.28, 0.56);
    const crestRight = new THREE.Mesh(crestGeom, crestMat);
    crestRight.position.set(0.74, 0.92, -0.08);
    crestRight.rotation.set(0.2, -0.28, Math.PI - 0.56 - Math.PI * 0.72);
    totemGroup.add(crestLeft, crestRight);

    // Three tilted sewing-thread orbital rings with stitch-pearl satellites
    const ringConfigs = [
      { radius: 1.56, tube: 0.01, tiltX: 1.08, tiltY: 0.36, speed: 0.48, color: 0x1e3557, darkColor: 0xfff0a6 },
      { radius: 1.84, tube: 0.008, tiltX: -0.74, tiltY: 0.85, speed: -0.36, color: 0xffb4a2, darkColor: 0xffb4a2 },
      { radius: 2.08, tube: 0.006, tiltX: 0.42, tiltY: -1.12, speed: 0.24, color: 0x1e3557, darkColor: 0xf5f8fc },
    ];

    const pearlGeom = new THREE.SphereGeometry(0.044, 14, 14);
    const ringEntries = ringConfigs.map((cfg, idx) => {
      const ringPivot = new THREE.Group();
      ringPivot.rotation.set(cfg.tiltX, cfg.tiltY, idx * 0.5);

      const torusGeom = new THREE.TorusGeometry(cfg.radius, cfg.tube, 10, 88);
      const torusMat = new THREE.MeshBasicMaterial({
        color: darkMixInit ? cfg.darkColor : cfg.color,
        transparent: true,
        opacity: darkMixInit ? 0.55 : 0.4,
      });
      const torusMesh = new THREE.Mesh(torusGeom, torusMat);
      ringPivot.add(torusMesh);

      const pearlMat = new THREE.MeshBasicMaterial({
        color: idx === 1 ? 0xffb4a2 : 0xfff0a6,
      });
      const pearl = new THREE.Mesh(pearlGeom, pearlMat);
      pearl.position.set(cfg.radius, 0, 0);
      ringPivot.add(pearl);

      totemGroup.add(ringPivot);
      return { ringPivot, torusMat, cfg };
    });

    // Ambient workshop fluff / light dust particles
    let particlePoints: THREE.Points | null = null;
    let particleMat: THREE.ShaderMaterial | null = null;
    if (particleCount > 0) {
      const positions = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const phases = new Float32Array(particleCount);
      const colors = new Float32Array(particleCount * 3);

      const palette = [
        new THREE.Color(0xfff0a6),
        new THREE.Color(0xffb4a2),
        new THREE.Color(0xdce8f5),
        new THREE.Color(0x1e3557),
      ];

      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + Math.random() * 0.5;
        const radius = 1.65 + Math.random() * 1.9;
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 3.1;
        positions[i * 3 + 2] = Math.sin(angle) * radius * 0.72 - 0.3;

        sizes[i] = 1.6 + Math.random() * 2.6;
        phases[i] = Math.random() * Math.PI * 2;

        const c = palette[i % palette.length];
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }

      const pGeom = new THREE.BufferGeometry();
      pGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      pGeom.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
      pGeom.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
      pGeom.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

      particleMat = new THREE.ShaderMaterial({
        vertexShader: PARTICLE_VERTEX_SHADER,
        fragmentShader: PARTICLE_FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: dpr },
        },
      });

      particlePoints = new THREE.Points(pGeom, particleMat);
      scene.add(particlePoints);
    }

    let targetPointerX = 0;
    let targetPointerY = 0;
    let smoothPointerX = 0;
    let smoothPointerY = 0;
    let targetDarkMix = darkMixInit;
    let smoothDarkMix = darkMixInit;
    let scrollProgress = 0;

    const onPointerMove = (e: PointerEvent) => {
      if (!interactive || e.pointerType !== "mouse") return;
      const nx = (e.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
      const ny = -((e.clientY / Math.max(window.innerHeight, 1)) * 2 - 1);
      targetPointerX = THREE.MathUtils.clamp(nx, -1, 1);
      targetPointerY = THREE.MathUtils.clamp(ny, -1, 1);
    };

    const updateScroll = () => {
      const vh = Math.max(window.innerHeight, 1);
      scrollProgress = THREE.MathUtils.clamp(window.scrollY / vh, 0, 1.4);
    };
    updateScroll();

    if (interactive) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }
    window.addEventListener("scroll", updateScroll, { passive: true });

    const themeObserver = new MutationObserver(() => {
      targetDarkMix = isDocumentDarkTheme() ? 1 : 0;
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = Math.max(Math.round(entry.contentRect.width), 1);
      const h = Math.max(Math.round(entry.contentRect.height), 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    });
    resizeObserver.observe(container);

    let inView = true;
    let tabVisible = !document.hidden;
    let rafId = 0;
    let running = false;
    let elapsed = 0;
    let lastStamp = performance.now();
    let slowFrames = 0;

    const tmpLight = new THREE.Color();
    const tmpDark = new THREE.Color();

    const tick = (now: number) => {
      if (!running) return;
      const rawDt = now - lastStamp;
      lastStamp = now;
      const dt = Math.min(rawDt, 64) / 1000;
      elapsed += dt;

      if (rawDt > 48 && rawDt < 220) {
        slowFrames += 1;
        if (slowFrames > 28) {
          slowFrames = 0;
          stepDown();
        }
      } else {
        slowFrames = Math.max(0, slowFrames - 1);
      }

      smoothPointerX += (targetPointerX - smoothPointerX) * Math.min(1, dt * 5);
      smoothPointerY += (targetPointerY - smoothPointerY) * Math.min(1, dt * 5);
      smoothDarkMix += (targetDarkMix - smoothDarkMix) * Math.min(1, dt * 4);

      totemMaterial.uniforms.uTime.value = elapsed;
      totemMaterial.uniforms.uDarkMix.value = smoothDarkMix;
      totemMaterial.uniforms.uPointer.value.set(smoothPointerX, smoothPointerY);

      if (particleMat) {
        particleMat.uniforms.uTime.value = elapsed;
      }

      tmpLight.setHex(0x1e3557);
      tmpDark.setHex(0xfff0a6);
      cageMaterial.color.copy(tmpLight).lerp(tmpDark, smoothDarkMix);
      cageMaterial.opacity = THREE.MathUtils.lerp(0.16, 0.25, smoothDarkMix);

      tmpLight.setHex(0x1e3557);
      tmpDark.setHex(0xffb4a2);
      crestMat.color.copy(tmpLight).lerp(tmpDark, smoothDarkMix);

      ringEntries.forEach(({ ringPivot, torusMat, cfg }) => {
        ringPivot.rotation.z += dt * cfg.speed;
        tmpLight.setHex(cfg.color);
        tmpDark.setHex(cfg.darkColor);
        torusMat.color.copy(tmpLight).lerp(tmpDark, smoothDarkMix);
      });

      totemGroup.rotation.y = elapsed * 0.22 + smoothPointerX * 0.32 + scrollProgress * 0.45;
      totemGroup.rotation.x = Math.sin(elapsed * 0.35) * 0.08 - smoothPointerY * 0.24;
      totemGroup.position.y = Math.sin(elapsed * 0.7) * 0.07 - scrollProgress * 0.16;

      camera.position.z = 5.4 + scrollProgress * 0.72;
      camera.position.y = 0.12 - scrollProgress * 0.28;
      camera.position.x = smoothPointerX * 0.18;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(tick);
    };

    const syncLoop = () => {
      const shouldRun = inView && tabVisible && !contextLost;
      if (shouldRun && !running) {
        running = true;
        lastStamp = performance.now();
        rafId = window.requestAnimationFrame(tick);
      } else if (!shouldRun && running) {
        running = false;
        window.cancelAnimationFrame(rafId);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncLoop();
      },
      { threshold: 0.04 }
    );
    io.observe(container);

    const onVisibility = () => {
      tabVisible = !document.hidden;
      syncLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      running = false;
      window.cancelAnimationFrame(rafId);
      setContextLost(true);
    };
    const onContextRestored = () => {
      setContextLost(false);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    syncLoop();

    return () => {
      running = false;
      window.cancelAnimationFrame(rafId);
      io.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", updateScroll);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      disposeThreeResources(scene, renderer);
    };
  }, [enableWebGL, contextLost, tier, dpr, particleCount, interactive, stepDown]);

  if (!enableWebGL || contextLost) {
    return <HeroFallbackPoster className={className} />;
  }

  return (
    <div
      ref={containerRef}
      data-cursor-kind={interactive ? "inspect" : undefined}
      className={cn(
        "relative w-full h-full overflow-hidden select-none",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="w-full h-full block"
      />
    </div>
  );
}
