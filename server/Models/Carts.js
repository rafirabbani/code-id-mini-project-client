const carts = (sequelize, DataTypes) => {
  const Carts = sequelize.define('carts', {
    cart_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cart_created_on: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_DATE')
    },
    cart_status: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    cart_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'carts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "carts_pkey",
        unique: true,
        fields: [
          { name: "cart_id" },
        ]
      },
    ]
  })
  Carts.associate = (models) => {
      Carts.belongsTo(models.Users, { foreignKey: 'cart_user_id'})
      Carts.hasMany(models.Line_Items, { foreignKey: 'line_item_cart_id', onDelete: 'CASCADE' })
  }
  return Carts
}

export default carts
