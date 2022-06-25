import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Html, OrbitControls, Environment, ContactShadows } from '@react-three/drei'





function Model(props) {
  /*
  Auto-generated by: https://github.com/pmndrs/gltfjsx
  author: JasperTobias (https://sketchfab.com/JasperTobias)
  license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
  source: https://sketchfab.com/3d-models/lowpoly-earth-ce0cce9b528b47c7984bf0b2b600d705
  title: LowPoly Earth
  */
  const boxOne = useRef();

  useFrame((state) => (boxOne.current.rotation.z = Math.sin(state.clock.getElapsedTime() / 2) * Math.PI)
  )
  const { nodes, materials } = useGLTF('/earth.gltf')
  return (
    <group ref={boxOne} rotation={[-Math.PI / 2, 0, Math.PI]}  {...props} dispose={null}>
      <mesh geometry={nodes['URF-Height_Lampd_Ice_0'].geometry} material={materials.Lampd_Ice} />
      <mesh geometry={nodes['URF-Height_watr_0'].geometry} material={materials.watr} material-roughness={0} />
      <mesh geometry={nodes['URF-Height_Lampd_0'].geometry} material={materials.Lampd} material-color="lightgreen">
        <Marker rotation={[0, Math.PI / 2, 0]} position={[0, 1.3, 0]}>
          {/* Anything in here is regular HTML, these markers are from font-awesome */}
         
        </Marker>
        <group position={[0, 0, 1.3]} rotation={[0, 0, Math.PI]}>
          <Marker rotation={[0, Math.PI / 2, Math.PI / 2]}>
            <div style={{ position: 'absolute', fontSize: 10, letterSpacing: -0.5, left: 17.5 }}></div>
            
          </Marker>
        </group>
      </mesh>
    </group>
  )
}

// Let's make the marker into a component so that we can abstract some shared logic
function Marker({ children, ...props }) {
  // This holds the local occluded state
  const [occluded, occlude] = useState()
  return (
    <Html
      // 3D-transform contents
      transform
      // Hide contents "behind" other meshes
      occlude
      // Tells us when contents are occluded (or not)
      onOcclude={occlude}
      // We just interpolate the visible state into css opacity and transforms
      style={{ transition: 'all 0.2s', opacity: occluded ? 0 : 1, transform: `scale(${occluded ? 0.25 : 1})` }}
      {...props}>
      {children}
    </Html>
  )
}

export default function Earth() {
    const ref = useRef()
    return (
      <Canvas style={{
        position: "fixed",
        height: "100vh",
        width: "100vw",
      
      }} dpr={[1, 2]} camera={{ position: [5, 0, 0], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Model position={[0, 0.25, 0]} />
          <Environment preset="city" />
          <ContactShadows scale={5} position={[0, -1, 0]} far={1} blur={5} opacity={0.8} frames={1} />
        </Suspense>
        <OrbitControls ref={ref} />
      </Canvas>
  )
}

