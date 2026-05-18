import { useEffect, useState } from "react"
import api from "../api/api"

export default function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    classes: 0
  })

  const fetchStats = async () => {
    try {
      const res = await api.get("/stats")

      const studentsPerClass = res.data?.studentsPerClass || []

      const totalStudents = studentsPerClass
        .reduce((a, b) => a + (b.count || 0), 0)

      setStats({
        students: totalStudents,
        classes: studentsPerClass.length
      })

    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <div>
      <h2>📊 Dashboard</h2>

      <div style={{
        display: "flex",
        gap: "20px",
        marginTop: "20px"
      }}>
        <div className="card">
          <h4>🎓 Students</h4>
          <h1>{stats.students}</h1>
        </div>

        <div className="card">
          <h4>🏫 Classes</h4>
          <h1>{stats.classes}</h1>
        </div>
      </div>
    </div>
  )
}