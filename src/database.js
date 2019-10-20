export const user = 'flaviocopes'
export const password = ''
export const host = 'localhost'
export const database = 'airbnbclone'

import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(database ,user, password, {
  host,
  dialect: 'postgres',
  logging: false
})
