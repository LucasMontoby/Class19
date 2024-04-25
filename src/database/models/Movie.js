module.exports = (sequelize, DataTypes) => {
    let alias = "Movie";
    let cols  = {
        id: {type:DataTypes.BIGINT(10).UNSIGNED, 
            primaryKey: true, 
            allowNull: false,
            autoIncrement:true
            },

        title: { type: DataTypes.STRING(500),
                allowNull: false
            },

        rating:{type: DataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull: false
        },

        awards: {type:DataTypes.BIGINT(10).UNSIGNED, 
            allowNull: false
        },

        release_date:{type: DataTypes.DATEONLY,
            allowNull: false
        },

        length:  {type: DataTypes.BIGINT(10)},
        genre_id: {type: DataTypes.BIGINT(10)}

}
    let config = {
        timestamps: true,
        createdAt:  'created_at',
        updatedAt: 'updated_at',
        deletesAt: false
    }

    const Movie = sequelize.define(alias,cols,config);

    Movie.associate = function(models){
        Movie.belongsTo(models.Genre,{
            as: "genre",
            foreignKey:'genre_id'
        });
}
    return Movie;
}