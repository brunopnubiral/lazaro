import { useCursor, Text, MeshPortalMaterial, Edges } from "@react-three/drei"
import { FC, useRef, useState } from "react"
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import * as THREE from 'three'
import { useRoute } from "wouter"

interface FrameProps {
  id: string
  name: string
  author: string
  bg?: string
  width?: number
  height?: number
  children?: React.ReactNode
  onClick: (id: string) => void
  isSelected: boolean
  [key: string]: any
}

export const Frame: FC<FrameProps> = ({
  id,
  name,
  author,
  bg = "#fff",
  width = 1,
  height = 1.61803398875,
  children,
  onClick,
  isSelected,
  ...props
}) => {
  const portal = useRef<THREE.Mesh>(null)
  const [, params] = useRoute('/item/:id')
  const [hovered, hover] = useState(false)
  useCursor(hovered)

  useFrame((state, dt) => {
    if (portal.current) {
      easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt)
    }
  })

  const setLocation = (path: string) => {
    window.location.href = path
  }

  const handleClick = (e: any) => {
    e.stopPropagation()
    onClick(id)
  }

  return (
    <group {...props}>
      <Text
        fontSize={0.3}
        anchorY="top"
        anchorX="left"
        lineHeight={0.8}
        position={[-0.375, 0.715, 0.01]}
        material-toneMapped={false}
      >
        {name}
      </Text>
      <Text
        fontSize={0.1}
        anchorX="right"
        position={[0.4, -0.659, 0.01]}
        material-toneMapped={false}
      >
        /{id}
      </Text>
      <Text
        fontSize={0.04}
        anchorX="right"
        position={[0.0, -0.677, 0.01]}
        material-toneMapped={false}
      >
        {author}
      </Text>
      <mesh
        name={id}
        onClick={handleClick}
        onDoubleClick={(e) => (e.stopPropagation())}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <planeGeometry args={[width, height]} />
        {isSelected && <Edges lineWidth={8} color="blue" />}
        <MeshPortalMaterial ref={portal as any} side={THREE.DoubleSide}>
          <color attach="background" args={[bg]} />
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  )
}
