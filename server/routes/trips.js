const express = require('express')
const router = express.Router()
const tripController = require('../controllers/tripController')
const authMiddleware = require('../middleware/auth')
const upload = require('../utils/upload')

router
  .route('/')
  .get(tripController.getAllTrips)
  .post(authMiddleware, upload.array('images', 5), tripController.createTrip)

router
  .route('/:id')
  .get(tripController.getTrip)
  .patch(authMiddleware, tripController.updateTrip)
  .delete(authMiddleware, tripController.deleteTrip)

module.exports = router