import { useRef } from "react";
import i18next from "../../intl/i18n";
import { useGSAP } from "@gsap/react";
import { Col, Row } from "react-bootstrap";
import styles from "./portfolio-styles.module.css";
import gsap from "gsap";

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

export default PortfolioLanguageInfo;