module.exports = (sequelize, DataTypes) => {
    const RawMaterials = sequelize.define(
        'RawMaterials',
        {
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            min_amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT.UNSIGNED,
                allowNull: false,
            },
            unit_of_measurement: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            usable: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            supplier_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    );

    RawMaterials.associate = (models) => {
        RawMaterials.hasOne(models.Suppliers, {
            onDelete: 'cascade',
            foreignKey: {
                name: 'id',
            },
        });
    };

    return RawMaterials;
};

// UNZE PTF SI WP 2022/2023 :: ZIJAD DOGLOD
