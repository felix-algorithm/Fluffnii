import * as THREE from "three";

/**
 * Traverses a Three.js scene or group and disposes all geometries,
 * materials, textures, and shader uniform textures before disposing the renderer.
 */
export function disposeThreeResources(
  root: THREE.Object3D,
  renderer?: THREE.WebGLRenderer | null
): void {
  const disposedTextures = new Set<THREE.Texture>();
  const disposedMaterials = new Set<THREE.Material>();
  const disposedGeometries = new Set<THREE.BufferGeometry>();

  const disposeTextureMaybe = (val: unknown) => {
    if (val instanceof THREE.Texture && !disposedTextures.has(val)) {
      disposedTextures.add(val);
      val.dispose();
    }
  };

  const disposeMaterial = (material: THREE.Material) => {
    if (disposedMaterials.has(material)) return;
    disposedMaterials.add(material);

    for (const value of Object.values(material)) {
      disposeTextureMaybe(value);
    }

    if (material instanceof THREE.ShaderMaterial && material.uniforms) {
      for (const uniform of Object.values(material.uniforms)) {
        disposeTextureMaybe(uniform?.value);
      }
    }

    material.dispose();
  };

  root.traverse((obj) => {
    const maybeRenderable = obj as THREE.Object3D & {
      geometry?: THREE.BufferGeometry;
      material?: THREE.Material | THREE.Material[];
    };

    if (
      maybeRenderable.geometry &&
      !disposedGeometries.has(maybeRenderable.geometry)
    ) {
      disposedGeometries.add(maybeRenderable.geometry);
      maybeRenderable.geometry.dispose();
    }

    if (Array.isArray(maybeRenderable.material)) {
      maybeRenderable.material.forEach(disposeMaterial);
    } else if (maybeRenderable.material) {
      disposeMaterial(maybeRenderable.material);
    }
  });

  if (renderer) {
    renderer.renderLists?.dispose();
    renderer.dispose();
  }
}

/**
 * Reads the current `data-theme` attribute on `document.documentElement`.
 */
export function isDocumentDarkTheme(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.theme === "dark";
}
