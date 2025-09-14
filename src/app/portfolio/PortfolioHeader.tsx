import { Col, Row } from "react-bootstrap";
import TextTypeWritter from "../component/TextTypeWritter";

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

export default PortfolioHeader;