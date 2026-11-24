"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useDeviceTier } from "@/lib/deviceTier";
import { cn } from "@/lib/cn";
import { disposeThreeResources, isDocumentDarkTheme } from "./disposeThree";

export type FanVariant = "internal-fan" | "std-fan" | "plus-fan";

export interface FanRotorCanvas3DProps {
  variant: FanVariant;
  className?: string;
  interactive?: boolean;
  compact?: boolean;
}

const LED_RING_VERTEX = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPos;

  void main() {
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewPos = -mvPos.xyz;
    gl_Position = projectionMatrix * mvPos;
  }
`;

const LED_RING_FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform float uBoost;
  uniform vec3 uPrimaryColor;
  uniform vec3 uSecondaryColor;

  varying vec3 vNormal;
  varying vec3 vViewPos;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewPos);
    float rim = pow(1.0 - max(dot(N, V), 0.0), 1.6);
    float pulse = 0.65 + 0.35 * sin(uTime * (2.5 + uBoost * 4.0));
    vec3 col = mix(uPrimaryColor, uSecondaryColor, 0.35 + 0.35 * sin(uTime * 1.4));
    float intensity = (0.72 + rim * 0.65) * pulse * (1.0 + uBoost * 0.45);
    gl_FragColor = vec4(col * intensity, 0.95);
  }
`;

function createRoundedFrameGeometry(
  outerSize: number,
  cornerRadius: number,
  holeRadius: number,
  depth: number
): THREE.ExtrudeGeometry {
  const half = outerSize / 2;
  const r = Math.min(cornerRadius, half * 0.45);

  const shape = new THREE.Shape();
  shape.moveTo(-half + r, -half);
  shape.lineTo(half - r, -half);
  shape.quadraticCurveTo(half, -half, half, -half + r);
  shape.lineTo(half, half - r);
  shape.quadraticCurveTo(half, half, half - r, half);
  shape.lineTo(-half + r, half);
  shape.quadraticCurveTo(-half, half, -half, half - r);
  shape.lineTo(-half, -half + r);
  shape.quadraticCurveTo(-half, -half, -half + r, -half);

  const hole = new THREE.Path();
  hole.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const geom = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.04,
    bevelThickness: 0.04,
  });
  geom.center();
  return geom;
}

function createSweptBladeGeometry(length: number, width: number): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, -width * 0.25);
  shape.quadraticCurveTo(length * 0.48, -width * 0.62, length, -width * 0.12);
  shape.quadraticCurveTo(length * 1.04, width * 0.35, length * 0.72, width * 0.56);
  shape.quadraticCurveTo(length * 0.32, width * 0.42, 0, width * 0.22);
  shape.closePath();

  const geom = new THREE.ExtrudeGeometry(shape, {
    depth: 0.032,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.008,
    bevelThickness: 0.008,
  });
  geom.translate(0, 0, -0.016);
  return geom;
}

function FanFallbackPoster({
  variant,
  compact,
  className,
}: {
  variant: FanVariant;
  compact?: boolean;
  className?: string;
}) {
  const isPlus = variant === "plus-fan";
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none select-none",
        isPlus
          ? "bg-ink text-butter"
          : "bg-surface-alt/70 text-fg",
        className
      )}
    >
      <div
        className={cn(
          "rounded-full blur-xl opacity-75",
          compact ? "w-10 h-10" : "w-44 h-44"
        )}
        style={{
          background: isPlus
            ? "radial-gradient(circle, rgba(255,240,166,0.55) 0%, rgba(255,180,162,0.28) 55%, transparent 100%)"
            : variant === "std-fan"
            ? "radial-gradient(circle, rgba(255,240,166,0.75) 0%, rgba(30,53,87,0.22) 60%, transparent 100%)"
            : "radial-gradient(circle, rgba(220,232,245,0.85) 0%, rgba(30,53,87,0.25) 62%, transparent 100%)",
        }}
      />
      <div
        className={cn(
          "absolute border-2 flex items-center justify-center",
          variant === "internal-fan" ? "rounded-2xl" : "rounded-full",
          compact ? "w-7 h-7" : "w-28 h-28",
          isPlus
            ? "border-butter/70"
            : "border-espresso/45 dark:border-cream/45"
        )}
      >
        <div
          className={cn(
            "rounded-full border",
            compact ? "w-3 h-3" : "w-10 h-10",
            variant === "std-fan" || isPlus
              ? "bg-butter border-ink"
              : "bg-cream border-espresso"
          )}
        />
      </div>
    </div>
  );
}

/**
 * Pure Three.js interactive 3D cooling-fan showcase for `/accessories` supporting
 * `internal-fan`, `std-fan`, and `plus-fan` geometries, reactive blade RPM,
 * LED accent ring, and airflow stream particles scaled by `deviceTier`.
 */
export default function FanRotorCanvas3D({
  variant,
  className,
  interactive = true,
  compact = false,
}: FanRotorCanvas3DProps) {
  const { tier, enableWebGL, dpr, particleCount } = useDeviceTier();
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
        antialias: tier === "high" && !compact,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setContextLost(true);
      return;
    }

    const effectiveDpr = compact ? Math.min(dpr, 1.5) : dpr;
    renderer.setPixelRatio(effectiveDpr);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    const initW = Math.max(container.clientWidth, 1);
    const initH = Math.max(container.clientHeight, 1);
    renderer.setSize(initW, initH, false);

    const camera = new THREE.PerspectiveCamera(36, initW / initH, 0.1, 60);
    camera.position.set(
      variant === "std-fan" ? 0.45 : 0.25,
      variant === "internal-fan" ? 0.18 : 0.28,
      compact ? 4.35 : 4.1
    );
    camera.lookAt(0, 0, 0);

    // 3-point studio lighting
    const ambient = new THREE.AmbientLight(0xf5f8fc, 0.85);
    const keyLight = new THREE.DirectionalLight(0xfff5d6, 1.55);
    keyLight.position.set(3.5, 4.2, 5.0);
    const rimLight = new THREE.DirectionalLight(0xdce8f5, 1.15);
    rimLight.position.set(-4.0, -2.0, -3.5);
    const ledPoint = new THREE.PointLight(
      variant === "plus-fan" ? 0xfff0a6 : 0xffb4a2,
      variant === "plus-fan" ? 1.4 : 0.55,
      6
    );
    ledPoint.position.set(0, 0, 1.1);
    scene.add(ambient, keyLight, rimLight, ledPoint);

    const assembly = new THREE.Group();
    scene.add(assembly);

    const darkInit = isDocumentDarkTheme();
    const isPlus = variant === "plus-fan";
    const isStd = variant === "std-fan";

    const shellMat = new THREE.MeshStandardMaterial({
      color: isPlus ? 0x141b28 : darkInit ? 0x1e2c44 : 0xf5f8fc,
      roughness: isPlus ? 0.28 : 0.36,
      metalness: isPlus ? 0.58 : 0.22,
    });
    const innerTrimMat = new THREE.MeshStandardMaterial({
      color: isPlus ? 0x1e3557 : 0x111622,
      roughness: 0.4,
      metalness: 0.45,
    });
    const bladeMat = new THREE.MeshStandardMaterial({
      color: isPlus ? 0x233047 : isStd ? 0x1e3557 : 0x2c476e,
      roughness: 0.24,
      metalness: 0.55,
    });
    const butterTpuMat = new THREE.MeshStandardMaterial({
      color: 0xfff0a6,
      roughness: 0.48,
      metalness: 0.08,
    });

    // Build variant-specific casing
    if (variant === "internal-fan") {
      const frameGeom = createRoundedFrameGeometry(2.15, 0.36, 0.86, 0.46);
      const frameMesh = new THREE.Mesh(frameGeom, shellMat);
      assembly.add(frameMesh);

      const screwGeom = new THREE.CylinderGeometry(0.068, 0.068, 0.56, 12);
      screwGeom.rotateX(Math.PI / 2);
      const screwOffsets = [
        [-0.84, 0.84],
        [0.84, 0.84],
        [-0.84, -0.84],
        [0.84, -0.84],
      ];
      screwOffsets.forEach(([sx, sy]) => {
        const screw = new THREE.Mesh(screwGeom, butterTpuMat);
        screw.position.set(sx, sy, 0);
        assembly.add(screw);
      });

      // Side USB-C input plug silhouette
      const usbNeck = new THREE.Mesh(
        new THREE.BoxGeometry(0.28, 0.16, 0.14),
        innerTrimMat
      );
      usbNeck.position.set(1.22, -0.45, 0);
      assembly.add(usbNeck);
    } else if (variant === "std-fan") {
      // 3D-printed cylindrical cooler + signature angled butter TPU air nozzle
      const housingGeom = new THREE.CylinderGeometry(0.96, 0.96, 0.64, 36, 1, true);
      housingGeom.rotateX(Math.PI / 2);
      const housing = new THREE.Mesh(housingGeom, shellMat);
      assembly.add(housing);

      const shroudRingGeom = new THREE.TorusGeometry(0.94, 0.085, 14, 48);
      const frontShroud = new THREE.Mesh(shroudRingGeom, shellMat);
      frontShroud.position.z = 0.28;
      const rearShroud = new THREE.Mesh(shroudRingGeom, innerTrimMat);
      rearShroud.position.z = -0.28;
      assembly.add(frontShroud, rearShroud);

      // Tapered soft TPU butter-yellow directional air nozzle on side/front
      const nozzleGroup = new THREE.Group();
      nozzleGroup.position.set(0.86, 0.18, 0.04);
      nozzleGroup.rotation.z = -0.24;
      const nozzleCone = new THREE.Mesh(
        new THREE.CylinderGeometry(0.32, 0.44, 0.62, 24),
        butterTpuMat
      );
      nozzleCone.rotation.z = -Math.PI / 2;
      const nozzleLip = new THREE.Mesh(
        new THREE.TorusGeometry(0.32, 0.04, 12, 28),
        butterTpuMat
      );
      nozzleLip.rotation.y = Math.PI / 2;
      nozzleLip.position.x = 0.31;
      nozzleGroup.add(nozzleCone, nozzleLip);
      assembly.add(nozzleGroup);
    } else {
      // PLUS edition: Dual concentric dark-anodized turbine shroud + rear diffuser
      const outerCowling = new THREE.Mesh(
        new THREE.CylinderGeometry(1.06, 1.0, 0.72, 42, 1, true),
        shellMat
      );
      outerCowling.rotation.x = Math.PI / 2;
      const frontRim = new THREE.Mesh(
        new THREE.TorusGeometry(1.03, 0.085, 16, 52),
        shellMat
      );
      frontRim.position.z = 0.32;
      const innerIntake = new THREE.Mesh(
        new THREE.TorusGeometry(0.92, 0.038, 12, 48),
        innerTrimMat
      );
      innerIntake.position.z = 0.35;
      assembly.add(outerCowling, frontRim, innerIntake);
    }

    // LED Accent Ring (signature glow on PLUS, crisp accent ring on STD/Internal)
    const ledRadius = isPlus ? 0.94 : isStd ? 0.87 : 0.84;
    const ledMat = new THREE.ShaderMaterial({
      vertexShader: LED_RING_VERTEX,
      fragmentShader: LED_RING_FRAGMENT,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uBoost: { value: 0 },
        uPrimaryColor: {
          value: new THREE.Color(isPlus ? 0xfff0a6 : 0xdce8f5),
        },
        uSecondaryColor: {
          value: new THREE.Color(isPlus ? 0xffb4a2 : 0xfff0a6),
        },
      },
    });
    const ledRing = new THREE.Mesh(
      new THREE.TorusGeometry(ledRadius, isPlus ? 0.036 : 0.02, 12, 56),
      ledMat
    );
    ledRing.position.z = isPlus ? 0.24 : 0.2;
    assembly.add(ledRing);

    // Rotor Hub & Swept Blades
    const rotorGroup = new THREE.Group();
    rotorGroup.position.z = 0.02;
    assembly.add(rotorGroup);

    const hubMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.31, 0.24, 24),
      innerTrimMat
    );
    hubMesh.rotation.x = Math.PI / 2;
    const hubCap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.2, 0.06, 20),
      butterTpuMat
    );
    hubCap.rotation.x = Math.PI / 2;
    hubCap.position.z = 0.13;
    rotorGroup.add(hubMesh, hubCap);

    const bladeCount = isPlus ? 11 : isStd ? 9 : 7;
    const bladeGeom = createSweptBladeGeometry(
      isPlus ? 0.62 : 0.56,
      isPlus ? 0.22 : 0.25
    );
    for (let i = 0; i < bladeCount; i++) {
      const bladePivot = new THREE.Group();
      bladePivot.rotation.z = (i / bladeCount) * Math.PI * 2;
      const bladeMesh = new THREE.Mesh(bladeGeom, bladeMat);
      bladeMesh.position.x = 0.22;
      bladeMesh.rotation.x = 0.54;
      bladePivot.add(bladeMesh);
      rotorGroup.add(bladePivot);
    }

    // Airflow stream particles scaled by deviceTier
    const baseParticleBudget = compact
      ? Math.min(particleCount, 18)
      : Math.min(particleCount, isPlus ? 64 : isStd ? 44 : 28);

    let airflowPoints: THREE.Points | null = null;
    let airflowPositions: Float32Array | null = null;
    let airflowSpeeds: Float32Array | null = null;
    let airflowGeom: THREE.BufferGeometry | null = null;

    if (baseParticleBudget > 0) {
      airflowPositions = new Float32Array(baseParticleBudget * 3);
      airflowSpeeds = new Float32Array(baseParticleBudget);

      for (let i = 0; i < baseParticleBudget; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = 0.18 + Math.random() * 0.62;
        if (isStd) {
          airflowPositions[i * 3] = 0.8 + Math.random() * 1.4;
          airflowPositions[i * 3 + 1] = 0.16 + (Math.random() - 0.5) * 0.34;
          airflowPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.32;
        } else {
          airflowPositions[i * 3] = Math.cos(angle) * r;
          airflowPositions[i * 3 + 1] = Math.sin(angle) * r;
          airflowPositions[i * 3 + 2] = 0.25 + Math.random() * 1.65;
        }
        airflowSpeeds[i] = 0.75 + Math.random() * 0.85;
      }

      airflowGeom = new THREE.BufferGeometry();
      airflowGeom.setAttribute(
        "position",
        new THREE.BufferAttribute(airflowPositions, 3)
      );

      const airflowMat = new THREE.PointsMaterial({
        color: isPlus ? 0xfff0a6 : 0xffb4a2,
        size: compact ? 0.055 : 0.048,
        transparent: true,
        opacity: 0.72,
        depthWrite: false,
      });

      airflowPoints = new THREE.Points(airflowGeom, airflowMat);
      assembly.add(airflowPoints);
    }

    const baseRpm = isPlus ? 5.2 : isStd ? 3.8 : 2.6;
    let hovered = false;
    let targetTiltX = 0;
    let targetTiltY = isStd ? -0.32 : 0.24;
    let smoothTiltX = targetTiltX;
    let smoothTiltY = targetTiltY;
    let smoothBoost = 0;

    const onPointerEnter = () => {
      if (interactive) hovered = true;
    };
    const onPointerDown = () => {
      if (interactive) hovered = true;
    };
    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        hovered = false;
      }
    };
    const onPointerLeave = () => {
      hovered = false;
      targetTiltX = 0;
      targetTiltY = isStd ? -0.32 : 0.24;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetTiltY = THREE.MathUtils.clamp(nx * 0.42, -0.48, 0.48);
      targetTiltX = THREE.MathUtils.clamp(-ny * 0.28, -0.32, 0.32);
    };

    if (interactive) {
      container.addEventListener("pointerenter", onPointerEnter);
      container.addEventListener("pointerdown", onPointerDown);
      container.addEventListener("pointerup", onPointerUp);
      container.addEventListener("pointercancel", onPointerLeave);
      container.addEventListener("pointerleave", onPointerLeave);
      container.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    const themeObserver = new MutationObserver(() => {
      if (!isPlus) {
        const dark = isDocumentDarkTheme();
        shellMat.color.setHex(dark ? 0x1e2c44 : 0xf5f8fc);
      }
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

    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min(now - lastStamp, 64) / 1000;
      lastStamp = now;
      elapsed += dt;

      const targetBoost = hovered ? 1 : 0;
      smoothBoost += (targetBoost - smoothBoost) * Math.min(1, dt * 6);
      smoothTiltX += (targetTiltX - smoothTiltX) * Math.min(1, dt * 6);
      smoothTiltY += (targetTiltY - smoothTiltY) * Math.min(1, dt * 6);

      const spinRate = baseRpm * (1 + smoothBoost * 1.45);
      rotorGroup.rotation.z -= dt * spinRate;

      ledMat.uniforms.uTime.value = elapsed;
      ledMat.uniforms.uBoost.value = smoothBoost;
      ledPoint.intensity = (isPlus ? 1.4 : 0.55) * (1 + smoothBoost * 0.7);

      if (airflowPoints && airflowPositions && airflowSpeeds && airflowGeom) {
        const posAttr = airflowGeom.getAttribute("position") as THREE.BufferAttribute;
        const velBoost = 1 + smoothBoost * 1.35;
        for (let i = 0; i < baseParticleBudget; i++) {
          const spd = airflowSpeeds[i] * velBoost * dt * (isPlus ? 2.2 : 1.5);
          if (isStd) {
            airflowPositions[i * 3] += spd;
            if (airflowPositions[i * 3] > 2.25) {
              airflowPositions[i * 3] = 0.78;
            }
          } else {
            airflowPositions[i * 3 + 2] += spd;
            if (airflowPositions[i * 3 + 2] > 1.95) {
              airflowPositions[i * 3 + 2] = 0.22;
            }
          }
        }
        posAttr.needsUpdate = true;
      }

      assembly.rotation.x = smoothTiltX + Math.sin(elapsed * 0.9) * 0.04;
      assembly.rotation.y = smoothTiltY + Math.cos(elapsed * 0.7) * 0.08;

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
    const onContextRestored = () => setContextLost(false);

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
      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerLeave);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      disposeThreeResources(scene, renderer);
    };
  }, [variant, enableWebGL, contextLost, tier, dpr, particleCount, interactive, compact]);

  if (!enableWebGL || contextLost) {
    return (
      <FanFallbackPoster
        variant={variant}
        compact={compact}
        className={className}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      data-cursor-kind={interactive && !compact ? "inspect" : undefined}
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
