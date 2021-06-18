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

module.exports = Sprint;