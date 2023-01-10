module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define('taches', {
        titre: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        Date: {
          type: Sequelize.DATE,
          allowNull: true
        },
        statut: {
          type: Sequelize.ENUM('en attente', 'complétée'),
          defaultValue: 'en attente'
        }
      });
    return Task;
    };

    Task.belongsTo(User);
    Task.belongsTo(Category);

    module.exports = { Task };