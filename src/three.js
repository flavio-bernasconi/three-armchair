import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { COLORS, INITIAL_MAP, MODEL_PATH } from "./cons";
import { setMaterial, initColor } from "./utils";

let theModel = "";

const BACKGROUND_COLOR = 0xf1f1f1;
// Init the scene
const scene = new THREE.Scene();
// Set background
scene.background = new THREE.Color(BACKGROUND_COLOR);
scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);

const canvas = document.querySelector("#c");
// Init the renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Add a camerra
const cameraFar = 5;
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = cameraFar;
camera.position.x = 0;

//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2;
controls.enableDamping = true;
controls.enablePan = false;
controls.dampingFactor = 0.1;

export function createScene() {
  // Init the object loader
  loadModel();

  // Add hemisphere light to scene
  scene.add(createAmbienteLight());

  // Add directional Light to scene
  scene.add(createDarkLight());

  //add floor
  scene.add(createFloor());

  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    controls.update();

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
  }

  animate();

  // Function - New resizing method
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvasPixelWidth = canvas.width / window.devicePixelRatio;
    var canvasPixelHeight = canvas.height / window.devicePixelRatio;

    const needResize =
      canvasPixelWidth !== width || canvasPixelHeight !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
}

export function loadModel() {
  const loader = new GLTFLoader();

  loader.load(
    MODEL_PATH,
    function (gltf) {
      theModel = gltf.scene;

      theModel.traverse((o) => {
        if (o.isMesh) {
          o.castShadow = true;
          o.receiveShadow = true;
        }
      });

      // Set the models initial scale
      theModel.scale.set(2, 2, 2);
      theModel.rotation.y = Math.PI;

      // Offset the y position a bit
      theModel.position.y = -1;

      INITIAL_MAP.forEach((object) =>
        initColor(theModel, object.childID, object.mtl)
      );

      // Add the model to the scene
      scene.add(theModel);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  return theModel;
}

function createFloor() {
  // Floor
  var floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
  var floorMaterial = new THREE.MeshPhongMaterial({
    color: 0xd9d9d9,
    shininess: 0,
  });
  var floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -0.5 * Math.PI;
  floor.receiveShadow = true;
  floor.position.y = -1;

  return floor;
}

function createAmbienteLight() {
  // Add lights
  var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
  hemiLight.position.set(0, 50, 0);

  return hemiLight;
}

function createDarkLight() {
  // Add lights 2
  var dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
  dirLight.position.set(-8, 12, 8);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);

  return dirLight;
}
