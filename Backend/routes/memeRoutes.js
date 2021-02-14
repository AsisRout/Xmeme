const express = require('express');
const router = express.Router();
const Meme = require('../models/meme');

//Meme routes
//Display List of upto 100 Latest memes
router.get('/', (req,res) => {
    Meme.find().limit(100).sort({ $natural:-1 })
        .then( result => {
                console.log(typeof result);
                res.status(200).json(result);
            
        })
        .catch(err => {
                console.log(err);
                res.status(500).send();
        });
});

// Add a meme to the db
router.post('/', (req,res) => {
      /* #swagger.parameters['name'] = {
               description: 'Enter Name',
               type: 'string'
        } */
      /* #swagger.parameters['caption'] = {
               description: 'Enter Caption',
               type: 'string'
        } */
          /* #swagger.parameters['url'] = {
               description: 'Enter URL',
               type: 'string'
        } */
    const meme = new Meme(req.body);
    Meme.find(req.body , function(err,docs){
    
    if(docs.length){
        res.status(409).send();
    }
    else {
    meme.save()
        .then(result => {
            res.status(201).json({id : result.id});
        })
        .catch(err => {
             console.log(err);
             res.status(500).send();
        });
    }
    })
});

// Display a meme
router.get('/:id', (req,res) => {
    const id = req.params.id;
    Meme.findById(id)
        .then(result => {
            res.status(200).send(result);
    })
        .catch(err => {
            console.log(err);
            res.status(404).send();
    });
});

//Update a meme in the db
router.patch('/:id', async(req,res) => {
        
      /* #swagger.parameters['caption'] = {
               description: 'Enter Caption',
               type: 'string'
        } */
          /* #swagger.parameters['url'] = {
               description: 'Enter URL',
               type: 'string'
        } */
        var updateObject = req.body; 
        var id = req.params.id;
        await Meme.findByIdAndUpdate(id, {$set: updateObject})
        .then( result => {
            console.log(result);
            res.status(200).send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send();
        });
});

//Delete a meme in the db
router.delete('/:id', (req,res) => {
    const id = req.params.id;
    Meme.findByIdAndDelete(id)
        .then(result => {
            res.status(200).send();
      })
        .catch(err => {
            console.log(err);
            res.status(404).send();
      });
});



module.exports = router;