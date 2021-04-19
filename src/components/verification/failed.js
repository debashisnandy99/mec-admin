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
import axios from "../../services/api"
import { url } from "../../services/details"
import { getUser, isLoggedIn, logout, handleLogin } from "../../services/auth"
import UserProfile from "./components/userprofile"
import * as PendingStyles from "./pending.module.css"

class FailedPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 1,
      isLoading: true,
      docs: [],
      totalNumber: 0,
      items: [],
      isEmpty: true,
      user: undefined,
    }
  }

  componentDidMount() {
    axios
      .get("/verifier/getlist?page=" + this.state.active, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${getUser().token}`,
          Docs: "fail",
        },
      })
      .then(res => {
        let items = []
        for (let number = 1; number <= res.data.doc.totalItems; number++) {
          items.push(
            <Pagination.Item key={number} active={number === this.state.active}>
              {number}
            </Pagination.Item>
          )
        }
        this.setState({
          isLoading: false,
          docs: [...res.data.doc.docs],
          items: [...items],
          totalNumber: res.data.doc.totalItems,
          isEmpty:  res.data.doc.totalItems == 0,
        })
      })
      .catch(e => {
        console.log(e.response.data)
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
                ) : this.state.docs.length == 0 ? (
                  <p className="text-center">No Data Found</p>
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
                          <td>Failed</td>
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
      </>
    )
  }
}

export default FailedPage
