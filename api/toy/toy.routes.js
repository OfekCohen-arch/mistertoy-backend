import express from 'express'
import { getToys,addToy,removeToy,updateToy,getToyById } from './toy.controller.js'

export const toyRoutes = express.Router()

toyRoutes.get('/',getToys)
toyRoutes.get('/:id',getToyById)
toyRoutes.post('/',addToy)
toyRoutes.put('/:id',updateToy)
toyRoutes.delete('/:id',removeToy)