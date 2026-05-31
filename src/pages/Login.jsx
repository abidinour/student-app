import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/api"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleLogin = async () => {

    try {

      const res = await api.post("/login", {
        email,
        password
      })

      localStorage.setItem(
        "token",
        res.data.token
      )

      localStorage.setItem(
        "role",
        res.data.role
      )

      localStorage.setItem(
        "userId",
        res.data.user.id
      )

      /*
      =========================
      ROLE REDIRECT
      =========================
      */

      if (res.data.role === "administration") {

        navigate("/dashboard")

      } else {

        navigate("/student-dashboard")
      }

    } catch (err) {

      setError(
        err.response?.data?.error ||
        "Login error"
      )
    }
  }

  return (

  <div className="login-page">

    <div className="login-card">

      <h1>🎓 Smart Academic</h1>

      <p>
        Academic Management Platform
      </p>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        onClick={handleLogin}
      >
        Login
      </button>

      {error && (
        <p className="error">
          {error}
        </p>
      )}

    </div>

  </div>

)
}