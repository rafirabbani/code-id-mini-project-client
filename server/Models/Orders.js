const orders = (sequelize, DataTypes) => {
  const Orders = sequelize.define('orders', {
    order_name: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue:  sequelize.fn('concat', 'ORD', sequelize.fn('to_char', sequelize.literal('now()'), 'yyyymmdd-'), sequelize.fn('lpad', sequelize.fn('concat', sequelize.literal("nextval('orders_order_name_seq')")), 4, '0')),
      primaryKey: true
    },
    order_created_on: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(0)')
    },
    order_subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    order_discount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    order_tax: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    order_total_due: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    order_total_qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order_pay_trx_num: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    order_city: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    order_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    order_status: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    order_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'orders',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "orders_pkey",
        unique: true,
        fields: [
          { name: "order_name" },
        ]
      },
    ]
  })
  Orders.associate = (models) => {
      Orders.belongsTo(models.Users, {foreignKey: "order_user_id"})
  }
  return Orders
}

export default orders
