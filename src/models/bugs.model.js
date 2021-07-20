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

Bug.listofuserbugs = (userid,result)=>{
    dbconn.query("select * from bugs where bug_assignee=?",[userid],(err,res)=>{
        if(err){
            console.log(err);
        }else{
            result(null,res);
        }
    });
};

Bug.updatebug = (editbug,result)=>{
    var completed_hours = editbug.bug_completed_hours;
    var query1 = "UPDATE bugs SET bug_name=?,bug_description=?,bug_priority=?,bug_points=?,bug_status=?,bug_assignee=?,bug_estimated_hours=? where bug_id=?";
    var query1_values = [editbug.bug_name,editbug.bug_description,editbug.bug_priority,editbug.bug_points,editbug.bug_status,editbug.bug_assignee,editbug.bug_estimated_hours,editbug.bug_id];
    var query2 = "UPDATE bugs SET bug_name=?,bug_description=?,bug_priority=?,bug_points=?,bug_status=?,bug_assignee=?,bug_completed_hours=bug_completed_hours+?,bug_estimated_hours=? where bug_id=?";
    var query2_values = [editbug.bug_name,editbug.bug_description,editbug.bug_priority,editbug.bug_points,editbug.bug_status,editbug.bug_assignee,editbug.bug_completed_hours,editbug.bug_estimated_hours,editbug.bug_id];
    if(completed_hours!==0){
    dbconn.query(query2,query2_values,(err,res)=>{
        if(err){
            console.log(err);
        }else{
            if(res.affectedRows == 0){
                result(null,{"statuscode":400,"body":"Bug Update Failed."});
            }else{
                result(null,{"statuscode":200,"body":"Bug Updated Successfully."});
            }
        }
    });
    }else{
        dbconn.query(query1,query1_values,(err,res)=>{
            if(err){
                console.log(err);
            }else{
                if(res.affectedRows == 0){
                    result(null,{"statuscode":400,"body":"Bug Update Failed."});
                }else{
                    result(null,{"statuscode":200,"body":"Bug Updated Successfully."});
                }
            }
        }); 
    }
};

Bug.moveBugtosprint = (sprint_id,bug_id,result)=>{
    dbconn.query("update bugs set bug_sprint=? where bug_id=?",[sprint_id,bug_id],(err,res)=>{
        if(err){
            console.log(err);
        }else{
            if(res.affectedRows == 0){
                result(null,{"statuscode":400,"body":"Bug Move Failed."});
            }else{
                result(null,{"statuscode":200,"body":"Bug Moved to sprint Successfully."});
            }
        }
    });
};

Bug.getfilterbug = (status,sprint_id,result)=>{
    dbconn.query("select * from bugs where bug_status=? and bug_sprint=?",[status,sprint_id],(err,res)=>{
        if(err){
            console.log(err);
        }else{
            result(null,res);
        }
    });
};

module.exports = Bug;