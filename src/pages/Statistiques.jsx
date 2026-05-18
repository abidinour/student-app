import { useEffect, useState } from "react"
import axios from "axios"

export default function Statistics() {
  const [stats, setStats] = useState({})

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const res = await axios.get("http://localhost:3307/logs")
    setStats(res.data)
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2>📊 Attack Statistics</h2>

      <ul>
        {Object.keys(stats).map((key) => (
          <li key={key}>
            {key}: {stats[key]}
          </li>
        ))}
      </ul>
    </div>
  )
}