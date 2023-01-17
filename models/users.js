module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
        'Users',
        {
            username: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            role: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            employeeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    );

    return Users;
};

// UNZE PTF SI WP 2022/2023 :: ZIJAD DOGLOD
