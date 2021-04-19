import React, { useState } from "react"
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  Pagination,
  Table,
} from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Header from "./components/header"
import Loading from "./components/loading"
import NoDataFound from "./components/nodatafound"
import SubmitModal from "./components/submitmodal"
import UserProfile from "./components/userprofile"
import axios from "../../services/api"
import { getUser, isLoggedIn, logout, handleLogin } from "../../services/auth"

class PendingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 1,
      isLoading: true,
      docs: [],
      totalNumber: 0,
      items: [],
      isEmpty: true,
      modalShow: false,
      uid: "",
      errorMessage: "",
      user: undefined,
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    axios
      .get("/verifier/getlist?page=" + this.state.active, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${getUser().token}`,
          Docs: "pending",
        },
      })
      .then(res => {
        let items = []
        for (
          let number = 1;
          number <= Math.ceil(res.data.doc.totalItems / 2);
          number++
        ) {
          items.push(
            <Pagination.Item
              key={number}
              onClick={() => {
                if (number !== this.state.active) {
                  this.getData()
                }
              }}
              active={number === this.state.active}
            >
              {number}
            </Pagination.Item>
          )
        }
        this.setState({
          isLoading: false,
          docs: [...res.data.doc.docs],
          items: [...items],
          totalNumber: Math.ceil(res.data.doc.totalItems / 2),
          isEmpty: false,
          user: undefined,
        })
      })
      .catch(e => {
        if (e.response.data.message === "jwt expired") {
          logout()
        }
      })
  }

  verifyUserDocsForm = event => {
    let target = event.target
    let form_data = new FormData()
    form_data.append("uid", this.state.uid)
    form_data.append("status", "verified")
    form_data.append("image", target.image.files[0])
    axios
      .post("/verifier/verifydocs", form_data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${getUser().token}`,
        },
      })
      .then(res => {
        this.getData()
        this.setState({ errorMessage: "", uid: "", modalShow: false })
      })
      .catch(e => {
        this.setState({ errorMessage: e.response.data.message })
        if (e.response.data.message === "jwt expired") {
          logout()
        }
      })
  }

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <Loading />
        ) : this.state.isEmpty ? (
          <NoDataFound />
        ) : (
          <Container>
            {this.state.user ? (
              <Row className="mb-3">
                <Col>
                  <Card>
                    <Card.Body>
                      <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="pointerCursor"
                        style={{
                          height: "20px",
                          width: "20px",
                        }}
                        onClick={() => {
                          this.getData()
                        }}
                      />
                      
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ) : (
              <></>
            )}
            <Row>
              <Col>
                {this.state.user ? (
                  <UserProfile value={this.state.user}></UserProfile>
                ) : (
                  <Table responsive className="bg-white pointerCursor">
                    <thead>
                      <tr>
                        <th>#</th>
                        {["Name", "Adhaar Number", "Status"].map(
                          (value, index) => (
                            <th key={index}>{value}</th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.docs.map((value, index) => (
                        <tr
                          key={index}
                          onClick={() => {
                            this.setState({
                              user: value,
                            })
                          }}
                        >
                          <td>{index}</td>
                          <td>{value.user.name}</td>
                          <td>{value.docId}</td>
                          <td>Pending</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Col>
              {/* {this.state.docs.map(value => (
                
              ))} */}
            </Row>
            <Row>
              <Col sm={12} className="text-right">
                <Pagination>{this.state.items}</Pagination>
              </Col>
            </Row>
          </Container>
        )}
        <SubmitModal
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          errorMessage={this.state.errorMessage}
          verifyUserDocsForm={e => this.verifyUserDocsForm(e)}
        />
      </>
    )
  }
}

export default PendingPage

