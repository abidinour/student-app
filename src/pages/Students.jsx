import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/api"

export default function Students() {
  const [students, setStudents] = useState([])
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students")
      setStudents(res.data)
    } catch (err) {
      setError("Error fetching students")
    }
  }

  const addStudent = async () => {
    if (!name.trim()) return

    try {
      await api.post("/students", { name })
      setName("")
      fetchStudents()
    } catch (err) {
      setError(err.response?.data?.error || "Error adding student")
    }
  }

  const deleteStudent = async (id) => {
    try {
      await api.delete(`/students/${id}`)
      fetchStudents()
    } catch (err) {
      setError("Error deleting student")
    }
  }

  const updateStudent = async (id) => {
    const newName = prompt("New name:")
    if (!newName) return

    try {
      await api.put(`/students/${id}`, { name: newName })
      fetchStudents()
    } catch (err) {
      setError("Error updating student")
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  return (
    <div>
      <h2>🎓 Students Management</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Student name"
        />

        <button className="btn btn-add" onClick={addStudent}>
          Add
        </button>
      </div>

      {error && <div className="alert">{error}</div>}

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.Class?.name || "—"}</td>

                <td>
                  <button
                    className="btn btn-edit"
                    onClick={() => updateStudent(s.id)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-delete"
                    onClick={() => deleteStudent(s.id)}
                  >
                    Delete
                  </button>

                  <button
                    className="btn btn-view"
                    onClick={() => navigate(`/bulletin/${s.id}`)}
                  >
                    Bulletin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}