import * as React from "react"
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  Pagination,
  Table,
} from "react-bootstrap"

import { url } from "../../../services/details"
import * as PendingStyles from "../pending.module.css"

const UserProfile = ({ value }) => {
  return (
    <Col sm={12} key={value._id}>
      <Card className="mb-4">
        <Card.Header>
          <Container>
            <Row>
              <Col md={4}>
                <Card.Img
                  variant="top"
                  height="250"
                  src={`${url()}/${value.user.photo}`}
                />
              </Col>
              <Col md={4}>
                <div className="mt-2">
                  <p className={PendingStyles.pTag}>{value.user.name}</p>
                  <p className={PendingStyles.pTag}>DOB : {value.user.dob}</p>
                  <p className={PendingStyles.pTag}>DOC ID : {value.docId}</p>
                  <Card style={{ width: "10rem" }} className="mt-4">
                    <Card.Img
                      variant="top"
                      width="300"
                      height="90"
                      src={`${url()}/${value.user.signature}`}
                    />
                    <Card.Title className="h6 mt-1 mx-auto">
                      Signature
                    </Card.Title>
                  </Card>
                </div>
              </Col>
              <Col md={4}>
                <Card.Img
                  variant="top"
                  height="250"
                  src={`${url()}/${value.file}`}
                />
              </Col>
            </Row>
          </Container>
        </Card.Header>
        <Card.Body>
          <Card.Title>Details</Card.Title>
          <Container>
            <Row>
              <Col md={6}>
                <div className="mt-3">
                  <Row>
                    <Col md={6}>
                      <span className={PendingStyles.spanTagHeader}>
                        Fathers Name :
                      </span>
                    </Col>
                    <Col md="auto">
                      <span>{value.user.fathersName}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <span className={PendingStyles.spanTagHeader}>
                        Mothers Name :
                      </span>
                    </Col>
                    <Col md="auto">
                      <span>{value.user.mothersName}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <span className={PendingStyles.spanTagHeader}>
                        Address :
                      </span>
                    </Col>
                    <Col md="auto">
                      <span>{value.user.address}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <span className={PendingStyles.spanTagHeader}>
                        Phone :{" "}
                      </span>
                    </Col>
                    <Col md="auto">
                      <span>+91 {value.user.phone}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <span className={PendingStyles.spanTagHeader}>
                        Email :{" "}
                      </span>
                    </Col>
                    <Col md="auto">
                      <span>{value.user.email ? value.user.email : ""}</span>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col md={{ span: 3, offset: 3 }}>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    this.setState({
                      uid: value.user._id,
                      modalShow: true,
                    })
                  }}
                  block
                >
                  Verify
                </Button>
                <Button variant="danger" size="lg" block>
                  Fail
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default UserProfile
