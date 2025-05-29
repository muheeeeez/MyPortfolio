<template>
  <div class="three-container">
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
    <div v-if="error" class="error-message">
      Failed to load 3D model: {{ error }}
    </div>
    <div ref="threeContainer" class="w-full h-full"></div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { gsap } from "gsap";
import modelPath from "../img/muiz.glb";

export default {
  name: "ThreeModel",
  setup() {
    const threeContainer = ref(null);
    const loading = ref(true);
    const error = ref(null);
    let scene, camera, renderer, model, controls, mixer, clock;
    let animationMixers = [];

    const initThree = () => {
      // Scene setup with basic environment
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf5f5f5);

      // Camera with standard settings
      camera = new THREE.PerspectiveCamera(
        60,
        threeContainer.value.clientWidth / threeContainer.value.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 3);
      camera.lookAt(0, 0, 0);

      // Basic renderer setup
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
      });
      renderer.setSize(
        threeContainer.value.clientWidth,
        threeContainer.value.clientHeight
      );
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.shadowMap.enabled = true;
      threeContainer.value.appendChild(renderer.domElement);

      // Simple controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enableZoom = true;
      controls.enablePan = true;
      controls.target.set(0, 0, 0);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      clock = new THREE.Clock();

      // Load main model and idle animation
      loadModelAndAnimation();
    };

    const loadModelAndAnimation = () => {
      const gltfLoader = new GLTFLoader();
      const fbxLoader = new FBXLoader();

      // Load main character model
      gltfLoader.load(
        modelPath,
        function (gltf) {
          model = gltf.scene;
          
          // Reset transformations
          model.position.set(0, 0, 0);
          model.rotation.set(0, 0, 0);
          model.scale.set(1, 1, 1);

          // Setup model
          model.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              if (child.material) {
                child.material.side = THREE.DoubleSide;
                child.material.transparent = false;
                child.material.opacity = 1;
                child.material.needsUpdate = true;
              }
            }
          });

          scene.add(model);

          // Create animation mixer
          mixer = new THREE.AnimationMixer(model);
          animationMixers.push(mixer);

          // Load idle animation using absolute path
          fbxLoader.load(
            '/Idle.fbx',
            function (fbx) {
              console.log('FBX loaded successfully:', fbx);
              const idleAnimation = fbx.animations[0];
              console.log('Animation found:', idleAnimation);
              
              if (idleAnimation) {
                console.log('Animation duration:', idleAnimation.duration);
                
                // Create animation mixer if it doesn't exist
                if (!mixer) {
                  mixer = new THREE.AnimationMixer(model);
                  animationMixers.push(mixer);
                }
                
                // Create and play animation
                const action = mixer.clipAction(idleAnimation);
                console.log('Animation action created:', action);
                action.setLoop(THREE.LoopRepeat);
                action.clampWhenFinished = false;
                action.play();
                console.log('Animation started playing');
              } else {
                console.warn('No animation found in the FBX file');
              }
              
              loading.value = false;
            },
            // Progress callback
            function (progress) {
              console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
            },
            function (error) {
              console.error("Error loading idle animation:", error);
            }
          );

          // Center and adjust camera
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());

          const maxDim = Math.max(size.x, size.y, size.z);
          const fov = camera.fov * (Math.PI / 180);
          let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.5;

          camera.position.set(0, 0, cameraZ);
          const minZ = box.min.z;
          const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;

          camera.far = cameraToFarEdge * 3;
          camera.updateProjectionMatrix();

          model.position.x = -center.x;
          model.position.y = -center.y;
          model.position.z = -center.z;
        },
        undefined,
        function (err) {
          console.error("Error loading model:", err);
          error.value = err.message || "Failed to load";
          loading.value = false;
        }
      );
    };

    const animate = () => {
      requestAnimationFrame(animate);

      if (controls) controls.update();

      // Update animations
      const delta = clock.getDelta();
      if (animationMixers.length > 0) {
        animationMixers.forEach(mixer => {
          if (mixer) {
            mixer.update(delta);
          }
        });
      }

      // Render scene
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    const onWindowResize = () => {
      if (camera && renderer && threeContainer.value) {
        camera.aspect =
          threeContainer.value.clientWidth / threeContainer.value.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          threeContainer.value.clientWidth,
          threeContainer.value.clientHeight
        );
      }
    };

    onMounted(() => {
      initThree();
      animate();
      window.addEventListener("resize", onWindowResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", onWindowResize);
      if (threeContainer.value && renderer) {
        threeContainer.value.removeChild(renderer.domElement);
      }
      if (controls) controls.dispose();
      if (renderer) renderer.dispose();
    });

    return {
      threeContainer,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 100%;
  min-height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
}
.three-container:active {
  cursor: grabbing;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(245, 245, 245, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(74, 90, 249, 0.2);
  border-radius: 50%;
  border-top-color: #4a5af9;
  animation: spin 1s ease-in-out infinite;
}

.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 0, 0, 0.2);
  color: #721c24;
  padding: 1rem;
  border-radius: 0.5rem;
  z-index: 10;
  text-align: center;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 