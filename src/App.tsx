import { useState } from 'react'
import './App.css'
import { Gltf, Preload } from '@react-three/drei'
import { Frame } from './components/Frame'
import { Canvas } from '@react-three/fiber'
import Rig from './components/Rig'

function App() {
  const [selectedFrames, setSelectedFrames] = useState<string[]>([])

  const handleFrameClick = (id: string) => {
    setSelectedFrames(prevSelected => {
      if (prevSelected.includes(id)) {
        // Deseleccionar si ya está seleccionado
        return prevSelected.filter(frameId => frameId !== id)
      } else {
        // Seleccionar
        return [...prevSelected, id]
      }
    })
  }

  return (
    <Canvas flat camera={{ fov: 75, position: [0, 0, 20] }}>
      <color attach="background" args={['#000']} />
      <Frame
        id="01"
        name={`pick\nles`}
        author="Omar Faruq Tawsif"
        bg="#e4cdac"
        position={[-1.15, 0, 0]}
        rotation={[0, 0.5, 0]}
        onClick={handleFrameClick}
        isSelected={selectedFrames.includes("01")}
      >
        <Gltf src="pickles_3d_version_of_hyuna_lees_illustration-transformed.glb" scale={8} position={[0, -0.7, -2]} />
      </Frame>
      <Frame
        id="02"
        name="tea"
        author="Omar Faruq Tawsif"
        onClick={handleFrameClick}
        isSelected={selectedFrames.includes("02")}
      >
        <Gltf src="fiesta_tea-transformed.glb" position={[0, -2, -3]} />
      </Frame>
      <Frame
        id="03"
        name="still"
        author="Omar Faruq Tawsif"
        bg="#d1d1ca"
        position={[1.15, 0, 0]}
        rotation={[0, -0.5, 0]}
        onClick={handleFrameClick}
        isSelected={selectedFrames.includes("03")}
      >
        <Gltf src="still_life_based_on_heathers_artwork-transformed.glb" scale={2} position={[0, -0.8, -4]} />
      </Frame>
      <Rig />
      <Preload all />
    </Canvas>
  )
}

export default App
