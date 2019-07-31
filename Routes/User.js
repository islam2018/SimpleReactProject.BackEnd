const express = require('express');
const router = express.Router();
const UserService = require('../Services/UserService');
const userService = new UserService();

const multer = require('multer');
const CD_CREDENTAILS=require('../config/cloudinary.config');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: CD_CREDENTAILS.CNAME,
    api_key: CD_CREDENTAILS.API_KEY,
    api_secret: CD_CREDENTAILS.API_SECRET
});
const cloudinaryStorage=require('multer-storage-cloudinary');

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'SampleReactProject',
    filename: function (req, file, cb) {
        cb(null,new Date().toISOString().replace(/:/g, '-')+'_'+file.originalname);
    }
});

const upload=multer({storage:storage});


router.get('/users',(req,res)=>{
    userService.getAllUsers().then(users=>{
        res.status(200).json(users);
    }).catch(e=>{
       res.status(500).json({
           message:'Une erreur s\'est produite'+e
       });
    });
});

router.post('/users',(req,res)=>{
    userService.createUser(req.body).then(user=>{
        res.status(200).json(user);
    }).catch(e=>{
        res.status(500).json({
            message:'Une erreur s\'est produite'+e
        });
    });
});

router.post('/user/:id/picture',upload.single('picture'),(req,res)=> {

    let path=req.file.url;
    userService.updatePicture(req.params.id,path).then(pic=>{
        userService.getUser(req.params.id).then(user=>{
            res.status(200).json(user);
        }).catch(e=>{
            res.status(500).json({
                message:'Une erreur s\'est produite'+e
            });
        });
    }).catch(e=>{
        res.status(500).json({
            message:'Une erreur s\'est produite'+e
        });
    });

});


router.get('/user/:id',(req,res)=>{
    userService.getUser(req.params.id).then(user=>{
        res.status(200).json(user);
    }).catch(e=>{
        res.status(500).json({
            message:'Une erreur s\'est produite'+e
        });
    });
});

router.put('/user/:id',(req,res)=>{
    userService.updateUser(req.params.id,req.body).then(user=>{
        res.status(200).json(user);
    }).catch(e=>{
        res.status(500).json({
            message:'Une erreur s\'est produite'+e
        });
    });
});

router.delete('/user/:id',(req,res)=>{
    userService.deleteUser(req.params.id).then(r=>{
        if (r) {
            res.status(200).json({
                message:'Utilisateur supprimé !'
            });
        } else {
            res.status(500).json({
                mmessage:'Une erreur s\'est produite'
            });
        }
    }).catch(e=>{
        res.status(500).json({
            message:'Une erreur s\'est produite'
        });
    });
});


module.exports = router;
