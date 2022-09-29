import { DataTypes } from 'sequelize'

const Donation = (sequelize) => {
    const Schema = {
        amount: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }

    return sequelize.define('donations', Schema)
}

export default Donation