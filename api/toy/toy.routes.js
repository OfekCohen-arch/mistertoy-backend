import express from 'express'
import { getToys,addToy,removeToy,updateToy,getToyById, addToyMsg } from './toy.controller.js'
import { requireAdmin,requireAuth } from '../../middlewares/requireAutjh.middleware.js'

export const toyRoutes = express.Router()

toyRoutes.get('/',getToys)
toyRoutes.get('/:id',getToyById)
toyRoutes.post('/',requireAdmin,addToy)
toyRoutes.put('/:id',requireAdmin,updateToy)
toyRoutes.delete('/:id',requireAdmin,removeToy)
toyRoutes.post('/:id/msg',requireAuth,addToyMsg)