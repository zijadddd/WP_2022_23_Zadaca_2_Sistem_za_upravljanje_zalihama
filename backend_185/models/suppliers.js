module.exports = (sequelize, DataTypes) => {
    const Suppliers = sequelize.define(
        'Suppliers',
        {
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            uid: {
                type: DataTypes.STRING(13),
                allowNull: false,
            },
            vat: {
                type: DataTypes.FLOAT.UNSIGNED,
                allowNull: false,
            },
            phoneNumber: {
                type: DataTypes.STRING(16),
                allowNull: false,
            },
            contactPerson: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            emailAddress: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            startDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            endDate: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
        },
        {
            freezeTableName: true,
        }
    );

    Suppliers.associate = (models) => {
        Suppliers.hasMany(models.RawMaterials, {
            onDelete: 'cascade',
            foreignKey: {
                name: 'supplierId',
            },
        });
    };

    return Suppliers;
};

// UNZE PTF SI WP 2022/2023 :: ZIJAD DOGLOD
