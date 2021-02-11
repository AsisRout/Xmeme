const express = require('express');
const router = express.Router();
const Meme = require('../models/meme');

//Meme routes
//Display List of upto 100 Latest memes
router.get('/', (req,res) => {
    Meme.find().limit(100).sort({ $natural:-1 })
        .then( result => {
                console.log(typeof result);
                res.json(result);
            
        })
        .catch(err => {
                console.log(err);
                res.status(500).send();
        });
});

// Add a meme to the db
router.post('/', (req,res) => {
    const meme = new Meme(req.body);
    meme.save()
        .then(result => {
            res.status(201).json({id : result.id});
        })
        .catch(err => {
             console.log(err);
             res.status(500).send();
        });
});

// Display a meme
router.get('/:id', (req,res) => {
    const id = req.params.id;
    Meme.findById(id)
        .then(result => {
            res.send(result);
    })
        .catch(err => {
            console.log(err);
            res.status(404).send();
    });
});

//Update a meme in the db
router.patch('/:id', (req,res) => {
    res.send({type:'PATCH'});
});

//Delete a meme in the db
router.delete('/:id', (req,res) => {
    const id = req.params.id;
    Meme.findByIdAndDelete(id)
        .then(result => {
            res.send(result);
      })
        .catch(err => {
            console.log(err);
            res.status(404).send();
      });
});



module.exports = router;