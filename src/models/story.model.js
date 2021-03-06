const dbconn = require("../../database/databaseconfig.js");

const Story = function(story){
    this.story_name               = story.story_name;
    this.story_description        = story.story_description;
    this.story_priority           = story.story_priority;
    this.story_points             = story.story_points;
    this.story_status             = story.story_status;
    this.story_created_by         = story.story_created_by;
    this.story_assignee           = story.story_assignee;
    this.story_completed_hours    = story.story_completed_hours;
    this.story_estimated_hours    = story.story_estimated_hours;
    this.story_sprint             = story.story_sprint;
};

Story.createstory = (story,result)=>{
    dbconn.query("insert into stories SET ?",story,(err,res)=>{
        if(err){
            console.log(err);
        }else{
            result(null,{"statuscode":200,"body":"story created successfully."});
        }
    });
};

Story.listofstories = (result)=>{
    dbconn.query("select * from stories",(err,res)=>{
        if(err){
            console.log(err);
        }else{
            result(null,res);
        }
    });
};

Story.updatestories =(editstory,result)=>{
    var completed_hours = editstory.story_completed_hours;
    var query1 = "UPDATE stories SET story_name=?,story_description=?,story_priority=?,story_points=?,story_status=?,story_assignee=?,story_estimated_hours=? where story_id=?";
    var query1_values = [editstory.story_name,editstory.story_description,editstory.story_priority,editstory.story_points,editstory.story_status,editstory.story_assignee,editstory.story_estimated_hours,editstory.story_id];
    var query2 = "UPDATE stories SET story_name=?,story_description=?,story_priority=?,story_points=?,story_status=?,story_assignee=?,story_completed_hours=story_completed_hours+?,story_estimated_hours=? where story_id=?";
    var query2_values = [editstory.story_name,editstory.story_description,editstory.story_priority,editstory.story_points,editstory.story_status,editstory.story_assignee,editstory.story_completed_hours,editstory.story_estimated_hours,editstory.story_id];
    if(completed_hours!==0){
    dbconn.query(query2,query2_values,(err,res)=>{
        if(err){
            console.log(err);
        }else{
            if(res.affectedRows == 0){
                result(null,{"statuscode":400,"body":"Story Update Failed."});
            }else{
                result(null,{"statuscode":200,"body":"Story Updated Successfully."});
            }
        }
    });
    }else{
        dbconn.query(query1,query1_values,(err,res)=>{
            if(err){
                console.log(err);
            }else{
                if(res.affectedRows == 0){
                    result(null,{"statuscode":400,"body":"Story Update Failed."});
                }else{
                    result(null,{"statuscode":200,"body":"Story Updated Successfully."});
                }
            }
        }); 
    }
};

Story.listofuserstoreis = (userid,result)=>{
    dbconn.query("select * from stories where story_assignee=?",[userid],(err,res)=>{
        if(err){
            console.log(err);
        }else{
            result(null,res);
        }
    });
};

Story.movestorytosprint = (sprint_id,story_id,result)=>{
    dbconn.query("update stories set story_sprint=? where story_id=?",[sprint_id,story_id],(err,res)=>{
        if(err){
            console.log(err);
        }else{
            if(res.affectedRows == 0){
                result(null,{"statuscode":400,"body":"Story Move Failed."});
            }else{
                result(null,{"statuscode":200,"body":"Story Moved to sprint Successfully."});
            }
        }
    });
};

Story.getfilterstory = (status,sprint_id,result)=>{
    dbconn.query("select * from stories where story_status=? and story_sprint=?",[status,sprint_id],(err,res)=>{
        if(err){
            console.log(err);
        }else{
            result(null,res);
        }
    });
};

module.exports = Story;