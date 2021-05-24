const movies = function(sequelize, DataTypes) {
  const Movies = sequelize.define('movies', {
    movie_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    movie_title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    movie_episode: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    movie_director: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    movie_studio: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    movie_tv_status: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    movie_duration: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    movie_release: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    movie_country: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    movie_genre: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    movie_rating: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    movie_network: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    movie_trailer: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    movie_views: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    movie_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    movie_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    movie_image_path: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'movies',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "movies_pkey",
        unique: true,
        fields: [
          { name: "movie_id" },
        ]
      },
    ]
  });
  Movies.associate = (models) => {
      Movies.hasMany(models.Casts, { foreignKey: 'cast_movie_id', onDelete: 'CASCADE'});
      Movies.hasMany(models.Comments, { foreignKey: 'comment_movie_id', onDelete: 'CASCADE'});
      Movies.hasOne(models.Line_Items, { foreignKey: 'line_item_movie_id'});
  }
  return Movies
}

export default movies

