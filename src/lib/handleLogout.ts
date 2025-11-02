import toast from "react-hot-toast"
import {type NavigateFunction } from "react-router-dom"


export default function handleLogout(navigate:NavigateFunction) {
    const toastId = toast.loading("Logging Out")
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    toast.remove(toastId)
    toast.success("Logged Out Successfully")
    navigate("/")

  }