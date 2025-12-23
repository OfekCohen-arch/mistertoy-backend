import { ObjectId } from "mongodb";
import { dbService } from "../../services/db.service.js";
import { logger } from "../../services/logger.service.js";
import { log } from "console";

export const toyService = {
    query,
    getById,
    remove,
    add,
    update
}
async function query(filterBy={}) {
	const {name,inStock,labels} = filterBy
try{
  const criteria = {}

if(name) criteria.name = {$regex: name, $options: 'i'}
if(inStock!=='') criteria.inStock = (inStock === 'true')
if(labels.length>0) criteria.labels = { $in: labels}
console.log(criteria);

const sort = (filterBy.sort)?{
    [filterBy.sort]: 1
}: {}

const collection = await dbService.getCollection('toy')
var toys = await collection.find(criteria).sort(sort).toArray()


return toys
}
catch(err){
 logger.error('cannot find toys', err)
		throw err   
}    
}

async function getById(toyId) {
	try {
		const collection = await dbService.getCollection('toy')
		const toy = await collection.findOne({ _id: ObjectId.createFromHexString(toyId) })
		return toy
	} catch (err) {
		logger.error(`while finding toy ${toyId}`, err)
		throw err
	}
}
async function remove(toyId) {
	try {
		const collection = await dbService.getCollection('toy')
		const { deletedCount } = await collection.deleteOne({ _id: ObjectId.createFromHexString(toyId) })
        return deletedCount
	} catch (err) {
		logger.error(`cannot remove toy ${toyId}`, err)
		throw err
	}
}

async function add(toy) {
	try {
		const collection = await dbService.getCollection('toy')
		await collection.insertOne(toy)
		return toy
	} catch (err) {
		logger.error('cannot insert toy', err)
		throw err
	}
}

async function update(toy) {
	try {
		const toyToSave = {
			name: toy.name,
			price: toy.price,
			inStock: toy.inStock,
			labels: toy.labels
		}
		const collection = await dbService.getCollection('toy')
		await collection.updateOne({ _id: ObjectId.createFromHexString(toy._id) }, { $set: toyToSave })
		return toy
	} catch (err) {
		logger.error(`cannot update toy ${toy._id}`, err)
		throw err
	}
}


