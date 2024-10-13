import { useState } from 'react'
import './App.css'
import { Canvas, extend } from 'react-three-fiber'
import { useCursor, MeshPortalMaterial, CameraControls, Gltf, Text, Preload } from '@react-three/drei'
import { easing, geometry } from 'maath'
import { Frame } from './components/Frame'

extend(geometry)
function App() {
  const [count, setCount] = useState(0)

  return (
  <Canvas>
     <color attach="background" args={['#f0f0f0']} />
    <Frame id="01" name={`pick\nles`} author="Omar Faruq Tawsif" bg="#e4cdac" position={[-1.15, 0, 0]} rotation={[0, 0.5, 0]}>
      <Gltf src="pickles_3d_version_of_hyuna_lees_illustration-transformed.glb" scale={8} position={[0, -0.7, -2]} />
    </Frame>
     <Preload all />
  </Canvas>
  )
}

export default App
