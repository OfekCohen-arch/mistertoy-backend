import express from 'express'
import { login, logout, signup } from './auth.controller.js'

export const authRoutes = express.Router()

authRoutes.post('/login', login)
authRoutes.post('/signup', signup)
authRoutes.post('/logout', logout)