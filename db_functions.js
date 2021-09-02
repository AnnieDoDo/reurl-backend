const { Sequelize, DataTypes } = require('sequelize');
const uuid = require('uuid');
const Console = require('console');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './sqldev.db',
});

sequelize.authenticate()
  .then(() => {
    Console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    Console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define('USER', {
  ID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  USERNAME: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  PASSWORD: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

const Link = sequelize.define('LINK', {
  ID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  URL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  KEY: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  COUNT: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = {
  async createUser(username, password) {
    try {
      await User.upsert({
        ID: uuid.v4(),
        USERNAME: username,
        PASSWORD: password,
      });
      return true;
    } catch (e) {
      return false;
    }
  },
  CreateLink(url, key) {
    return Link.upsert({
      ID: uuid.v4(),
      URL: url,
      KEY: key,
      COUNT: 0,
    });
  },
  GetUrlByKey(key) {
    return Link.findOne({
      attributes: ['URL'],
      where: {
        KEY: key,
      },
    });
  },
  GetKeyByUrl(url) {
    return Link.findOne({
      attributes: ['KEY'],
      where: {
        URL: url,
      },
    });
  },

};
