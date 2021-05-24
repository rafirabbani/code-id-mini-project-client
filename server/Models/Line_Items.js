const line_items = function(sequelize, DataTypes) {
  const Line_Items = sequelize.define('line_items', {
    line_item_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    line_item_qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    line_item_status: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    line_item_movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'movies',
        key: 'movie_id'
      },
      unique: "line_items_line_item_movie_id_key"
    },
    line_item_cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'carts',
        key: 'cart_id'
      },
      unique: "line_items_line_item_cart_id_key"
    },
    line_item_order_name: {
      type: DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'line_items',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "line_items_line_item_cart_id_key",
        unique: true,
        fields: [
          { name: "line_item_cart_id" },
        ]
      },
      {
        name: "line_items_line_item_movie_id_key",
        unique: true,
        fields: [
          { name: "line_item_movie_id" },
        ]
      },
      {
        name: "line_items_pkey",
        unique: true,
        fields: [
          { name: "line_item_id" },
        ]
      },
    ]
  })
  Line_Items.associate = (models) => {
      Line_Items.belongsTo(models.Carts, { foreignKey: 'line_item_cart_id'});
      Line_Items.belongsTo(models.Movies, { foreignKey: 'line_item_movie_id'});
  }
  return Line_Items
}

export default line_items
