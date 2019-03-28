
const { check, validationResult } = require('express-validator/check');
const Product = require('./product_model.js');

apis = {};

apis.validator = function(method){

    switch (method){
        case 'create': {
            return [
                check(['name', 'price']).not().isEmpty().withMessage('is required.'),
            ]
        };
        case 'update': {
            return [
                check(['id']).not().isEmpty().withMessage('is required.'),
            ]
        };
        case 'delete': {
            return [
                check(['id']).not().isEmpty().withMessage('is required.'),
            ]
        };
    }
};

apis.create = function (req, res) {
    
    const verrors = validationResult(req);
    if (!verrors.isEmpty()) {
        return res.status(422).json({ errors: verrors.array() });
    }

    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send({id: product._id});
    });
};

apis.product_details = function(req, res, next){
    Product.findById(req.params.id, function (err, product) {
        if (err) return res.send({
            message: 'No data found!'
        });
        res.send(product);
    })
};

apis.product_update = function (req, res, next) {
    const verrors = validationResult(req);
    if (!verrors.isEmpty()) {
        return res.status(422).json({ errors: verrors.array() });
    }

    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

apis.product_delete = function (req, res, next) {
    const verrors = validationResult(req);
    if (!verrors.isEmpty()) {
        return res.status(422).json({ errors: verrors.array() });
    }
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};


module.exports = apis;
