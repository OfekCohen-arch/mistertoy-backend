import express from 'express'

import {
  requireAdmin,
  requireAuth,
} from '../../middlewares/requireAutjh.middleware.js'
import { deleteUser, getUser, getUsers, updateUser } from './user.controller.js'

export const userRoutes = express.Router()

// middleware that is specific to this router
// userRoutes.use(requireAuth)

userRoutes.get('/', getUsers)
userRoutes.get('/:userId', getUser)
userRoutes.put('/:userId', updateUser)

// userRoutes.put('/:userId',  requireAuth, updateUser)
userRoutes.delete('/:userId', requireAuth, requireAdmin, deleteUser)