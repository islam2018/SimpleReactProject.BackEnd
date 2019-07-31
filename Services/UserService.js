const USER = require('../Models/UserModel');
const PICTURE = require('../Models/PictureModel');
USER.hasMany(PICTURE, {as:'image',foreignKey: 'id',targetKey:'id'});

let UserService = class UserService{

    getAllUsers() {
       return  new Promise((resolve,reject)=>{
           USER.findAll({
                include:[
                    {model: PICTURE, attributes:['path'],as:'image',required:false}
                ]
            }).then(users=>{
                let res=[];
                users.forEach(u=>{
                    let user=u.toJSON();
                    let path = '';
                    if (user.image.length>0) {
                        path = user.image[0].path;
                    }
                    res.push({
                        id:user.id,
                        firstname:user.firstname,
                        lastname:user.lastname,
                        birthday:user.birthday,
                        email:user.email,
                        phone:user.phone,
                        adress:user.adress,
                        imgpath:path
                    });
                });
                resolve(res);
            }).catch(e=>{
                reject(e);
           });
        });

    }

    getUser(idUser) {
        return  new Promise((resolve,reject)=>{
            USER.findOne({
                include:[
                    {model: PICTURE, attributes:['path'],as:'image',required:false}
                ],
                where:{id:idUser}
            }).then(user=>{
                let path = '';

                if (user.image.length >0) {
                    path = user.image[0].path;
                }
                resolve ({
                        id:user.id,
                        firstname:user.firstname,
                        lastname:user.lastname,
                        birthday:user.birthday,
                        email:user.email,
                        phone:user.phone,
                        adress:user.adress,
                        imgpath:path
                });

            }).catch(e=>{
                reject(e);
            });
        });

    }

    createUser(user) {
        return new Promise((resolve,reject)=>{
            USER.create({
                firstname:user.firstname,
                lastname:user.lastname,
                birthday:user.birthday,
                email:user.email,
                phone:user.phone,
                adress:user.adress,
            }).then(newUser=>{
                this.getUser(newUser.id).then(user=>{
                    resolve(user);
                }).catch(error=>{
                   reject(error);
                });
            }).catch(e=>{
               reject(e);
            });
        });
    }

    updateUser(idUser, user) {
        return new Promise((resolve,reject)=>{
            return USER.update({
                firstname:user.firstname,
                lastname:user.lastname,
                birthday:user.birthday,
                email:user.email,
                phone:user.phone,
                adress:user.adress,
            },{where:{id: idUser}}).then(newUser=>{
                this.getUser(idUser).then(user=>{
                    resolve(user);
                }).catch(error=>{
                    reject(error);
                });
            }).catch(e=>{
                reject(e);
            });
        });
    }

    updatePicture(idUser, path) {
        return new Promise((resolve,reject)=>{
            PICTURE.findOne({where:{id:idUser}}).then(picture=>{
                let promise=[];
                if (picture!==null) {
                    promise.push(PICTURE.destroy({where:{id:idUser}}));
                }
                Promise.all(promise).then(data=>{
                    PICTURE.create({
                        id:idUser,
                        path:path
                    }).then(pic=>{
                        resolve(pic);
                    }).catch(er=>{reject(er);})
                }).catch(e=>{
                   reject(e);
                });

            }).catch(error=>{
                reject(error);
            });
        });
    }


    deleteUser(idUser) {
        return USER.destroy({where:{id:idUser}})
    }


};

module.exports = UserService;
