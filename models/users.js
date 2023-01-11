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
            uloga: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            zaposlenikId: {
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
