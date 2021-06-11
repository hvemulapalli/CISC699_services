const Admin = require("../models/admin.model");
exports.getadminlogin = (req,res)=>{
    
    if((req.body.admin_username=="")||(req.body.admin_password=="")){
        res.status(400).send({"statuscode":400,"body":"Input params must not be empty."})
    }else{
        Admin.getadminlogin(req.body,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.send(data);
            }
        }); 
    }
};