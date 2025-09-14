import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import i18next from "../../intl/i18n";
import styles from "./portfolio-styles.module.css"
import { Draggable } from "gsap/all";

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

export default PortfolioTechnicalSkillsInfo;