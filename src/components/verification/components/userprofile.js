import * as React from "react"
import { Container, Button, Row, Col, Card, Modal } from "react-bootstrap"
import * as FileSaver from "file-saver"
import { url } from "../../../services/details"
import * as PendingStyles from "../pending.module.css"

const UserProfile = ({ value, showVerifyDialog, failUserDocs }) => {
  const [modalShow, setModalShow] = React.useState({ show: false, url: "" })

  return (
    <>
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
                    onClick={() =>
                      setModalShow({
                        show: true,
                        url: `${url()}/${value.user.photo}`,
                      })
                    }
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
                        onClick={() =>
                          setModalShow({
                            show: true,
                            url: `${url()}/${value.user.signature}`,
                          })
                        }
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
                    onClick={() =>
                      setModalShow({
                        show: true,
                        url: `${url()}/${value.file}`,
                      })
                    }
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
                  {value.status === "pending" ? (
                    <>
                      <Button
                        variant="primary"
                        size="lg"
                        disabled={value.mecId ? false : true}
                        onClick={() => {
                          showVerifyDialog(value)
                        }}
                        block
                      >
                        Verify
                      </Button>
                      <Button onClick={()=> {
                        failUserDocs(value.user._id)
                      }} variant="danger" size="lg" block>
                        Fail
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </Col>
      <ModalForImageShow
        modalData={modalShow}
        onHide={() => setModalShow({ show: false, url: "" })}
      />
    </>
  )
}

function ModalForImageShow({ modalData, onHide }) {
  const downloadFile = () => {
    FileSaver.saveAs(modalData.url, "image.jpg")
    onHide()
  }
  return (
    <Modal
      show={modalData.show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Row className="d-flex justify-content-center">
          {" "}
          <img
            style={{
              height: "100%",
              width: "80%",
              borderRadius: "8px",
            }}
            src={modalData.url}
            alt="profile"
          ></img>
        </Row>
        <Row className="d-flex mt-2 justify-content-center">
          <Button size="sm" variant="success" onClick={downloadFile}>
            Download
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="ml-2"
            onClick={onHide}
          >
            Close
          </Button>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default UserProfile
