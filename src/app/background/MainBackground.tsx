import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import styles from "./main-background.module.css"
import { OBJLoader } from "three/examples/jsm/Addons.js";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Mesh } from "three";
import * as THREE from 'three';

interface MousePosition {
    x: number, 
    y: number
}

const MainBackgroundGridMesh = (
  {mousePosition, initialAnimationFinished}: 
  {mousePosition: MousePosition, initialAnimationFinished: boolean}
) => {
  const grid = useLoader(OBJLoader, '/models/grid/grid.obj');
  const [opacity, setOpacity] = useState(0);
  const [opacityInc, setOpacityInc] = useState(true);
  const [cameraRotation, setCameraRotation] = useState({x:0, y:0});

  const mesh = useRef<Mesh>(null!);
  useLayoutEffect(() => {
    if (grid) {
    grid.traverse((child) => {
        if (child instanceof Mesh) {
        child.material = new THREE.MeshMatcapMaterial({ color: new THREE.Color('rgb(0, 255, 0)')});
        }
    });
    }
  }, [grid]);

  useEffect(() => {
    const movements = [-0.0005, -0.0002, 0, 0.0002, 0.0005];
    const breakpointsX = Array(5).fill(1).map((_, index) => (window.innerWidth / 5) * (index + 1));
    const breakpointsY = Array(5).fill(1).map((_, index) => (window.innerHeight / 5) * (index + 1));
    const breakpointIndexX = breakpointsX.findIndex(breakpoint => breakpoint > mousePosition.x);
    const breakpointIndexY = breakpointsY.findIndex(breakpoint => breakpoint > mousePosition.y);


    setCameraRotation(() => ({ x: movements[breakpointIndexX], y: movements[breakpointIndexY]}));
  }, [mousePosition])


  const setOpacities = () => {
    if(initialAnimationFinished){
      if(opacity >= 1){
          setOpacityInc(false);
      } else if (opacity <= 0.5){
          setOpacityInc(true);
      }
      setOpacity(() => opacityInc ? opacity + 0.005 : opacity - 0.005);
    }
  }

  useFrame(({camera}) => {
    grid.position.set(0,0,0);
    setOpacities();

    grid.traverse((child) => {
        if (child instanceof Mesh) {
        child.material = new THREE.MeshMatcapMaterial({color: new THREE.Color('rgb(0, 255, 0)'), transparent: true, opacity: opacity});
        }
    });

    camera.lookAt(0,0,0);
    grid.rotateY(cameraRotation.x);
    grid.rotateX(cameraRotation.y);
  })

  return <mesh ref={mesh} scale={6}>
      <primitive object={grid} />
  </mesh>
}

const MainBackground  = (
  {mousePosition, initialAnimationFinished}: 
  {mousePosition: MousePosition, initialAnimationFinished: boolean}
) => {
    
    return <div className={styles.mainBackground}>
        <div className={styles.mainBackgroundMeshContainer} >
            <Canvas>
                <MainBackgroundGridMesh mousePosition={mousePosition} initialAnimationFinished={initialAnimationFinished}/>
            </Canvas>
        </div>
    </div>
}

export default MainBackground;