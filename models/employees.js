module.exports = (sequelize, DataTypes) => {
    const Employees = sequelize.define(
        'Employees',
        {
            firstName: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            phoneNumber: {
                type: DataTypes.STRING(16),
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            emailAddress: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            dateOfEmployment: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            datumOfCancellation: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
        },
        {
            freezeTableName: true,
        }
    );

    Employees.associate = (models) => {
        Employees.hasOne(models.Users, {
            onDelete: 'cascade',
            foreignKey: {
                name: 'employeeId',
            },
        });
    };

    return Employees;
};

// UNZE PTF SI WP 2022/2023 :: ZIJAD DOGLOD
