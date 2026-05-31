import { useEffect, useState } from "react"
import api from "../api/api"
import { useNavigate } from "react-router-dom"

export default function StudentDashboard() {

  const [student, setStudent] = useState(null)
  const [subjects, setSubjects] = useState([])
  const [schedules, setSchedules] = useState([])
  const [notes, setNotes] = useState([])
  const [average, setAverage] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {

    const loadData = async () => {

      try {

        const studentId =
          localStorage.getItem("userId")

        const res = await api.get(
          `/students/dashboard/${studentId}`
        )

        setStudent(res.data.student)
        setSubjects(res.data.subjects)
        setSchedules(res.data.schedules)

        const notesRes = await api.get(
          `/notes/student/${studentId}`
        )

        setNotes(notesRes.data)

        if (notesRes.data.length > 0) {

          let total = 0

          notesRes.data.forEach(note => {

            const finalNote =
              (note.ds + note.exam * 2) / 3

            total += finalNote

          })

          setAverage(
            (
              total /
              notesRes.data.length
            ).toFixed(2)
          )
        }

      } catch (err) {

        console.log(err)

      }
    }

    loadData()

  }, [])

  return (

    <div>

      <h1>🎓 Student Dashboard</h1>

      {/* STATISTICS */}

      <div
        className="stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "20px"
        }}
      >

        <div className="card">
          <h3>📚 Subjects</h3>
          <h2>{subjects.length}</h2>
        </div>

        <div className="card">
          <h3>📅 Sessions</h3>
          <h2>{schedules.length}</h2>
        </div>

        <div className="card">
          <h3>📈 Average</h3>

          <h2
            style={{
              color:
                Number(average) >= 10
                  ? "green"
                  : "red"
            }}
          >
            {average}
          </h2>
        </div>

      </div>

      {/* STUDENT INFO */}

      {student && (

        <div
          className="card"
          style={{ marginBottom: "20px" }}
        >

          <h2>👤 Student Information</h2>

          <p>
            <strong>Name:</strong> {student.name}
          </p>

          <p>
            <strong>Email:</strong> {student.email}
          </p>

          <p>
            <strong>Class:</strong> {student.Class?.name || "-"}
          </p>

          <p>
            <strong>Role:</strong> {student.role}
          </p>

        </div>

      )}

      {/* SUBJECTS */}

      <div className="card">

        <h2>📚 My Subjects</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(200px,1fr))",
            gap: "15px"
          }}
        >

          {subjects.length === 0 ? (

            <p>No subjects found</p>

          ) : (


            subjects.map((s) => (

              <div
                key={s.id}
                className="card"
              >
                📚 {s.name}
              </div>

            ))
          )}


        </div>

      </div>

      <div
        className="card"
        style={{ marginTop: "20px" }}
      >

        <h2>📝 My Notes</h2>

        <table className="table">

          <thead>

            <tr>
              <th>Subject</th>
              <th>DS</th>
              <th>Exam</th>
              <th>Average</th>
            </tr>

          </thead>

          <tbody>

            {notes.length === 0 ? (

              <tr>
                <td colSpan="4">
                  No notes found
                </td>
              </tr>

            ) : (

              notes.map((note) => (
                <tr key={note.id}>

                  <td>
                    {note.Subject?.name}
                  </td>

                  <td>{note.ds}</td>

                  <td>{note.exam}</td>

                  <td>
                    {(
                      (note.ds + note.exam * 2) / 3
                    ).toFixed(2)}
                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>

        <button
          className="btn btn-view"
          style={{
            marginTop: "15px"
          }}
          onClick={() =>
            navigate(
              `/bulletin/${localStorage.getItem("userId")}`
            )
          }
        >
          📄 My Bulletin
        </button>

      </div>



      {/* SCHEDULE */}

      <div
        className="card"
        style={{ marginTop: "20px" }}
      >

        <h2>📅 My Schedule</h2>

        <table className="table">

          <thead>

            <tr>
              <th>Day</th>
              <th>Start</th>
              <th>End</th>
              <th>Subject</th>
            </tr>

          </thead>

          <tbody>

            {schedules.length === 0 ? (

              <tr>
                <td colSpan="4">
                  No schedule found
                </td>
              </tr>

            ) : (

              schedules.map((sch) => (

                <tr key={sch.id}>

                  <td>{sch.day}</td>

                  <td>{sch.startTime}</td>

                  <td>{sch.endTime}</td>

                  <td>
                    {sch.Subject?.name}
                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}