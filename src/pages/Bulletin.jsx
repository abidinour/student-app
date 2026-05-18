import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../api/api"

export default function Bulletin() {

  const { id } = useParams()

  const [notes, setNotes] = useState([])
  const [student, setStudent] = useState(null)

  // ==========================
  // FETCH
  // ==========================
  const fetchData = async () => {

    const studentsRes = await api.get("/students")
    const notesRes = await api.get("/notes")

    const selectedStudent =
      studentsRes.data.find(s => s.id == id)

    setStudent(selectedStudent)

    const filtered =
      notesRes.data.filter(
        n => n.studentId == id
      )

    setNotes(filtered)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // ==========================
  // GENERAL AVERAGE
  // ==========================
  const averages =
    notes.map(note =>
      (
        Number(note.ds) +
        Number(note.exam)
      ) / 2
    )

  const generalAverage =
    averages.length > 0
      ? (
          averages.reduce((a,b)=>a+b,0)
          / averages.length
        ).toFixed(2)
      : 0

  return (
    <div>

      {/* HEADER */}
      <div className="bulletin-header">

        <div>
          <h2>Student Bulletin</h2>

          <p>
            {student?.name}
          </p>
        </div>

        <div className="bulletin-average">

          <h3>{generalAverage}</h3>

          <span>
            {generalAverage >= 10
              ? "Admitted"
              : "Failed"}
          </span>

        </div>

      </div>

      {/* TABLE */}
      <div className="modern-card">

        <table className="modern-table">

          <thead>
            <tr>
              <th>Subject</th>
              <th>DS</th>
              <th>Exam</th>
              <th>Average</th>
            </tr>
          </thead>

          <tbody>

            {notes.map(note => {

              const average =
                (
                  Number(note.ds) +
                  Number(note.exam)
                ) / 2

              return (
                <tr key={note.id}>

                  <td>
                    {note.Subject?.name}
                  </td>

                  <td>{note.ds}</td>

                  <td>{note.exam}</td>

                  <td>
                    <span className="badge">
                      {average.toFixed(2)}
                    </span>
                  </td>

                </tr>
              )
            })}

          </tbody>

        </table>

      </div>

    </div>
  )
}