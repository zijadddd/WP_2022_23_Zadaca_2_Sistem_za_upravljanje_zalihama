module.exports = (sequelize, DataTypes) => {
    const Korisnici = sequelize.define(
        'Korisnici',
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
            freezeTableName: true, // Da ne bi stavljao s na kraju imena tabele npr. korisnicis
        }
    );

    return Korisnici;
};
