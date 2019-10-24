import { Op } from 'sequelize'

import Booking from '../../models/booking.js'
import User from '../../models/user.js'
import House from '../../models/house.js'

export async function get(req, res, next) {
  if (!req.session.passport || !req.session.passport.user) {
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
  const user = await User.findOne({ where: { email: userEmail }})

  Booking.findAndCountAll({
    where: {
      paid: true,
      userId: user.id,
      endDate: {
        [Op.gte]: new Date(),
      }
    },
    order: [
      ['startDate', 'ASC']
    ]
  })
  .then(async result => {
    const bookings = await Promise.all(result.rows.map(async booking => {
      const data = {}
      data.booking = booking.dataValues
      data.house = (await House.findByPk(data.booking.houseId)).dataValues
      return data
    }))

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.end(JSON.stringify(bookings))
  })

}
