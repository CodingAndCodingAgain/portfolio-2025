/* eslint-disable react/jsx-key */
'use client'

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from "./page.module.css";
import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react";
import { RoughEase, ScrambleTextPlugin, InertiaPlugin, Draggable } from "gsap/all";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { Mesh } from "three";
import * as THREE from 'three';
import i18next from "../intl/i18n";
import i18n from "../intl/i18n";

const intlDateFormatter = new Intl.DateTimeFormat(navigator.language, {year: "numeric", month: "numeric"});

gsap.registerPlugin(useGSAP, ScrambleTextPlugin, InertiaPlugin, Draggable);

const InitialState = ({setAnimationCounter} : { setAnimationCounter: Dispatch<SetStateAction<number>> }) => {
  const scopeRef = useRef(null);

  const {contextSafe} = useGSAP({scope: scopeRef});

  const onClick = contextSafe(() => {
    gsap.to(
      '.button', 
      { 
        opacity: 0, 
        duration: 1, 
        ease:RoughEase.ease.config({points:15, strength:3, clamp:true}),
        onComplete: () => setAnimationCounter(1) 
      }
    );
  });

  const onMouseEnter = contextSafe(() => {
    gsap.to('.button', { 
      backgroundColor: '#00ff3cff', 
      ease:RoughEase.ease.config({points:50, strength:3, clamp:true}), 
      duration: 0.50 
    });
  });

  const onMouseLeave = contextSafe(() => {
    gsap.to('.button', { backgroundColor:'rgba(255, 255, 255, 1)', ease:"easeNone", duration: 0.75 });
  });

  return (
  <div ref={scopeRef} className={styles.initialState}>
    <button 
      className={`${styles.initialStateLoader} button`} 
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave} 
      onClick={onClick}
    >
      {i18next.t("enter")}
    </button>
  </div>

  );
}

const AnimationInitialLoad = ({setAnimationCounter} : { setAnimationCounter: Dispatch<SetStateAction<number>> }) => {
  const grid: [number, number] = [20, 20];
  const gridElements = Array(grid[0])
        .fill(1)
        .map((_, index) => 
          <div key={index} className={styles.cubeRow}>
            {
              Array(grid[1])
              .fill(1)
              .map((_, index) => <span key={`cube-${index}`} className={`${styles.cube} cubeanimation`}/>)
            }
          </div>
        );
  const containerRef = useRef(null);
  
  useGSAP(() => {
    const timeline = gsap.timeline({
      onComplete: () => setAnimationCounter(2)
    });
    timeline.to(`.cubeanimation`, {
      duration: 1.5,
      scale: 0.1, 
      ease: "power1.inOut",
      stagger: {
        amount: 1.5, 
        grid: grid,
        ease: "none",
        from: "center"
      }
    });
    timeline.fromTo(`.cubeanimation`, 
      {
        opacity: 1
      }, 
      {
        opacity: 0,
        stagger: {
          amount: 1, 
          grid: grid,
          ease: "none",
          from: "random"
        }
      }
    )
  }, {scope: containerRef})

  return <div ref={containerRef} className={styles.page}>
      <div className={styles.cubeContainer}>
        {gridElements}
      </div>
    </div>
}

const PortfolioHeader = ({onComplete}: {onComplete: () => void}) => (
    <Row className="justify-content-center text-center pt-4">
      <Col sm={9} className="d-flex justify-content-center display-4">
        <TextTypeWritter text="[Project:CV:]" duration={2}/>
      </Col>
      <Col sm={9} className="d-flex justify-content-center display-3">
        <TextTypeWritter text="[J_R_L]" duration={2} onComplete={onComplete}/>
      </Col>
    </Row>
);

const PortfolioProfessionalContent = () => {
  
  const info = [
    { 
      title: i18next.t("professional.p1.business"), 
      date: `${intlDateFormatter.format(new Date("2022-03-01"))} - ${i18next.t("current")}`,
      subtitle: i18next.t("professional.p1.position"), 
      description: [ i18next.t("professional.p1.description.1"), i18next.t("professional.p1.description.2") ]
    },
    { 
      title: i18next.t("professional.p2.business"),
      date: `${intlDateFormatter.format(new Date("2018-09-01"))} - ${intlDateFormatter.format(new Date("2022-01-01"))}`,
      subtitle: i18next.t("professional.p2.position"), 
      description: [ i18next.t("professional.p2.description.1"), i18next.t("professional.p2.description.2") ]
    }
  ]

  return <Row>
    {info.map(({title, date, subtitle, description}, index) => (
      <Col key={index} sm={12}>
        <h1><TextTypeWritter text={title}/></h1>
        <ul>
          <li><h2><TextTypeWritter text={date}/></h2></li>
          <li>
            <h2><TextTypeWritter text={subtitle}/></h2>
            <ul>
              {description.map((paragraph, index) => <li key={index}><TextTypeWritter text={paragraph}/></li> )}
            </ul>
          </li>
        </ul>
      </Col>
    ))}
  </Row>
}

const PortfolioLanguageInfo = ({}) => {
  const languages = [
    {language: i18next.t("lang.english"), level: "C1", levelCounter: 6},
    {language: i18next.t("lang.spanish"), level: i18next.t("lang.spanish.native"), levelCounter: 8},
  ]

  const PortfolioLanguageCubeInfo = ({language, level, levelCounter, certificationDate}: {language: string, level: string, levelCounter: number, certificationDate?: string}) => {
    const containerRef = useRef(null);

    useGSAP(() => {
      const timeline = gsap.timeline({});
      const timelineSelectors = [".level-0", ".level-1", ".level-2", ".level-3"];
      timelineSelectors.forEach(sel => timeline.to(sel, {backgroundColor: "#00FF00", duration: 0.5, ease: "steps(1)"}))

      const timeline2 = gsap.timeline({repeat: -1})
      const timeline2Selectors: string[] = [".level-0-complete",".level-1-complete",".level-2-complete",".level-3-complete"];
      timeline2Selectors.forEach(sel => timeline2.to(sel, {backgroundColor: "#EEFF00FF", duration: 0.1, ease: "steps(1)"}))
      timeline2Selectors.forEach(sel => timeline2.to(sel, {backgroundColor: "#00FF00", duration: 0.1, ease: "steps(1)"}))
      timeline.add(timeline2)

    }, {scope: containerRef})

    return <Col ref={containerRef} md={5} sm={8} xs={11} className={`${styles.languageCube} p-5 justify-content-center`}>
      <Row className={`display-2 justify-content-center`}>{language}</Row>
      <Row className={`display-1 justify-content-center`}>{level}</Row>
      <Row className={`pt-3 ${levelCounter === 8 ? "level-complete": ""} `}>
        {
          Array(4).fill(1).map((_, index) => 
            <Col 
              key={index} 
              xs={3} 
              className={
                `${styles.languageCubeProgress} 
                level-${Math.floor(levelCounter / 2) >= (index + 1) ? index : "none"}
                ${levelCounter === 8 ? `level-${index}-complete`: ""}
                `}
            />
          )
        }
      </Row>
      <Row className={`display-4 justify-content-center`}>{certificationDate}</Row>
    </Col>
  }

  return <Row className="w-100 h-100 justify-content-around p-4">
    {
      languages.map(({language, level, levelCounter}) => 
        <PortfolioLanguageCubeInfo key={language} language={language} level={level} levelCounter={levelCounter} />
      )
    }
  </Row>
}

const LEVEL_INDICATORS = ["", "-", "!", "!!"]

const PortfolioTechnicalSkillsInfo = () => {
  const categories = ["languages", "frameworks", "os", "virtualization", "databases", "devops", "utilities", "methodologies" ]
  const info = new Map(Object.entries({
    languages: [
      { name: "Javascript", level: 3 }, { name: "Java", level: 2 }, { name: "Typescript", level: 2 },
      { name: "Python", level: 1 }, { name: "PHP", level: 1 }, { name: "CSS", level: 1 },
    ],
    frameworks: [
      { name: "React", level: 3}, { name: "Springboot", level: 2}, { name: "Selenium", level: 1},
      { name: "Angular", level: 1}, { name: ".NET", level: 1}, { name: "Jasmine", level: 1}, 
      { name: "Laravel", level: 1}
    ],
    os: [ {name: "Windows", level: 2}, {name: "Debian", level: 2}, {name: "Kali Linux", level: 1}],
    virtualization: [ {name: "Docker", level: 2}, {name: "VirtualBox", level: 2}, {name: "VMWare", level: 1} ],
    databases: [{ name: "PostgreSQL", level: 1}, { name: "MySQL", level: 1}, { name: "MariaDB", level: 1}],
    devops: [
      {name: "AWS Elastic Beanstalk", level: 1}, {name: "AWS CloudFront", level: 1}, {name: "AWS Lambda", level: 1},
      {name: "AWS S3", level: 1}, {name: "AWS Route53", level: 1}, {name: "AWS EC2", level: 1}, {name: "Jenkins", level: 1}
    ],
    utilities: [
      {name: "Git", level: 3}, {name: "VSCode", level: 2}, {name: "IntellijIDEA", level: 2}, {name: "DBeaver", level: 1},
      {name: "MySQL Workbench", level: 1}, {name: "CMD", level: 1}, {name: "Bash", level: 2}, 
    ],
    methodologies: [{ name: "Scrum", level: 3}]
  }));

  const containerRef = useRef(null);
  const lowerThanMd = window.innerWidth < 768;

  useGSAP(() => {
    if(!lowerThanMd){
      Draggable.create(".draggable", {
      bounds: containerRef?.current,
      inertia: true
    });
    }
  
  }, {scope : containerRef, dependencies: [lowerThanMd]})

  return (
    <Row ref={containerRef} className="p-4 justify-content-between text-center">
      <Col xs={12}>
        <Row>
          {["level.competent","level.skilled","level.basicOrPrevious"]
            .map((val, key) => <Col key={key} sm={4}>{i18next.t(val)}</Col>)}
        </Row>
      </Col>
      <Col md={7} xs={12} className="mt-4">
      {categories
        .map((category) => <Col key={category} sm={12} className="mb-4">
          <Row className="display-4 category justify-content-center">{i18next.t(category)}</Row>
          <Row className="d-flex skillContainer mt-3 justify-content-center">
            {info.get(category)?.map(({name, level}) => 
              <Col key={`${category}-${name}`} sm={6} className="fs-3 text-nowrap border border-success draggable">{`${name} ${LEVEL_INDICATORS[level]}`} </Col>)}
          </Row>
        </Col>
        )
      }
      </Col>
      <Col sm={4} className={`d-none d-md-block ${styles.portfolioTechnicalSkillsInfoSkillContainer} mt-4`}>
        <Row className="display-6 category justify-content-center m-2">{i18next.t('dragAndDrop')}</Row>
      </Col>
    </Row>
  )

}

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

const PortfolioTabs = () => {
  const tabs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const [tabShown1, setTabShown1] = useState(false);
  const [tabShown2, setTabShown2] = useState(false);
  const [tabShown3, setTabShown3] = useState(false);
  const [tabShown4, setTabShown4] = useState(false);

  const tabContent = useRef(null);
  const tabsContainer = useRef(null);
  const tabsSlide = useRef(null);
  
  useGSAP(() => {
    const timeline = gsap.timeline({});
    tabs.forEach((tab) => timeline.set(tab.current, { opacity : 0 }));
    tabs.forEach((tab) => timeline.to(tab.current, { opacity: 1, duration: 0.5, ease: "steps(1)"}));
    ["25", "50", "75", "100"]
      .forEach(xPercent => timeline.to(tabsSlide.current, { xPercent, duration: 0.5, ease: "steps(1)"}));
    timeline.set(tabsSlide.current, {opacity: 0});

  }, {scope: tabsContainer});

  return <Tab.Container defaultActiveKey={1}>
      <Row className="mt-5 flex-fill flex-column" ref={tabsContainer}>
        <Col sm={11} className={`${styles.tabsHeaderContainer} w-100`}>
          <Nav variant="tabs" defaultActiveKey="professional" className={styles.tabsHeader}>
            <Nav.Item ref={tabs[0]} className={styles.tabHeader} onClick={() => setTabShown1(true)}>
              <Nav.Link eventKey="professional">{i18next.t("professional.header")}</Nav.Link>
            </Nav.Item>
            <Nav.Item ref={tabs[1]} className={styles.tabHeader} onClick={() => setTabShown2(true)}>
              <Nav.Link eventKey="edu">{i18next.t("edu.header")}</Nav.Link>
            </Nav.Item>
            <Nav.Item ref={tabs[2]} className={styles.tabHeader} onClick={() => setTabShown3(true)}>
              <Nav.Link eventKey="lang">{i18next.t("lang.header")}</Nav.Link>
            </Nav.Item>
            <Nav.Item ref={tabs[3]} className={styles.tabHeader} onClick={() => setTabShown4(true)}>
              <Nav.Link eventKey="tech">{i18next.t("tech.header")}</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={12} className={`d-flex flex-fill w-100 min-h-100 ${styles.tabContentCol}`}>
          <Tab.Content ref={tabContent} className={`${styles.tabContent}`}>
            <Tab.Pane eventKey="professional" >
              {tabShown1 && <PortfolioProfessionalContent />}
            </Tab.Pane>
            <Tab.Pane eventKey="edu">
              {tabShown2 && <PortfolioEducationInfo />}
            </Tab.Pane>
            <Tab.Pane eventKey="lang" >
              {tabShown3 && <PortfolioLanguageInfo />}
            </Tab.Pane>
            <Tab.Pane eventKey="tech" >
              {tabShown4 && <PortfolioTechnicalSkillsInfo />}
            </Tab.Pane>
          </Tab.Content>
          <div ref={tabsSlide} className={`${styles.tabSlide} flex-fill min-h-100`}/>
        </Col>
      </Row>
    </Tab.Container>
}

const PortfolioInfo = ({}) => {
  const [portfolioLoaded, setPortfolioLoaded] = useState(false);

  return <Container className={`${styles.portfolio} d-flex flex-column`} >
    <PortfolioHeader onComplete={() => setPortfolioLoaded(true)}/>
    { portfolioLoaded && <PortfolioTabs /> }
  </Container>
}

const splitInChunks = ({text, length} : {text: string, length: number}) => {
  const chunks = [];
  let textPart = "";
  for(let i = 0; i < text.length; i++){
    if( i > 0 && (i % length) === 0){
      chunks.push(textPart);
      textPart = "";
    }

    textPart = textPart + text[i];
  }

  chunks.push(textPart);

  return chunks;
}

const TextTypeWritter = ({text, duration, onComplete} : { text: string, duration?: number, onComplete?: () => void }) => {
  const textScope = useRef(null);
  const textElements = splitInChunks({text, length: text.length});

  useGSAP(() => {
    const timeline = gsap.timeline({ defaults: { ease: "none" }});
    textElements.forEach((text, index) => {
      timeline.to(`.textElement-${index}`, {
        scrambleText: {
          text,
          chars: '01@#:/[]',
          tweenLength: false,
        },
        duration: duration ?? Math.min(0.6, Math.floor(text.length / 5) ),
        onComplete
      })
    })
  }, { scope: textScope });

  return <div ref={textScope}>
      {textElements.map((_, index) => <span key={index} className={`textElement-${index}`}/>)}
  </div>
}

export default function Home() {
  const [animationCounter, setAnimationCounter] = useState(0);
  const animations = [
    <InitialState setAnimationCounter={setAnimationCounter}/>,
    <AnimationInitialLoad setAnimationCounter={setAnimationCounter}/>,
    <PortfolioInfo />
  ];

  useEffect(() => {
    const url = new URL(location.href);
    const language = navigator.language;
    
    if(!url.searchParams.has("lng") || url.searchParams.get("lng") !== language){
      i18next.changeLanguage(language);
      url.searchParams.set("lng", language);
      location.href = url.toString(); // reload page with added flag
    }
  }, [])
  

  return <div className={styles.mainPage}>{animations[animationCounter]}</div>
}
