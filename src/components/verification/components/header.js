import * as React from "react"
import { Nav } from "react-bootstrap"

const HeaderPage = () => {
  return (
    <div>
      <h2 className="pl-5 pt-4">MEC ADMIN</h2>
      <ul className="nav nav-tabs nav-fill">
        <li className="nav-item">
          <a className="nav-link active" href="#">
            Active
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li>
      </ul>
    </div>
  )
}

export default HeaderPage
