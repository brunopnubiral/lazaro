import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useRoute } from 'wouter';
import * as THREE from 'three';
import { useCursor, MeshPortalMaterial, CameraControls, Gltf, Text, Preload } from '@react-three/drei'

const Rig = ({ position = new THREE.Vector3(0, 0, 2), focus = new THREE.Vector3(0, 0, 0) }) => {
    const { controls, scene } = useThree();
    const [, params] = useRoute('/item/:id');

    useEffect(() => {
        if (params){
            const {parent} = scene.getObjectByName(params?.id) || {};
            if (parent) {
                parent.localToWorld(position.set(0, 0.5, 0.25));
                parent.localToWorld(focus.set(0, 0, -2));
            }
            controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
        }
    });

    return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />;
};

export default Rig;