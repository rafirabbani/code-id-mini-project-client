const comments = function(sequelize, DataTypes) {
  const Comments = sequelize.define('comments', {
    comment_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: true
    },
    comment_created_on: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    comment_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    comment_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    comment_movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'movies',
        key: 'movie_id'
      }
    }
  }, {
    sequelize,
    tableName: 'comments',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "comments_pkey",
        unique: true,
        fields: [
          { name: "comment_id" },
        ]
      },
    ]
  })
  Comments.associate = (models) => {
      Comments.belongsTo(models.Users, { foreignKey: 'comment_user_id'});
      Comments.belongsTo(models.Movies, { foreignKey: 'comment_movie_id'});
  }
  return Comments
}

export default comments
