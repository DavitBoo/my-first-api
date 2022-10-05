const e = require('express');
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//I don't need to add ./posts route here, becasue from the main I come to this file whenever I ask for ./posts
//returns all the posts
router.get('/', (req, res) => {
    Post.find().then(data => {
        res.json(data);
    }).catch(err => {
        res.status({message: error  });
    })
});


//SUBMIT A POST
router.post('/', (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })

    post.save()
        .then(data => {
            res.status(200).json(data);
        }
    ).catch(error => {
        res.status({message: error  });
    })
});

//SPECIFIC POST
router.get('/:postId', async (req, res) => {
   try{
        const post = await Post.findById(req.params.postId);
        res.json(post)
   }catch(err){
    res.json({message:error})
   }
})

//POST DELETE
router.delete('/:postId', async (req, res) => {
    try{
        const removePost = await Post.remove({_id: req.params.postId })
        res.json(removePost);
    }catch(err){
        res.json({message:error})
    }
});

//UPDATE A POST 
router.patch('/:postId', async (req, res) => {
    try{
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId}, 
            {$set: {title: req.body.title}}
        );
        res.json(updatedPost);
    }catch(err){
        res.json({message:error})
    }
})

module.exports = router;