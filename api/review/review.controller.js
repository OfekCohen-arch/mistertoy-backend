import { reviewService } from "../review/review.service.js";
import { logger } from "../../services/logger.service.js";

export async function getReviews(req, res) {
  try {
    const reviews = await reviewService.query();
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
    const { loggedinUser } = req
    try {
     const {review} = req.body  
     const {toy} = req.body
     review.userId = loggedinUser._id
     review.toyId = toy._id 
    } catch (error) {
      logger.error("Failed to add review", err);
    res.status(500).send({ err: "Failed to add review" });  
    }
}
