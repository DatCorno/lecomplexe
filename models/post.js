module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Post', {
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        draft: {
            type: DataTypes.BOOLEAN,
            unique: false,
            default: true
        }
    })
};
