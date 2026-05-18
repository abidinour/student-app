import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div className="container">
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Topbar />

        <div className="main">
          <Outlet />
        </div>
      </div>
    </div>
  )
}