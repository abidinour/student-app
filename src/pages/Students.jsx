import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/api"

export default function Students() {

  const [students, setStudents] = useState([])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")

  const [error, setError] = useState("")

  const [classId, setClassId] = useState("")
  const [classes, setClasses] = useState([])

  const navigate = useNavigate()

  /*
  =========================
  FETCH STUDENTS
  =========================
  */
  const fetchStudents = async () => {

    try {

      const res = await api.get("/students")

      setStudents(res.data)

    } catch (err) {

      setError("Error fetching students")
    }
  }

   /*
  =========================
  FETCH classes
  =========================
  */

  const fetchClasses = async () => {
  try {

    const res = await api.get("/classes")

    setClasses(res.data)

  } catch (err) {

    console.log(err)

  }
  }

  

  /*
  =========================
  ADD STUDENT
  =========================
  */
  const addStudent = async () => {

    if (!name || !email || !password) {
      return setError("All fields required")
    }

    try {

      await api.post("/students", {
        name,
        email,
        password,
        role,
        classId
      })

      setName("")
      setEmail("")
      setPassword("")
      setRole("student")
      setClassId("")

      fetchStudents()

    } catch (err) {

      setError(
        err.response?.data?.error ||
        "Error adding student"
      )
    }
  }

  /*
  =========================
  DELETE
  =========================
  */
  const deleteStudent = async (id) => {

    try {

      await api.delete(`/students/${id}`)

      fetchStudents()

    } catch (err) {

      setError("Error deleting student")
    }
  }

  /*
  =========================
  UPDATE
  =========================
  */
  const updateStudent = async (id) => {

    const newName = prompt("New name:")

    if (!newName) return

    try {

      await api.put(`/students/${id}`, {
        name: newName
      })

      fetchStudents()

    } catch (err) {

      setError("Error updating student")
    }
  }

  useEffect(() => {

    fetchStudents()
    fetchClasses()

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

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">
            Student
          </option>

          <option value="administration">
            Administration
          </option>
        </select>

        <select
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
        > 
          <option value="">
            Select Class
          </option>

          {classes.map((c) => (
          <option
            key={c.id}
            value={c.id}
          >
      {c.name}
    </option>
  ))}
</select>

        <button
          className="btn btn-add"
          onClick={addStudent}
        >
          Add
        </button>

      </div>

      {error && (
        <div className="alert">
          {error}
        </div>
      )}

      <div className="card">

        <table className="table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Class</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {students.map((s) => (

              <tr key={s.id}>

                <td>{s.name}</td>

                <td>{s.email}</td>

                <td>{s.role}</td>

                <td>{s.Class?.name || "-"}</td>

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