import { useLayoutEffect, useRef, useState } from "react";
import i18next from "../../intl/i18n";
import { Col, Row } from "react-bootstrap";
import TextTypeWritter from "../component/TextTypeWritter";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/Addons.js";
import { Mesh } from "three";
import * as THREE from 'three';

const intlDateFormatter = new Intl.DateTimeFormat(navigator.language, {year: "numeric", month: "numeric"});

const PortfolioEducationInfo = () => {
  const [position, setPosition] = useState(0);
  const educationInfo = [
    {name: i18next.t("edu.master"), grantedBy: i18next.t("edu.master.grantedBy"), date: intlDateFormatter.format(new Date("2022-10"))},
    {name: i18next.t("edu.lang"), grantedBy: i18next.t("edu.lang.grantedBy"), date: intlDateFormatter.format(new Date("2022-07"))},
    {name: i18next.t("edu.cs"), grantedBy: i18next.t("edu.cs.grantedBy"), date: intlDateFormatter.format(new Date("2018-09"))}
  ];

  return (
    <Row className="p-4 h-100 vertical-align">
      <Col md={7} sm={12}>
        {
          educationInfo.map(({name, grantedBy, date}, index) => 
              <ul key={name} onMouseEnter={() => setPosition(index)}>
                <li className="fs-2">
                  <TextTypeWritter text={name} />
                  <ul>
                    <li className="fs-3"><TextTypeWritter text={grantedBy} /></li>
                    <li className="fs-3"><TextTypeWritter text={date} /></li>
                  </ul>
                </li>
              </ul>
          )   
        }
      </Col>
      <Col md={5} className="d-md-block d-sm-none">
       <PortfolioEducationModel position={position}/>
      </Col>
    </Row>
  )
}

const PortfolioEducationModel = ({position}: {position: number}) => {
  return <Canvas>
    <PortfolioEducationModelMesh position={position}/>
  </Canvas> 
}

const PortfolioEducationModelMesh = ({position}: {position: number}) => {
  const crtMonitor = useLoader(OBJLoader, '/models/crt_monitor/crt_monitor.obj');
  const screen = useLoader(OBJLoader, '/models/screen/computer_screen_01.obj');
  const globe = useLoader(OBJLoader, '/models/globe/globe.obj');

  const mesh = useRef<Mesh>(null!);
  useLayoutEffect(() => {
    [screen, globe, crtMonitor].forEach((object) => {
      if (object) {
        object.traverse((child) => {
          if (child instanceof Mesh) {
            child.material = new THREE.MeshMatcapMaterial({ color: new THREE.Color('rgb(0, 255, 0)')});
          }
        });
      }
    })
  }, [crtMonitor, globe, screen]);

  useFrame(({clock, camera}) => {
    const objectsInScene = [screen, globe, crtMonitor]; 
    objectsInScene.map((object, index) => {
      object.position.set(index, 1, 0);
      object.rotation.y = clock.elapsedTime * 0.75; 
    })

    const {position: objectPosition} = objectsInScene[position];
    const {x,y,z} = objectPosition;
    // get camera position and rotation to object
    // the ctr-monitor is a little bit bigger so we move the
    // camera a little bit different
    const newX = camera.position.x + (x - camera.position.x) * 0.1;  
    camera.position.set(newX, y + ( position === 2 ? 0.2: 0.15), z + (position === 2 ? 0.65: 0.5))
    camera.lookAt(objectPosition)
    camera.rotation.x = 0.1;
    camera.rotation.y = 0.1;
  })

  return <mesh ref={mesh} >
      <primitive object={screen} />
      <primitive object={globe} />
      <primitive object={crtMonitor} />
  </mesh>
}

export default PortfolioEducationInfo;