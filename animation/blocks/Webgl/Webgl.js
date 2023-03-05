// Canvas
const canvas = document.querySelector('canvas#Webgl')

const effectController = {
    ballSpeed: 0.1, // speed of ball movement
    numBlobs: 20, // number of balls
    scaleXY: 700, // marchingCube scale x
    scaleX: 1000, // marchingCube scale x
    scaleY: 1000, // marchingCube scale y
    scaleZ: 70, // marchingCube scale z
    camera_pos_x: 0, // camera position x
    camera_pos_y: 0, // camera position y
    camera_pos_z: 600, // camera position z
    blur: 40,
    opacitySpeed: 2,
    lightIntensity: 0.3,
    isolation: 80,
}

const randomOffset = Math.random() * (2 * Math.PI)
let colors = {
    color1:  0x0069FF ,
    color2:  0x3CBEF0 ,
    color3:  0xAFDCFA ,
    color4:  0xFFA500 ,
    color5:  0xFFDC96 ,
};

// Scene
const scene = new THREE.Scene()

/**
 * MarchingCubes
 */
const material = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0xffffff, shininess: 0, vertexColors: THREE.VertexColors})

const resolution = 18
const marchingcube = new MarchingCubes(resolution, material, false, true, 3000)
marchingcube.scale.set(effectController.scaleX, effectController.scaleY, effectController.scaleZ)
marchingcube.enableColors = true
scene.add(marchingcube)

/**
 * Lights
 */
const light = new THREE.DirectionalLight(0xffffff, effectController.lightIntensity)
light.position.set(0, 0, 100)
scene.add(light)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)

/**
 * Sizes
 */
const root_element = document.documentElement;
const sizes = {
    width: root_element.clientWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = root_element.clientWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
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

        object.addBall( ballx, bally, ballz, strength, subtract, colors[`color${i%5+1}`] )

    }

    object.update()

}

let time = 0
const tick = () =>
{
    const delta = clock.getDelta()
    time += delta * effectController.ballSpeed * 0.5

    // Animate marchingcube
    updateCubes(marchingcube, time, effectController.numBlobs)

    marchingcube.scale.set(effectController.scaleX, effectController.scaleY, effectController.scaleZ)
    marchingcube.isolation = effectController.isolation;
    light.intensity = effectController.lightIntensity;

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
