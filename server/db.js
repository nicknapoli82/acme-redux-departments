const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-products', {logging: false});

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

const syncAndSeed = async() => {
  try{
    await db.sync({force: true});
    await Product.create({name: 'A Product'});
    await Product.create({name: 'One more thing'});
  }
  catch(er){
    console.log(er);
  }
};

module.exports = {syncAndSeed, Product};
