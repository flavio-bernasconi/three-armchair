import * as THREE from "three";

export const MODEL_PATH =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/chair.glb";

export const COLORS = [
  {
    color: "66533C",
  },
  {
    color: "173A2F",
  },
  {
    color: "153944",
  },
  {
    color: "27548D",
  },
  {
    color: "438AAC",
  },
];

const INITIAL_MTL = new THREE.MeshPhongMaterial({
  color: 0xf1f1f1,
  shininess: 10,
});

export const INITIAL_MAP = [
  { childID: "back", mtl: INITIAL_MTL },
  { childID: "base", mtl: INITIAL_MTL },
  { childID: "cushions", mtl: INITIAL_MTL },
  { childID: "legs", mtl: INITIAL_MTL },
  { childID: "supports", mtl: INITIAL_MTL },
];

export const MODEL_PARTS = [
  {
    name: "legs",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/legs.svg",
  },
  {
    name: "cushions",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/cushions.svg",
  },
  {
    name: "base",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/base.svg",
  },
  {
    name: "supports",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/supports.svg",
  },
  {
    name: "back",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/back.svg",
  },
];
