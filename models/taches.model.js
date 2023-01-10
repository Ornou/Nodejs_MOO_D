module.exports = (sequelize, Sequelize) => {
    const Tache = sequelize.define("taches", {
            titre: {
            type: Sequelize.STRING
            },
            description: {
            type: Sequelize.STRING
            },
            status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            },
            }, {
            timestamps: false
            });
    return Tache;
    };