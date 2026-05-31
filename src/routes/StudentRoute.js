import { Navigate } from "react-router-dom"

export default function StudentRoute({
  children
}) {

  const role =
    localStorage.getItem("role")

  if (role !== "student") {

    return <Navigate to="/" />
  }

  return children
}