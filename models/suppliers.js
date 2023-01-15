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
            phone_number: {
                type: DataTypes.STRING(16),
                allowNull: false,
            },
            contact_person: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            email_address: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            start_date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            end_date: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
        },
        {
            freezeTableName: true,
        }
    );

    return Suppliers;
};

// UNZE PTF SI WP 2022/2023 :: ZIJAD DOGLOD
