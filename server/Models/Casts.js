const casts = (sequelize, DataTypes) => {
  const Casts = sequelize.define('casts', {
    cast_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cast_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    cast_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cast_image_size: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cast_image_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cast_movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'movies',
        key: 'movie_id'
      }
    },
    cast_image_path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cast_birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    cast_gender: {
      type: DataTypes.STRING(7),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'casts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "casts_pkey",
        unique: true,
        fields: [
          { name: "cast_id" },
        ]
      },
    ]
  });
  Casts.associate = (models) => {
      Casts.belongsTo(models.Movies, { foreignKey: "cast_movie_id"})
  }
  return Casts
}

export default casts
