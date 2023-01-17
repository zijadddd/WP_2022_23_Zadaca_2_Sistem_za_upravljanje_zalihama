module.exports = (sequelize, DataTypes) => {
    const RawMaterials = sequelize.define(
        'RawMaterials',
        {
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            minAmount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT.UNSIGNED,
                allowNull: false,
            },
            unitOfMeasurement: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            usable: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            supplierId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    );

    return RawMaterials;
};

// UNZE PTF SI WP 2022/2023 :: ZIJAD DOGLOD
