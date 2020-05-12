import * as THREE from "three";
import { COLORS } from "./cons";

export function selectSwatch(e, theModel, activeOption) {
  let color = COLORS[parseInt(e.target.dataset.key)];
  let new_mtl;

  new_mtl = new THREE.MeshPhongMaterial({
    color: parseInt("0x" + color.color),
    shininess: color.shininess ? color.shininess : 10,
  });

  const model = theModel();

  setMaterial(model, activeOption, new_mtl);
}

export function setMaterial(parent, type, mtl) {
  parent.traverse((o) => {
    if (o.isMesh && o.nameID != null) {
      if (o.nameID == type) {
        o.material = mtl;
      }
    }
  });
}

// Function - Add the textures to the models
export function initColor(model, type, mtl) {
  // console.log(type);
  model.traverse((o) => {
    if (o.isMesh) {
      if (o.name.includes(type)) {
        o.material = mtl;
        o.nameID = type; // Set a new property to identify this object
      }
    }
  });
}

// Add a camerra
export function createCamere() {
  var cameraFar = 5;
  var camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = cameraFar;
  camera.position.x = 0;

  return camera;
}
