import { Op } from 'sequelize'

import Booking from '../../models/booking.js'
import User from '../../models/user.js'

export const post = async (req, res, next) => {
  const startDate = req.body.startDate
  const endDate = req.body.endDate
  const houseId = req.body.houseId

  const results = await Booking.findAll({
    where: {
      houseId: houseId,
      startDate: {
        [Op.lte]: new Date(endDate)
      },
      endDate: {
        [Op.gte]: new Date(startDate)
      }
    }
  })

  if (results.length > 0) {
    //busy
    res.writeHead(500, {
      'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({
      status: 'error',
      message: 'House is already booked'
    }))

    return
  }

  if (!req.session.passport) {
    res.writeHead(403, {
      'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({
      status: 'error',
      message: 'Unauthorized'
    }))

    return
  }
  const userEmail = req.session.passport.user
  User.findOne({ where: {email: userEmail}}).then(user => {

    Booking.create({
      houseId: houseId,
      userId: user.id,
      startDate: startDate,
      endDate: endDate
    })
    .then(() => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify({ status: 'success', message: 'ok' }))
    })

	})

}
