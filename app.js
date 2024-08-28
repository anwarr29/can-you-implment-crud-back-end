const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/product')


const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://anwarr29:mdbanVar%2398@cluster0.ydwux5z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('connected to MongoDB Atlas!');
})
.catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.log(error);
});

app.post('/api/products', (req, res, next) => {
    const product = new Product({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        inStock : req.body.inStock
    });
    product.save().then(() => {
        res.status(201).json({
            message: "product created succesfully!"
        });
    })
    .catch((error) => {
        res.status(400).json({
            error: error
        });
    });
});

app.get('/api/products/', (req, res, next) => {
    Product.find().then((products) => {
        res.status(200).json(products)
    })
    .catch((error) => {
        res.status(400).json({
            error: error
        });
    });
});

app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({_id: req.params.id}).then((product) => {
        res.status(200).json(product)
    })
    .catch((error) => {
        res.status(400).json({
            error: error
        });
    });
});


app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({_id: req.params.id}).then(() => {
        res.status(200).json({
            message: "deleted successfully"
        })
    })
    .catch((error) => {
        res.status(400).json({
            error: error
        });
    });
});

app.delete('/api/products', (req, res, next) => {
    Product.deleteMany().then(() => {
        res.status(200).json({
            message: "deleted everything"
        })
    })
    .catch((error) => {
        res.status(400).json({
            error: error
        });
    });
});

app.put('/api/products/:id', (req, res, next) => {
    const product = new Product({
        _id : req.params.id,
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        inStock : req.body.inStock
    })
    Product.updateOne({_id: req.params.id}, product)
    .then(() => {
        res.status(200).json({
            message: "updated successfully!"
        })
    })
    .catch((error) => {
        res.status(400).json({
            error: error
        });
    });
});










module.exports = app;