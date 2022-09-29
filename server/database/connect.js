import { Sequelize } from 'sequelize'
import mysql from 'mysql2/promise'
import { Users, Stories, Donation } from '../model/index.js'

const database = {}
const credentials = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'goFundMe'
}

try {
    const connection = await mysql.createConnection({
        host: credentials.host,
        user: credentials.user,
        password: credentials.password
    })

    await connection.query('CREATE DATABASE IF NOT EXISTS ' + credentials.database)

    const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, { dialect: 'mysql' })

    database.Users = Users(sequelize)
    database.Stories = Stories(sequelize)
    database.Donation = Donation(sequelize)


    database.Stories.hasOne(database.Users)
    database.Users.belongsTo(database.Stories)
    database.Stories.hasMany(database.Donation)
    database.Donation.hasOne(database.Stories)
    database.Donation.belongsTo(database.Users)



    await sequelize.sync({ alter: true })
} catch (error) {
    console.log(error)
    console.log('Nepavyko prisijungti prie duomenų bazės');
}

export default database