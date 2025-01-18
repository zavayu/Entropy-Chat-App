import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import { Navigate, Routes, Route } from "react-router-dom"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import {Toaster} from "react-hot-toast"
import ContactsPage from "./pages/ContactsPage"
import useLocalStorage from "use-local-storage"

const App = () => {
  const {authUser, checkAuth} = useAuthStore();
  const [isDark, setIsDark] = useLocalStorage("isDark", false);

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  return (
    <div data-theme={isDark ? "dark" : "light"}>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/"/>} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/"/>} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login"/>} />
        <Route path="/contacts" element={authUser ? <ContactsPage /> : <Navigate to="/login"/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App