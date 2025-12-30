import { ObjectId } from "mongodb";
import { dbService } from "../../services/db.service.js";
import { logger } from "../../services/logger.service.js";
import { log } from "console";
import { utilService } from "../../services/util.service.js";
import { userService } from "../user/user.service.js";
import { toyService } from "../toy/toy.service.js"
export const reviewService = {
  query,
  getById,
  add,
};
async function query(filterBy = {}) {
  try {
    const collection = await dbService.getCollection("review");
    const criteria = _buildCriteria(filterBy);
    
    
    const reviews = await collection.aggregate([
      {$match:
        criteria
      },
      {
        $lookup: {
          localField: "userId",
          from: "user",
          foreignField: "_id",
          as: "byUser",
        },
      },
      {
       $unwind: '$byUser' 
      },
      {
        $lookup: {
          localField: "toyId",
          from: "toy",
          foreignField: "_id",
          as: "byToy",
        },
      },
      {
       $unwind: '$byToy' 
      }
    ]).toArray();
    return reviews;
  } catch (err) {
    logger.error("cannot find reviews ", err);
    throw err;
  }
}
async function getById(reviewId) {
  try {
    const collection = await dbService.getCollection("review");
    const review = await collection.findOne({
      _id: ObjectId.createFromHexString(reviewId),
    });
    return review;
  } catch (err) {
    logger.error("cannot find review by id: ", reviewId, err);
    throw err;
  }
}
async function add(review) {
  try {
    const collection = await dbService.getCollection("review");
    await collection.insertOne(review);
    const userId = review.userId.toString()
    const toyId = review.toyId.toString()
    const byUser = await userService.getById(userId)
    const byToy = await toyService.getById(toyId)
    const reviewToAdd = {
     ...review,
     byToy,
     byUser
    }
    console.log(reviewToAdd);
    
    return reviewToAdd
  } catch (err) {
    logger.error("cannot add a review ", err);
    throw err;
  }
}
function _buildCriteria(filterBy) {
  const criteria = {};
  const { toyId, userId } = filterBy;
  //if (name) criteria.name = { $regex: name, $options: "i" };
  if (toyId) criteria.toyId = new ObjectId(toyId)
  if (userId) criteria.userId = new ObjectId(userId)
  return criteria;
}
