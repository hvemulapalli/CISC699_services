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

module.exports = Story;