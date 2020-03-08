export default (sequelize, DataTypes) => {
    return sequelize.define('Post', {
        title: {
            type: DataTypes.STRING,
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
        },

        author_id: {
            type: DataTypes.INTEGER,
            allowNull: false,

            references: {
                model: "Authors",
                key: 'id'
            }
        }
    },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['title', 'author_id']
                }
            ]
        }
    )
};
