const express = require('express');
const app = express();

const {Product, syncAndSeed} = require('./db');

const port = process.env.PORT || 3000;

//For testing purpose lets call db syncAndSeed
syncAndSeed();

//Some middleware eh
app.use('/', express.static('../public'));
app.use(require('morgan')('tiny'));
app.use(express.json());

//Now for some product routes
app.get('/api/products', async(req, res, next)=> {
  try{
    res.status(200).send(await Product.findAll());
  }
  catch(e){
    console.log(e);
    res.status(404).send();
  }
});

app.post('/api/products', async(req, res, next)=>{
  try{
    const created = await Product.create(req.body);
    created ? res.status(201).send(created) : res.status(404).send();
  }
  catch(e){
    console.log(e);
    res.status(404).send();
  }
});

app.delete('/api/products/:id', async(req, res, next)=>{
  try{
    const success = await Product.destroy({where: {id: req.params.id}});
    success ? res.status(202).send() : res.status(500).send();
  }
  catch(e){
    console.log(e);
    res.status(500).send();
  }
});

app.listen(port);
