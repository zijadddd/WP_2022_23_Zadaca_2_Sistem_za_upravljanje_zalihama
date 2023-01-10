module.exports = (sequelize, DataTypes) => {
    const Zaposlenici = sequelize.define(
        'Zaposlenici',
        {
            ime: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            prezime: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            broj_telefona: {
                type: DataTypes.STRING(16),
                allowNull: false,
            },
            adresa: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            email_adresa: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            datum_zaposlenja: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            datum_otkaza: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
        },
        {
            freezeTableName: true, // Da ne bi stavljao s na kraju imena tabele npr. zaposlenicis
        }
    );

    Zaposlenici.associate = (models) => {
        Zaposlenici.hasOne(models.Korisnici, {
            onDelete: 'cascade',
            foreignKey: {
                name: 'zaposlenikId',
            },
        });
    };

    return Zaposlenici;
};
