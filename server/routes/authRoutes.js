import express from "express"
import {login, register, loginWithGoogle} from "../controllers/authController.js"

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/google-signin", loginWithGoogle)

export default router