const users = (sequelize, DataTypes) => {
  const Users =  sequelize.define('users', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "users_user_email_key"
    },
    user_password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_salt: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    user_gender: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    user_avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_avatar_path: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_type: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "users_user_email_key",
        unique: true,
        fields: [
          { name: "user_email" },
        ]
      },
    ]
  });
  Users.associate = (models) => {
      Users.hasMany(models.Carts, { foreignKey: 'cart_user_id', onDelete: 'CASCADE'});
      Users.hasMany(models.Comments, { foreignKey: 'comment_user_id', onDelete: 'CASCADE'});
      Users.hasMany(models.Orders, { foreignKey: 'order_user_id', onDelete: 'CASCADE'});
  }
  return Users
}

export default users
