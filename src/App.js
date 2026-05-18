import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"

import Dashboard from "./pages/Dashboard"
import Students from "./pages/Students"
import Classes from "./pages/Classes"

// 🆕 NEW PAGES
import Subjects from "./pages/Subjects"
import Timetable from "./pages/Timetable"
import Notes from "./pages/Notes"
import Bulletin from "./pages/Bulletin"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          {/* MAIN */}
          <Route index element={<Dashboard />} />

          {/* EXISTING */}
          <Route path="students" element={<Students />} />
          <Route path="classes" element={<Classes />} />

          {/* 🆕 NEW */}
          <Route path="subjects" element={<Subjects />} />

          <Route path="timetable" element={<Timetable />} />

          <Route path="notes" element={<Notes />} />
          <Route path="bulletin/:id"element={<Bulletin />}/>

          

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App