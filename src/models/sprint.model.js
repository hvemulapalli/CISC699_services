const dbconn = require("../../database/databaseconfig.js");

const Sprint = function(sprint){
    this.sprint_name        = sprint.sprint_name;
    this.sprint_duration    = sprint.sprint_duration;
    this.sprint_start_time  = sprint.sprint_start_time;
    this.sprint_end_time    = sprint.sprint_end_time;
    this.sprint_admin       = sprint.sprint_admin; 
};

Sprint.createsprint = (sprint,result)=>{
    dbconn.query("insert into sprints SET ?",sprint,(err,res)=>{
        if(err){
            if(err.code=='ER_DUP_ENTRY'){
                result({"statuscode":400,"body":"Sprint with this name already exists."},null);
            }
        }else{
            result(null,{"statuscode":200,"body":"Sprint created successfully."})
        }
    });
};

Sprint.getallsprints = (result)=>{
    dbconn.query("select * from sprints",(err,res)=>{
        if(err){
            console.log(err);
        }else{
            result(null,{"statuscode":200,"body":res});
        }
    });
};

Sprint.updatesprint = (editsprint,result)=>{
    dbconn.query("UPDATE sprints SET sprint_name=?,sprint_duration=?,sprint_start_time=?,sprint_end_time=? where sprint_id=? and sprint_admin=?",
    [editsprint.sprint_name,editsprint.sprint_duration,editsprint.sprint_start_time,editsprint.sprint_end_time,editsprint.sprint_id,editsprint.admin_id],(err,res)=>{
        if(err){
            console.log(err);
        }else{
            if(res.affectedRows == 0){
                result(null,{"statuscode":400,"body":"Sprint Update Failed."});
            }else{
                result(null,{"statuscode":200,"body":"Sprint Updated Successfully."});
            }
        }
    });
};

module.exports = Sprint;