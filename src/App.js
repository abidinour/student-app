import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./layout/Layout"

import Dashboard from "./pages/Dashboard"
import Students from "./pages/Students"
import Classes from "./pages/Classes"
import Subjects from "./pages/Subjects"
import Timetable from "./pages/Timetable"
import Notes from "./pages/Notes"
import Bulletin from "./pages/Bulletin"
import Login from "./pages/Login"
import StudentDashboard from "./pages/StudentDashboard"

import AdminRoute from "./routes/AdminRoute"
import StudentRoute from "./routes/StudentRoute"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* LAYOUT */}
        <Route
          path="/"
          element={<Layout />}
        >

          {/* ADMIN ROUTES */}

          <Route
            path="dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />

          <Route
            path="students"
            element={
              <AdminRoute>
                <Students />
              </AdminRoute>
            }
          />

          <Route
            path="classes"
            element={
              <AdminRoute>
                <Classes />
              </AdminRoute>
            }
          />

          <Route
            path="subjects"
            element={
              <AdminRoute>
                <Subjects />
              </AdminRoute>
            }
          />

          <Route
            path="timetable"
            element={
              <AdminRoute>
                <Timetable />
              </AdminRoute>
            }
          />

          <Route
            path="notes"
            element={
              <AdminRoute>
                <Notes />
              </AdminRoute>
            }
          />

          {/* STUDENT ROUTE */}

          <Route
            path="student-dashboard"
            element={
              <StudentRoute>
                <StudentDashboard />
              </StudentRoute>
            }
          />

          {/* SHARED ROUTE */}

          <Route
            path="bulletin/:id"
            element={<Bulletin />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App