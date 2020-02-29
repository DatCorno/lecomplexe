module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Author', {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },

        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        picture: {
            type: DataTypes.TEXT,
        },

        email: {
            type: DataTypes.STRING
        }

    })

};
