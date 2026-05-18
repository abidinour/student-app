import { useEffect, useState } from "react"
import api from "../api/api"

export default function Subjects() {
  const [subjects, setSubjects] = useState([])
  const [name, setName] = useState("")
  const [classId, setClassId] = useState("")

  const fetch = async () => {
    const res = await api.get("/subjects")
    setSubjects(res.data)
  }

  const add = async () => {
    await api.post("/subjects", { name, classId })
    setName("")
    fetch()
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div>
      <h2>📚 Subjects</h2>

      <input placeholder="Subject" onChange={e=>setName(e.target.value)} />
      <input placeholder="Class ID" onChange={e=>setClassId(e.target.value)} />
      <button onClick={add}>Add</button>

      <ul>
        {subjects.map(s => (
          <li key={s.id}>
            {s.name} - {s.Class?.name}
          </li>
        ))}
      </ul>
    </div>
  )
}