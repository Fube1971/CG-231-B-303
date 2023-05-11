var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(80, WIDTH / HEIGHT);
camera.position.z = 4.5;
camera.position.x = -1.2;
camera.position.y = 2;

camera.rotation.set(0, -0.5, 0);
scene.add(camera);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

/**
 * 
 * @param {Numero de lados} nlados 
 * @param {Tamanio de lados} ladoigual 
 * @returns {arreglo de vertices}
 */

function poligono(nlados, ladoigual) {
  const vertices = [];
  const ang = 2*Math.PI/nlados;
  for (let i = 0; i <= nlados; i++) {
      let x = ladoigual * Math.cos(i * ang);
      let y = ladoigual * Math.sin(i * ang);
      vertices[i] = new THREE.Vector3(x, y, 0);
  }
  return vertices;
}

/**
 * 
 * @param {Vertices calculados por poligono} vertices 
 * @param {largo del prisma} LargoLado 
 * @returns {Geometria del prisma} Geometry
 */
function createShapeGeometry(vertices, LargoLado) {
  // Create a new shape object
  const shape = new THREE.Shape();

  // Move to the first vertex
  shape.moveTo(vertices[0].x, vertices[0].y);

  // Create a line from each vertex to the next
  for (let i = 1; i < vertices.length; i++) {
    shape.lineTo(vertices[i].x, vertices[i].y);
  }

  // Close the shape by creating a line from the last vertex to the first
  shape.lineTo(vertices[0].x, vertices[0].y);

  // Create the geometry by extruding the shape
  const extrudeSettings = {
    depth: LargoLado,  
    bevelEnabled: false
  };
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

  return geometry;
}

var vertices =  poligono (5, 1);
var largoPrisma = 6;

const geometry = createShapeGeometry(vertices, largoPrisma);
const material = new THREE.MeshToonMaterial({color: 0xf9a3ff});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

    
//animation
  var animate = function(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-1, 2, 4);
scene.add(light);

const size = 150;
const divisions = 160;
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();