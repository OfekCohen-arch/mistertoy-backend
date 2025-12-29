import express from 'express'
import {getReviews,getReviewById,addReview}  from '../review/review.controller.js'
import { requireAdmin,requireAuth } from '../../middlewares/requireAutjh.middleware.js'

export const reviewsRoutes = express.Router()

reviewsRoutes.get('/',getReviews)
reviewsRoutes.get('/:id',getReviewById)
reviewsRoutes.post('/',requireAuth,addReview)

