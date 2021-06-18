const dbconn = require("../../database/databaseconfig.js");

const Bug = function(bug){
    this.bug_name               = bug.bug_name;
    this.bug_description        = bug.bug_description;
    this.bug_priority           = bug.bug_priority;
    this.bug_points             = bug.bug_points;
    this.bug_status             = bug.bug_status;
    this.bug_created_by         = bug.bug_created_by;
    this.bug_assignee           = bug.bug_assignee;
    this.bug_completed_hours    = bug.bug_completed_hours;
    this.bug_estimated_hours    = bug.bug_estimated_hours;
    this.bug_sprint             = bug.bug_sprint;
};

Bug.createbug = (bug,result)=>{
    dbconn.query("insert into bugs SET ?",bug,(err,res)=>{
        if(err){
            console.log(err);
        }else{
            result(null,{"statuscode":200,"body":"bug created successfully."});
        }
    });
};

Bug.listallbugs = (result)=>{
    dbconn.query("select * from bugs",(err,res)=>{
        if(err){
            console.log(err);
        }else{
            result(null,res);
        }
    });
};

module.exports = Bug;