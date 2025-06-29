import React, { useEffect } from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // Create a new material instead of using the one from the model
  const shirtMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(snap.color),
    roughness: 1,
    metalness: 0
  });

  // Apply the color from state immediately and on any changes
  useEffect(() => {
    console.log("Setting color to:", snap.color);
    shirtMaterial.color.set(snap.color);
    shirtMaterial.needsUpdate = true;
  }, [snap.color]);

  // Log what's happening with the materials
  useEffect(() => {
    console.log("Original material color:", materials.lambert1.color);
    console.log("Material type:", materials.lambert1.type);
    console.log("New material color:", shirtMaterial.color);
    
    // Let's examine the model structure
    console.log("Model nodes:", nodes);
  }, []);

  // Smoothly transition the color
  useFrame((state, delta) => {
    easing.dampC(shirtMaterial.color, snap.color, 0.25, delta);
    shirtMaterial.needsUpdate = true;
  });

  console.log("Current color in render:", snap.color);

  const stateString = JSON.stringify(snap);
  
  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={shirtMaterial}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal 
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  )
}

export default Shirt