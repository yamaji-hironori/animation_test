
const GUI = lil.GUI;
const effectController = {
    speed: 0.1, // speed of ball movement
    numBlobs: 10, // number of balls
    scale_x: 700, // marchingCube scale x
    scale_y: 700, // marchingCube scale y
    scale_z: 70, // marchingCube scale z
    camera_pos_x: 0, // camera position x
    camera_pos_y: 0, // camera position y
    camera_pos_z: 600, // camera position z
}

const randomOffset = Math.random() * (2 * Math.PI)
let rainbow = [
    new THREE.Color( 0xff0000 ),
    new THREE.Color( 0xff7f00 ),
    new THREE.Color( 0xffff00 ),
    new THREE.Color( 0x00ff00 ),
    new THREE.Color( 0x0000ff ),
    new THREE.Color( 0x4b0082 ),
    new THREE.Color( 0x9400d3 )
]
const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
rainbow = shuffle(rainbow)

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * MarchingCubes
 */
const material = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0xffffff, shininess: 2, vertexColors: THREE.VertexColors})

const resolution = 28
const marchingcube = new MarchingCubes(resolution, material, false, true, 10000)
marchingcube.scale.set(effectController.scale_x, effectController.scale_y, effectController.scale_z)
marchingcube.enableColors = true
scene.add(marchingcube)

/**
 * Lights
 */
const light = new THREE.DirectionalLight(0xffffff)
light.position.set(0, 0, 1)
scene.add(light)

const ambientLight = new THREE.AmbientLight(0xffeded)
scene.add(ambientLight)

/**
 * Sizes
 */
const root_element = document.documentElement;
const sizes = {
    // width: window.innerWidth - 20,
    width: root_element.clientWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    // sizes.width = window.innerWidth - 20
    sizes.width = root_element.clientWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setPixelRatio(window.devicePixelRatio)
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(45, root_element.clientWidth / window.innerHeight, 1, 10000)
camera.position.set(effectController.camera_pos_x, effectController.camera_pos_y, effectController.camera_pos_z)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearAlpha(0)

/**
 * Animate
 */
const clock = new THREE.Clock()

function updateCubes(object, time, numblobs) {

    object.reset()

    const subtract = 12
    const strength = 1.2 / ( ( Math.sqrt( numblobs ) - 1 ) / 4 + 1 )

    for ( let i = 0; i < numblobs; i ++ ) {

        const ballx = Math.sin( randomOffset + i + 1.26 * time * ( 1.03 + 0.5 * Math.cos( 0.21 * i ) ) ) * 0.27 + 0.5
        const bally = Math.abs( Math.cos( randomOffset + i + 1.12 * time * Math.cos( 1.22 + 0.1424 * i ) ) ) * 0.6 + 0.2; // dip into the floor
        const ballz = Math.cos( randomOffset + i + 1.32 * time * 0.1 * Math.sin( ( 0.92 + 0.53 * i ) ) ) * 0.27 + 0.5

        object.addBall( ballx, bally, ballz, strength, subtract, rainbow[i % 7] )

    }

    object.update()

}

let time = 0
const tick = () =>
{
    const delta = clock.getDelta()
    time += delta * effectController.speed * 0.5

    // Animate marchingcube
    updateCubes(marchingcube, time, effectController.numBlobs)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
