import { useEffect, useState } from "react"
import api from "../api/api"

export default function Notes() {

  const [notes, setNotes] = useState([])
  const [students, setStudents] = useState([])
  const [subjects, setSubjects] = useState([])

  const [showModal, setShowModal] = useState(false)

  const [editingId, setEditingId] = useState(null)

  const [form, setForm] = useState({
    studentId: "",
    subjectId: "",
    ds: "",
    exam: ""
  })

  // ==========================
  // FETCH
  // ==========================
  const fetchData = async () => {

    const notesRes = await api.get("/notes")
    const studentsRes = await api.get("/students")
    const subjectsRes = await api.get("/subjects")

    setNotes(notesRes.data)
    setStudents(studentsRes.data)
    setSubjects(subjectsRes.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // ==========================
  // OPEN ADD
  // ==========================
  const openAdd = () => {

    setEditingId(null)

    setForm({
      studentId: "",
      subjectId: "",
      ds: "",
      exam: ""
    })

    setShowModal(true)
  }

  // ==========================
  // OPEN EDIT
  // ==========================
  const openEdit = (note) => {

    setEditingId(note.id)

    setForm({
      studentId: note.studentId,
      subjectId: note.subjectId,
      ds: note.ds,
      exam: note.exam
    })

    setShowModal(true)
  }

  // ==========================
  // SAVE
  // ==========================
  const saveNote = async () => {

    if (
      !form.studentId ||
      !form.subjectId ||
      !form.ds ||
      !form.exam
    ) {
      return
    }

    if (editingId) {

      await api.put(`/notes/${editingId}`, form)

    } else {

      await api.post("/notes", form)
    }

    setShowModal(false)

    fetchData()
  }

  // ==========================
  // DELETE
  // ==========================
  const deleteNote = async (id) => {

    if (!window.confirm("Delete note ?")) return

    await api.delete(`/notes/${id}`)

    fetchData()
  }

  return (
    <div>

      {/* HEADER */}
      <div className="page-header">

        <div>
          <h2>Notes Management</h2>
          <p>Manage students notes and averages</p>
        </div>

        <button
          className="btn btn-add"
          onClick={openAdd}
        >
          + Add Note
        </button>

      </div>

      {/* TABLE */}
      <div className="modern-card">

        <table className="modern-table">

          <thead>
            <tr>
              <th>Student</th>
              <th>Subject</th>
              <th>DS</th>
              <th>Exam</th>
              <th>Average</th>
              <th>Actions</th>
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
                    {note.Student?.name}
                  </td>

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

                  <td>

                    <button
                      className="btn btn-edit"
                      onClick={() => openEdit(note)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-delete"
                      onClick={() => deleteNote(note.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              )
            })}

          </tbody>

        </table>

      </div>

      {/* MODAL */}
      {showModal && (

        <div className="modal-overlay">

          <div className="modal-box">

            <h3>
              {editingId ? "Edit Note" : "Add Note"}
            </h3>

            <select
              value={form.studentId}
              onChange={(e) =>
                setForm({
                  ...form,
                  studentId: e.target.value
                })
              }
            >

              <option value="">
                Select Student
              </option>

              {students.map(student => (
                <option
                  key={student.id}
                  value={student.id}
                >
                  {student.name}
                </option>
              ))}

            </select>

            <select
              value={form.subjectId}
              onChange={(e) =>
                setForm({
                  ...form,
                  subjectId: e.target.value
                })
              }
            >

              <option value="">
                Select Subject
              </option>

              {subjects.map(subject => (
                <option
                  key={subject.id}
                  value={subject.id}
                >
                  {subject.name}
                </option>
              ))}

            </select>

            <input
              type="number"
              placeholder="DS"
              value={form.ds}
              onChange={(e) =>
                setForm({
                  ...form,
                  ds: e.target.value
                })
              }
            />

            <input
              type="number"
              placeholder="Exam"
              value={form.exam}
              onChange={(e) =>
                setForm({
                  ...form,
                  exam: e.target.value
                })
              }
            />

            <div className="modal-actions">

              <button
                className="btn btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-add"
                onClick={saveNote}
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}