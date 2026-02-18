import { toyService } from "./toy.service.js";
import { logger } from "../../services/logger.service.js";

export async function getToys(req, res) {
  try {
    const {name,inStock,'labels[]': labels,sortField} = req.query

    const filterBy = {
      name: name || "",
      inStock: inStock,
      labels: labels,
      sortField: sortField || ""
    }
    console.log(filterBy);
    
    const toys = await toyService.query(filterBy);
    res.json(toys);
  } catch (err) {
    logger.error("Failed to get toys", err);
    res.status(500).send({ err: "Failed to get toys" });
  }
}
export async function getToyById(req, res) {
    try {
        const toyId = req.params.id
        const toy = await toyService.getById(toyId)
        res.json(toy)
    } catch (err) {
        logger.error('Failed to get toy', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}

export async function addToy(req, res) {
    const { loggedinUser } = req

    try {
        const toy = req.body
        toy.owner = loggedinUser
        const addedToy = await toyService.add(toy)
        res.json(addedToy)
    } catch (err) {
        logger.error('Failed to add toy', err)
        res.status(500).send({ err: 'Failed to add toy' })
    }
}

export async function updateToy(req, res) {
    try {
        const toy = { ...req.body, _id: req.params.id }
        const updatedToy = await toyService.update(toy)
        res.json(updatedToy)
    } catch (err) {
        logger.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }
}

export async function removeToy(req, res) {
    try {
        const toyId = req.params.id
        const deletedCount = await toyService.remove(toyId)
        res.send(`${deletedCount} toys removed`)
    } catch (err) {
        logger.error('Failed to remove toy', err)
        res.status(500).send({ err: 'Failed to remove toy' })
    }
}
export async function addToyMsg(req,res){
    const { loggedinUser } = req

	try {
		const { id } = req.params
		const { txt } = req.body
		const { _id, fullname } = loggedinUser
		const msg = {
			txt,
			by: { _id, fullname },
		}
		const addedMsg = await toyService.addMsg(id, msg)
		res.send(addedMsg)
	} catch (error) {
		logger.error('Cannot add message to toy', error)
		res.status(500).send('Cannot add message to toy')
	}
}
