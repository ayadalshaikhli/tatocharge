import {
  Canvas,
  useLoader,
  useFrame,
  useSpring,
  useThree,
} from "@react-three/fiber";
import React, { Suspense, useRef, useState, useEffect } from "react";
import {
  CubeCamera,
  Environment,
  Html,
  MeshReflectorMaterial,
  PerspectiveCamera,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import { Section } from "./section";
import * as THREE from "three";
import { proxy, useSnapshot } from "valtio";
import { gsap, Expo } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { LedRings } from "./LedRing";
import Ground from "./Ground";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";
import lerp from "lerp";
gsap.registerPlugin(ScrollTrigger);
const color = new THREE.Color();
const tl = gsap.timeline({
  defaults: { ease: "power3.out" },
});
const round = (n) => Math.round(n * 100) / 100;

const Lights = () => {
  const { viewport } = useThree();
  const groupL = useRef();
  const groupR = useRef();
  const front = useRef();
  // useFrame(({ mouse }) => {
  //   const x = (mouse.x * viewport.width) / 2;
  //   const y = (mouse.y * viewport.height) / 2;
  //   front.current.position.set(x, y, 0);
  //   front.current.rotation.set(-y, x, 0);

  //   // ref.current.rotation(x, y, 2.5)
  // });
  return (
    <>
      {/* Ambient Light illuminates lights for all objects */}
      <ambientLight intensity={0.1} />
      {/* Diretion light */}
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <directionalLight position={[-100, 10, 5]} intensity={1.5} />

      <directionalLight
        castShadow
        position={[0, 0, 0]}
        intensity={12.2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={10}
        shadow-camera-bottom={-20}
      />
      {/* Spotlight Large overhead light */}
      <spotLight intensity={0.5} position={[1000, 0, 0]} />
      <group ref={groupL}>
        <pointLight position={[0, 7, -15]} distance={15} intensity={10} />
      </group>
      <group ref={groupR}>
        <pointLight position={[0, 7, -15]} distance={15} intensity={10} />
      </group>
      <spotLight
        castShadow
        ref={front}
        penumbra={0.75}
        angle={Math.PI / 4}
        position={[0, 0, 10]}
        distance={10}
        intensity={15}
        shadow-mapSize={[2048, 2048]}
      />
    </>
  );
};

function Green() {
  const { nodes, materials } = useGLTF("/ringGreenddd.glb");
  const cup = useRef();
  const moon = useRef();
  const mark = useRef();
  const cam = useRef();
  const group = useRef();
  const { viewport } = useThree();

  // useFrame((state, delta) => {
  //   let t = -state.clock.getElapsedTime() * 0.128;
  //   roughness.offset.set(0, t % 1);
  //   normal.offset.set(0, t % 1);
  // });
  // const [hovered, set] = useState();

  // for demonstrating first eye is same as second eye
  // Output: false, true=
  // useEffect(() => {
  //   if (hovered)
  //     moon.current.getObjectByName(hovered).material.color.set("white");
  //   document.body.style.cursor = hovered ? "pointer" : "auto";
  // }, [hovered]);
  // useFrame((state) => {
  //   moon.current.children[0].children.forEach((child, index) => {
  //     child.material.color.lerp(
  //       color
  //         .set(hovered === child.name ? "gold" : "white")
  //         .convertSRGBToLinear(),
  //       hovered ? 0.1 : 0.05
  //     );
  //   });
  // });

  useEffect((state) => {
    // cup.current.rotation.y = 6.2;
    // cup.current.rotation.x = 5.63;
    // cup.current.rotation.y = 4.1;

    // gsap.from(cam.current.position, 4, {
    //   z: -50,
    //   delay: 1,
    //   ease: Expo.easeOut,
    // });

    // gsap.from(moon.current.rotation, 60, {
    //   y: -7.412,
    //   repeat: -1,
    //   ease: "none",
    // });
    // gsap.from(cam.current.position, 1, {
    //   z: -20.412,
    //   ease: Expo.easeInOut,
    // });
    // gsap.from(cup.current.rotation, 3, {
    //   y: 1,
    //   delay: 1,
    // });
    // gsap.from(cup.current.position, 3, {
    //   y: 5,
    // });
    // gsap.from(cam.current.position, 3, {
    //   y: 2.5,
    //   delay: 3,
    // });

    // tl.from(
    //   moon.current.rotation,
    //   3,
    //   {
    //     x: 3.1,

    //     ease: "none",
    //   },
    //   "-=2"
    // );
    // gsap.from(
    //   moon.current.rotation,
    //   50,
    //   {
    //     y: -7.76573,
    //     ease: "none",
    //     repeat: -1,
    //   },
    //   -3
    // );
    // tl.to(
    //   mark.current.rotation,
    //   1,
    //   {
    //     z: 6.9,
    //     ease: "none",
    //   },
    //   "-=1"
    // );
    // ScrollTrigger.create({
    //   trigger: ".product-list",
    //   start: "top 50%",
    //   end: "bottom 0%",

    //   onEnter: () => {
    //     gsap.to(".body", {
    //       duration: 1.0,
    //       backgroundColor: "#fff",
    //     });
    //   },

    //   onLeaveBack: () => {
    //     gsap.to(".body", {
    //       duration: 1.0,
    //       backgroundColor: "#000",
    //     });
    //   },
    // });

    ScrollTrigger.create({
      trigger: ".wrap",

      scrub: 5,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // cup.current.rotation.x = -2 * Math.PI * self.progress;
        cup.current.rotation.y = -1 * Math.PI * self.progress;
        cam.current.position.z = -24 * self.progress;
        cam.current.rotation.x = -0.22 * self.progress;
        mark.current.position.x = -1.5 * self.progress;
        mark.current.position.z = -1.5 * self.progress;
        // cup.current.rotation.z = -2 * Math.PI * self.progress;
        // cup.current.position.y = -17 * self.progress;
        // cup.current.position.y = -2 * self.progress;
      },
    });
  });
  // const [roughness, normal] = useLoader(TextureLoader, [
  //   "textures/terrain-roughness.jpg",
  //   "textures/silver.jpg",
  // ]);

  // useEffect(() => {
  //   [normal, roughness].forEach((t) => {
  //     t.wrapS = RepeatWrapping;
  //     t.wrapT = RepeatWrapping;
  //     t.repeat.set(5, 5);
  //     t.offset.set(0, 0);
  //   });

  //   normal.encoding = LinearEncoding;
  // }, [normal, roughness]);

  // useFrame((state, delta) => {
  //   let t = -state.clock.getElapsedTime() * 0.128;
  //   roughness.offset.set(0, t % 1);
  //   normal.offset.set(0, t % 1);
  // });

  ScrollTrigger.clearScrollMemory();

  return (
    <>
      <group
        ref={moon}
        rotation={[1, 0, 0]}
        position={[0, 1, 0]}
        dispose={null}
      >
        {/* <primitive object={firstGltf.scene} position={[0, 185, 0]} /> */}
        <group
          position={[0, 0, 0]}
          ref={cup}
          // onPointerOver={(e) => (e.stopPropagation(), set(e.object.name))}
          // onPointerOut={(e) => (e.stopPropagation(), set(null))}
        >
          <mesh
            geometry={nodes.Round007.geometry}
            material={materials["Ring Material.001"]}
            position={[-0.01, 1.49, 0]}
            scale={30.58}
          >
            <meshStandardMaterial roughness={0.2} metalness={1} color="gray" />
          </mesh>
          <mesh
            geometry={nodes.Round.geometry}
            material={materials["Diamond.001"]}
            position={[-0.01, 2.38, 0]}
            scale={[3.64, 3.63, 3.64]}
          >
            <meshStandardMaterial roughness={0.2} metalness={1} color="green" />
            <pointLight
              ref={mark}
              position={[-0.8, 2.08, -3]}
              distance={15}
              intensity={20}
            />
          </mesh>
        </group>
      </group>

      <group ref={cam} name="Camera" position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <PerspectiveCamera makeDefault fov={25} position={[0, 0, 0]}>
          <directionalLight
            position={[300, 130, 15]}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-left={-8}
            shadow-camera-bottom={-8}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            intensity={0.5}
            shadow-bias={-0.0001}
          />
        </PerspectiveCamera>
      </group>
    </>
  );
}

const HTMLContent = ({ products }) => {
  return (
    <Section factor={1.5} offset={1}>
      {/* <group
        ref={ref}
        scale={50}
        position={[60, 185, 0]}
        dispose={null}
        // onPointerOver={(e) => (
        //   e.stopPropagation(), set(e.object.material.name)
        // )}
        // onPointerOut={(e) => e.intersections.length === 0 && set(null)}
        // onPointerMissed={() => (state.current = null)}
        // onClick={(e) => (
        //   e.stopPropagation(), (state.current = e.object.material.name)
        // )}
      >
        {/* <group position={[0.06, 9.41, -0.23]} rotation={[0, 0.87, 0]}>
          <mesh
            geometry={nodes.Plane.geometry}
            material={materials.MatPadren}
            position={[-0.06, -9.35, 0.39]}
            rotation={[0, -1.57, 0]}
            scale={20.84}
          />
        </group> */}
      {/* <group ref={cup} position={[0, 5, 0]} rotation={[250, 0, 0]}>
          <mesh
            geometry={nodes.Round007.geometry}
            material={materials["Ring Material.001"]}
            position={[-0.01, 1.49, 0]}
            scale={30.58}
          />
          <mesh
            geometry={nodes.Round.geometry}
            material={materials["Diamond.001"]}
            material-color={"#00ff00"}
            position={[-0.01, 2.38, 0]}
            scale={[3.64, 3.63, 3.64]}
          />
        </group>
      </group> */}

      {/* <mesh scale={25} position={[0, -18, 0]}>
          <Model />
          <meshMatcapMaterial map={colorMap} attachArray="material" />
        </mesh> */}

      {/* Hellod */}

      <Green />

      {/* <Pink />
      <White /> */}
      <Html fullscreen></Html>
    </Section>
  );
};

// function Picker() {
//   const snap = useSnapshot(state);
//   return (
//     <div>
//       <HexColorPicker
//         className="picker"
//         color={snap.items[snap.current]}
//         onChange={(color) => (state.items[snap.current] = color)}
//       />
//       <h1>{snap.current}</h1>
//     </div>
//   );
// }
function Dolly() {
  // This one makes the camera move in and out

  useFrame(({ clock, camera }) => {
    camera.position.z = 25 + Math.sin(clock.getElapsedTime()) * 2;
  });
  return null;
}

export default function Hero({ products }) {
  return (
    <>
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
        }}
        id="main-canvas"
        linear
        colorManagment
        shadows
       
        // camera={{ position: [0, 380, 30], fov: 25, far: 500 }}
      >
        <Lights />

        <Suspense fallback={null}>
          <HTMLContent products={products} />
        </Suspense>
        <Dolly />
      </Canvas>
    </>
  );
}

useGLTF.preload("/Glasses_Morpher.glb");
