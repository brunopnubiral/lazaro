import { useState } from 'react'
import './App.css'
import { Gltf, Preload } from '@react-three/drei'
import { geometry } from 'maath'
import { Frame } from './components/Frame'
import { Canvas, extend } from '@react-three/fiber'
import Rig from './components/Rig'

extend(geometry)
function App() {
  const [count, setCount] = useState(0)
  const doc = document.getElementById('root')
  if ( !doc) return null
  return (
  <Canvas flat camera={{ fov: 75, position: [0, 0, 20] }} eventSource={doc} eventPrefix="client">
     <color attach="background" args={['#f0f0f0']} />
    <Frame id="01" name={`pick\nles`} author="Omar Faruq Tawsif" bg="#e4cdac" position={[-1.15, 0, 0]} rotation={[0, 0.5, 0]}>
      <Gltf src="pickles_3d_version_of_hyuna_lees_illustration-transformed.glb" scale={8} position={[0, -0.7, -2]} />
    </Frame>
    <Frame id="02" name="tea" author="Omar Faruq Tawsif">
      <Gltf src="fiesta_tea-transformed.glb" position={[0, -2, -3]} />
    </Frame>
    <Frame id="03" name="still" author="Omar Faruq Tawsif" bg="#d1d1ca" position={[1.15, 0, 0]} rotation={[0, -0.5, 0]}>
      <Gltf src="still_life_based_on_heathers_artwork-transformed.glb" scale={2} position={[0, -0.8, -4]} />
    </Frame>
    <Rig/>
     <Preload all />
  </Canvas>
  )
}

export default App
