const User = require("../models/user.model.js");

exports.create = (req,res)=>{
    console.log(req.body);
    if((req.body.emp_id=="")||(req.body.user_name=="")||(req.body.user_email=="")||(req.body.user_password=="")||(req.body.user_phone_number=="")||(req.body.role_type=="")||(req.body.admin_id=="")){
        res.send({"statuscode":400,"body":"Input params must not be empty."})
    }else{
        const user = new User({
            emp_id              : req.body.emp_id,
            user_name           : req.body.user_name,
            user_email          : req.body.user_email,
            user_password       : req.body.user_password,
            user_phone_number   : req.body.user_phone_number,
            role_type           : req.body.role_type,
            role                : "user"
        });

        User.checkuser(user,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                if(data.length==0){
                    User.create(user,(err,data)=>{
                        if(err){
                            console.log(err);
                            res.send(err);
                        }else{
                            res.send(data);
                        }
                    });
                }else{
                    res.send({"statuscode":400,"body":"User Already Exists."})
                }
            }
        });
    }
};

exports.getallusers = (req,res)=>{
    User.gatallusers((err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send({"statuscode":200,"body":data});
        }
    });
};

exports.userlogin = (req,res)=>{
    const userdata = new User({
        user_email      : req.body.user_email,
        user_password   : req.body.user_password

    });
    User.login(userdata,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });
};

exports.updateuser = (req,res)=>{
    if((req.body.user_id=="")||(req.body.emp_id=="")||(req.body.user_name=="")||(req.body.user_email=="")||(req.body.user_password=="")||(req.body.user_phone_number=="")||(req.body.role_type=="")){
        res.send({"statuscode":400,"body":"Input params must not be empty."})
    }else{
        User.update(req.body,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.send(data);
            }
        });    
    }    
};