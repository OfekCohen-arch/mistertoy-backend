import { reviewService } from "../review/review.service.js";
import { logger } from "../../services/logger.service.js";
import { ObjectId } from "mongodb";

export async function getReviews(req, res) {
  try {
    const {name,toyId,userId} = req.query
    const filterBy = {
      name: name || '',
      toyId: toyId || '',
      userId: userId || ''
    }
    const reviews = await reviewService.query(filterBy);
    res.json(reviews);
  } catch (err) {
    logger.error("cannot get reviews");
    res.status(500).send({ err: "Failed to get reviews" });
    throw err;
  }
}

export async function getReviewById(req, res) {
  try {
    const reviewId = req.params.id;
    const review = await reviewService.getById(reviewId);
    res.json(review);
  } catch (err) {
    logger.error("Failed to get review", err);
    res.status(500).send({ err: "Failed to get review" });
  }
}

export async function addReview(req, res) {
    try {
     const review = req.body 
     review.toyId = new ObjectId(review.toyId) 
     review.userId = new ObjectId(review.userId)
     const addedReview = await reviewService.add(review) 
     res.json(addedReview)
    } catch (error) {
      logger.error("Failed to add review", err);
    res.status(500).send({ err: "Failed to add review" });  
    }
}
