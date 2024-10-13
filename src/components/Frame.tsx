import { useCursor, Text, MeshPortalMaterial } from "@react-three/drei"
import { FC, useRef, useState } from "react"
import { suspend } from "suspend-react"
import * as THREE from 'three'

export const Frame:FC<any>=({ id, name, author, bg, width = 1, height = 1.61803398875, children, ...props }) => {
    // const regular = import('@pmndrs/assets/fonts/inter_regular.woff')
    // const medium = import('@pmndrs/assets/fonts/inter_medium.woff')
    const portal = useRef<THREE.Mesh>(null)
    const [hovered, hover] = useState(false)
    useCursor(hovered)

    const setLocation = (path: string) => {
        window.location.href = path
    }

    return (
      <group {...props}>
        <Text  fontSize={0.3} anchorY="top" anchorX="left" lineHeight={0.8} position={[-0.375, 0.715, 0.01]} material-toneMapped={false}>
          {name}
        </Text>
        <Text  fontSize={0.1} anchorX="right" position={[0.4, -0.659, 0.01]} material-toneMapped={false}>
          /{id}
        </Text>
        <Text  fontSize={0.04} anchorX="right" position={[0.0, -0.677, 0.01]} material-toneMapped={false}>
          {author}
        </Text>
        <mesh name={id} onDoubleClick={(e) => (e.stopPropagation(), setLocation('/item/' + e.object.name))} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
          <planeGeometry args={[width, height]} />
          <MeshPortalMaterial ref={portal as any} side={THREE.DoubleSide}>
            <color attach="background" args={[bg]} />
            {children}
          </MeshPortalMaterial>
        </mesh>
      </group>
    )
  }