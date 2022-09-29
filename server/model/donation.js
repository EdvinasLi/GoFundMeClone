import { DataTypes } from 'sequelize'

const Donation = (sequelize) => {
    const Schema = {
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        donator: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }

    return sequelize.define('donations', Schema)
}

export default Donation