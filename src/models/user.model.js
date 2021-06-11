const dbconn = require("../../database/databaseconfig.js");

const User = function(user){
    this.emp_id             = user.emp_id;
    this.user_name          = user.user_name;
    this.user_email         = user.user_email;
    this.user_password      = user.user_password;
    this.user_phone_number  = user.user_phone_number;
    this.role_type          = user.role_type;
    this.role               = user.role;
}

User.create = (newUser,result)=>{
    dbconn.query("Insert into users SET ?",newUser,(err,res)=>{
        if(err){
            if(err.code=='ER_NO_REFERENCED_ROW_2'){
                result({"statuscode":400,"body":"Invalid Admin Id."},null);    
            }
            console.log(err);
        }else{
            result(null,{"statuscode":200,"body":"User created successfully."})
        }
    });
};  

User.checkuser = (userinfo,result)=>{
    dbconn.query("select user_email from users where user_email='"+userinfo.user_email+"'",(err,res)=>{
        if(err){
            console.log(err);
        }else{
            result(null,res);
        }
    });
};

User.gatallusers = (result)=>{
    dbconn.query("select * from users",function(err,res){
        if(err){
            console.log(err);
        }else{
            result(null,res);
        }
    });
};

User.login = (userdata,result)=>{
    dbconn.query("select * from users where user_email='"+userdata.user_email+"' and user_password='"+userdata.user_password+"'",function(err,res){
        if(err){
            console.log(err);
        }else{
            if(res.length>0){
                result(null,{"statuscode":200,"body":res});    
            }else{
                result(null,{"statuscode":400,"body":"Username or password Incorrect."});
            }
        }
    }); 
};

module.exports = User;