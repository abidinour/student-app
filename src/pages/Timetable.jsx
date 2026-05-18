import { useEffect, useState } from "react"
import api from "../api/api"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

const times = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00"
]

// 🎨 COLORS
const subjectColors = {
  Math: "#3b82f6",
  Physics: "#ef4444",
  English: "#10b981",
  Default: "#6366f1"
}

export default function Timetable() {
  const [data, setData] = useState([])

  // 🔥 MODAL
  const [showModal, setShowModal] = useState(false)
  const [selectedCell, setSelectedCell] = useState(null)

  const [form, setForm] = useState({
    day: "",
    startTime: "",
    endTime: "",
    classId: "",
    subjectId: ""
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await api.get("/schedule")
    setData(res.data)
  }

  // 🔍 GET CELL
  const getCell = (day, time) => {
    const item = data.find(
      d => d.day === day && d.startTime === time
    )

    if (!item) return null

    return (
      <div
        className="cell-content"
        style={{
          background:
            subjectColors[item.Subject?.name] || subjectColors.Default
        }}
      >
        <span>{item.Subject?.name}</span>
        <small>{item.Class?.name}</small>
      </div>
    )
  }

  // ============================
  // CRUD
  // ============================

  const handleAdd = async () => {
    await api.post("/schedule", form)
    fetchData()
    setShowModal(false)
  }

  const handleUpdate = async () => {
    const item = data.find(
      d =>
        d.day === form.day &&
        d.startTime === form.startTime
    )

    if (!item) return

    await api.put(`/schedule/${item.id}`, form)
    fetchData()
    setShowModal(false)
  }

  const handleDelete = async () => {
    const item = data.find(
      d =>
        d.day === form.day &&
        d.startTime === form.startTime
    )

    if (!item) return

    await api.delete(`/schedule/${item.id}`)
    fetchData()
    setShowModal(false)
  }

  return (
    <div>
      <h2>📅 Class Schedule</h2>

      <div className="timetable">
        {/* HEADER */}
        <div className="row header">
          <div className="cell time">Time</div>
          {days.map(d => (
            <div key={d} className="cell day">{d}</div>
          ))}
        </div>

        {/* BODY */}
        {times.map(time => (
          <div className="row" key={time}>
            <div className="cell time">{time}</div>

            {days.map(day => (
              <div
                key={day}
                className="cell slot"
                onClick={() => {
                  setSelectedCell({ day, time })
                  setForm({
                    day,
                    startTime: time,
                    endTime: "",
                    classId: "",
                    subjectId: ""
                  })
                  setShowModal(true)
                }}
              >
                {getCell(day, time) || "—"}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Manage Schedule</h3>

            <input
              placeholder="End Time (ex: 10:00)"
              onChange={(e) =>
                setForm({ ...form, endTime: e.target.value })
              }
            />

            <input
              placeholder="Class ID"
              onChange={(e) =>
                setForm({ ...form, classId: e.target.value })
              }
            />

            <input
              placeholder="Subject ID"
              onChange={(e) =>
                setForm({ ...form, subjectId: e.target.value })
              }
            />

            <div className="modal-actions">
              <button className="btn btn-add" onClick={handleAdd}>
                Add
              </button>

              <button className="btn btn-edit" onClick={handleUpdate}>
                Update
              </button>

              <button className="btn btn-delete" onClick={handleDelete}>
                Delete
              </button>

              <button onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}