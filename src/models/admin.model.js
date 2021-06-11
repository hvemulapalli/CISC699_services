const dbconn = require("../../database/databaseconfig.js");

const Admin = function(admin){
    this.admin_name     = admin.admin_name;
    this.admin_password = admin.admin_password; 
    this.role           = admin.role;
}

Admin.getadminlogin = (admin, result) =>{
    dbconn.query("select * from admin where admin_name='"+admin.admin_name+"'and admin_password='"+admin.admin_password+"'",(err,res)=>{
        if(err){
            console.log(err);
        }else{
            if(res.length>0){
                result(null,{"statuscode":200,"body":res});
            }else{
                result(null,{"statuscode":400,"body":"User name/password Incorrect."});
            }
        }
    });
};

module.exports = Admin;