import { DataTypes } from 'sequelize'

const Stories = (sequelize) => {
    const Schema = {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.STRING
        },
        reach_sum: {
            type: DataTypes.STRING
        },
        current_sum: {
            type: DataTypes.STRING
        },
        remains: {
            type: DataTypes.STRING
        },
        donatelog: {
            type: DataTypes.STRING
        },
    }

    return sequelize.define('stories', Schema)
}

export default Stories