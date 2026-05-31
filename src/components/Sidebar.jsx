import { Link, useLocation, useNavigate } from "react-router-dom"

export default function Sidebar() {

  const location = useLocation()
  const navigate = useNavigate()

  const role = localStorage.getItem("role")

  const logout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("userId")

    navigate("/")
  }

  const menu = role === "administration"
    ? [
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: "📊"
        },
        {
          name: "Students",
          path: "/students",
          icon: "🎓"
        },
        {
          name: "Classes",
          path: "/classes",
          icon: "🏫"
        },
        {
          name: "Subjects",
          path: "/subjects",
          icon: "📚"
        },
        {
          name: "Notes",
          path: "/notes",
          icon: "📝"
        },
        {
          name: "Timetable",
          path: "/timetable",
          icon: "📅"
        }
      ]
    : [
        {
          name: "Student Dashboard",
          path: "/student-dashboard",
          icon: "🎓"
        }
      ]

  return (

    <div className="sidebar">

      <h2 style={{ marginBottom: "30px" }}>
        🎓 Smart Academic
      </h2>

      {menu.map(item => (

        <Link
          key={item.path}
          to={item.path}
          className={`link ${
            location.pathname === item.path
              ? "active"
              : ""
          }`}
        >
          {item.icon} {item.name}
        </Link>

      ))}

      <button
        className="btn btn-delete"
        onClick={logout}
        style={{
          marginTop: "30px",
          width: "100%"
        }}
      >
        🚪 Logout
      </button>

    </div>
  )
}