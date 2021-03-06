const Story = require("../models/story.model.js");
const Users = require("../models/user.model.js");

exports.createstory = (req,res)=>{

    const story = new Story({
        story_name               : req.body.story_name,
        story_description        : req.body.story_description,
        story_priority           : req.body.story_priority,
        story_points             : req.body.story_points,
        story_status             : req.body.story_status,
        story_created_by         : req.body.story_created_by,
        story_assignee           : req.body.story_assignee,
        story_completed_hours    : req.body.story_completed_hours,
        story_estimated_hours    : req.body.story_estimated_hours,
        story_sprint             : req.body.sprint_id
    });

    Story.createstory(story,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });

};

exports.getallstoreis = async(req,res)=>{
    
    
    var storeis = await getstories();
    var users  = await getusers();

    if(storeis.length>0){
        var list_of_stores = [];
        storeis.forEach(e1=>{
            let story_createdby;
            let story_assignee;
            users.forEach(e2=>{
                if((e1.story_created_by==e2.user_id)){
                    story_createdby = {"id":e2.user_id,"name":e2.user_name};
                }else if((e1.story_assignee==e2.user_id)){
                    story_assignee = {"id":e2.user_id,"name":e2.user_name};
                }
            });
           list_of_stores.push({
            "story_id": e1.story_id,
            "story_name": e1.story_name,
            "story_description": e1.story_description,
            "story_priority": e1.story_priority,
            "story_points":e1.story_points,
            "story_status":e1.story_status,
            "story_created_by": story_createdby,
            "story_assignee":  story_assignee,
            "story_completed_hours":e1.story_completed_hours,
            "story_estimated_hours": e1.story_estimated_hours,
            "story_sprint": e1.story_sprint
           });  
        });
        res.send({'statuscode':200,'body':list_of_stores});
    }else{
        res.send({'statuscode':200,'body': []});
    }
};

exports.listuserstories = async(req,res)=>{
    var userid = req.body.user_id;

    var userstories = await getstoriesbyuserid(userid);
    var users  = await getusers();

    if(userstories.length>0){
        var list_of_user_stories = [];
        userstories.forEach(e1=>{
            let story_createdby;
            let story_assignee;
            users.forEach(e2=>{
                if((e1.story_created_by==e2.user_id)){
                    story_createdby = {"id":e2.user_id,"name":e2.user_name};
                }else if((e1.story_assignee==e2.user_id)){
                    story_assignee = {"id":e2.user_id,"name":e2.user_name};
                }
            });
        list_of_user_stories.push({
            "story_id": e1.story_id,
            "story_name": e1.story_name,
            "story_description": e1.story_description,
            "story_priority": e1.story_priority,
            "story_points":e1.story_points,
            "story_status":e1.story_status,
            "story_created_by": story_createdby,
            "story_assignee":  story_assignee,
            "story_completed_hours":e1.story_completed_hours,
            "story_estimated_hours": e1.story_estimated_hours,
            "story_sprint": e1.story_sprint
           });  
        });
        res.send({'statuscode':200,'body':list_of_user_stories});
    }else{
        res.send({'statuscode':200,'body': []});
    }

};


exports.getfilterstories = async(req,res)=>{
    var status    = req.body.status;
    var sprint_id = req.body.sprint_id;
    
    var stories_list = await getstoreisbystatus(status,sprint_id);
    var users  = await getusers();
    if(stories_list.length>0){
        var list_of_user_stories = [];
        stories_list.forEach(e1=>{
            let story_createdby;
            let story_assignee;
            users.forEach(e2=>{
                if((e1.story_created_by==e2.user_id)){
                    story_createdby = {"id":e2.user_id,"name":e2.user_name};
                }else if((e1.story_assignee==e2.user_id)){
                    story_assignee = {"id":e2.user_id,"name":e2.user_name};
                }
            });
        list_of_user_stories.push({
            "story_name": e1.story_name,
            "story_description": e1.story_description,
            "story_priority": e1.story_priority,
            "story_points":e1.story_points,
            "story_status":e1.story_status,
            "story_created_by": story_createdby,
            "story_assignee":  story_assignee,
            "story_completed_hours":e1.story_completed_hours,
            "story_estimated_hours": e1.story_estimated_hours,
           });  
        });
        res.send({'statuscode':200,'body':list_of_user_stories});
    }else{
        res.send({'statuscode':200,'body': []});
    }
};


const getstories = ()=>
    new Promise((resolve,reject)=>{
        Story.listofstories((err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
    });
});

const getusers = ()=>
    new Promise((resolve,reject)=>{
        Users.gatallusers((err,data1)=>{
            if(err){
                reject(err);
            }else{
                resolve(data1);
            }
    });
});

const getstoriesbyuserid = (user_id)=>
    new Promise((resolve,reject)=>{
        Story.listofuserstoreis(user_id,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
    });
});

const getstoreisbystatus = (status,sprint_id)=>
    new Promise((resolve,reject)=>{
        Story.getfilterstory(status,sprint_id,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        });
    });

exports.updatestory =(req,res)=>{
    Story.updatestories(req.body,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });

};

exports.movestorytosprint = (req,res)=>{
    var sprint_id = req.body.sprint_id;
    var story_id  = req.body.story_id;
    Story.movestorytosprint(sprint_id,story_id,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });
};
