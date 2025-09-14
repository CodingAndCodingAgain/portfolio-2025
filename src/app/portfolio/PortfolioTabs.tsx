import { useGSAP } from "@gsap/react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import PortfolioProfessionalContent from "./PortfolioProfessionalContent";
import PortfolioEducationInfo from "./PortfolioEducationInfo";
import PortfolioLanguageInfo from "./PortfolioLanguageInfo";
import PortfolioTechnicalSkillsInfo from "./PortfolioTechnicalSkillsInfo";
import i18next from "../../intl/i18n";
import styles from "./portfolio-styles.module.css"
import gsap from "gsap";

const PortfolioTabs = ({setInitialAnimationFinished} : { setInitialAnimationFinished: Dispatch<SetStateAction<boolean>>}) => {
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
    timeline.set(tabsSlide.current, {opacity: 0, onComplete: () => setInitialAnimationFinished(true)});

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

export default PortfolioTabs;