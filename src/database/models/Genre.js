module.exports = (sequelize, DataTypes) => {
    let alias = "Genre";
    let cols  = {
        id: {type:DataTypes.BIGINT(10).UNSIGNED, 
            primaryKey: true, 
            allowNull: false,
            autoIncrement:true
            },

        name: { type: DataTypes.STRING(100),
                allowNull: false
            },

        ranking:{type: DataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },

        active: {type:DataTypes.BOOLEAN, 
            allowNull: false
        }

}
    let config = {
        timestamps: true,
        createdAt:  'created_at',
        updatedAt: 'updated_at',
        deletesAt: false
    }

    const Genre = sequelize.define(alias,cols,config);

    Genre.associate = function(models){
        Genre.hasMany(models.Movie,{
            as: "movies",
            foreignKey:'genre_id'
        });
}
    return Genre;
}