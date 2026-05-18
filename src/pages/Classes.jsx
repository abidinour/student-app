import { useEffect, useState } from "react"
import api from "../api/api"

export default function Classes() {
  const [classes, setClasses] = useState([])
  const [name, setName] = useState("")
  const [selectedStudents, setSelectedStudents] = useState([])
  const [show, setShow] = useState(false)

  const fetchClasses = async () => {
    const res = await api.get("/classes")
    setClasses(res.data)
  }

  const addClass = async () => {
    if (!name.trim()) return
    await api.post("/classes", { name })
    setName("")
    fetchClasses()
  }

  /*
  ==========================
  SHOW STUDENTS OF CLASS
  ==========================
  */
  const showStudents = async (classId) => {
    const res = await api.get(`/classes/${classId}/students`)
    setSelectedStudents(res.data)
    setShow(true)
  }

  useEffect(() => {
    fetchClasses()
  }, [])

  return (
    <div>
      <h2>🏫 Classes</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Class name"
        />

        <button className="btn btn-add" onClick={addClass}>
          Add
        </button>
      </div>

      <div className="card">
        <ul>
          {classes.map((c) => (
            <li key={c.id} style={{ marginBottom: "10px" }}>
              {c.name}

              <button
                className="btn btn-view"
                style={{ marginLeft: "10px" }}
                onClick={() => showStudents(c.id)}
              >
                View Students
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* STUDENTS LIST */}
      {show && (
        <div className="card" style={{ marginTop: "20px" }}>
          <h3>🎓 Students in Class</h3>

          {selectedStudents.length === 0 ? (
            <p>No students</p>
          ) : (
            <ul>
              {selectedStudents.map((s) => (
                <li key={s.id}>{s.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}