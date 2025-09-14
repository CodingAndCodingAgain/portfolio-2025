import { Col, Row } from "react-bootstrap";
import i18next from "../../intl/i18n";
import TextTypeWritter from "../component/TextTypeWritter";

const intlDateFormatter = new Intl.DateTimeFormat(navigator.language, {year: "numeric", month: "numeric"});

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

export default PortfolioProfessionalContent;