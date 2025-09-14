/* eslint-disable react/jsx-key */
'use client'

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from "./page.module.css";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { RoughEase, ScrambleTextPlugin, InertiaPlugin, Draggable } from "gsap/all";
import { Container } from "react-bootstrap";
import i18next from "../intl/i18n";
import PortfolioHeader from "./portfolio/PortfolioHeader";
import PortfolioTabs from "./portfolio/PortfolioTabs";

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

const PortfolioInfo = ({}) => {
  const [portfolioLoaded, setPortfolioLoaded] = useState(false);

  return <Container className={`${styles.portfolio} d-flex flex-column`} >
    <PortfolioHeader onComplete={() => setPortfolioLoaded(true)}/>
    { portfolioLoaded && <PortfolioTabs /> }
  </Container>
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
