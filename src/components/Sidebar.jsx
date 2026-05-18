import { Link, useLocation } from "react-router-dom"

export default function Sidebar() {
  const location = useLocation()

  const menu = [
    { name: "Dashboard", path: "/", icon: "📊" },
    { name: "Students", path: "/students", icon: "🎓" },
    { name: "Classes", path: "/classes", icon: "🏫" },
    { name: "Subjects", path: "/subjects", icon: "📚" },

    // ✅ Notes
    { name: "Notes", path: "/notes", icon: "📝" },

    { name: "Timetable", path: "/timetable", icon: "📅" }
  ]

  return (
    <div className="sidebar">
      <h2 style={{ marginBottom: "30px" }}>⚡ SaaS Admin</h2>

      {menu.map(item => (
        <Link
          key={item.path}
          to={item.path}
          className={`link ${
            location.pathname === item.path ? "active" : ""
          }`}
        >
          {item.icon} {item.name}
        </Link>
      ))}
    </div>
  )
}