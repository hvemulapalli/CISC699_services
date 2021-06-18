const Bugs = require("../models/bugs.model.js");
const Users = require("../models/user.model.js");

exports.createbug = (req,res)=>{

    const bugs = new Bugs({
        bug_name               : req.body.bug_name,
        bug_description        : req.body.bug_description,
        bug_priority           : req.body.bug_priority,
        bug_points             : req.body.bug_points,
        bug_status             : req.body.bug_status,
        bug_created_by         : req.body.bug_created_by,
        bug_assignee           : req.body.bug_assignee,
        bug_completed_hours    : req.body.bug_completed_hours,
        bug_estimated_hours    : req.body.bug_estimated_hours,
        bug_sprint             : req.body.sprint_id
    });

    Bugs.createbug(bugs,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });

};  

exports.getbugs = async(req,res)=>{

    var bugslists_data;
    var userslists_data;

    try{
        const bugslist = await bugs();
        bugslists_data = bugslist;
    }catch(err){
        console.log(err);
    }

    try{
        const userslist = await users();
        userslists_data = userslist;
    }catch(err1){
        console.log(err1);
    }

    if(bugslists_data.length>0){
        var total_bugs_list = [];
        bugslists_data.forEach(e1=>{
            let bugcreated_by;
            let bugassignee;
            userslists_data.forEach(e2=>{
                if(e1.bug_created_by == e2.user_id){
                    bugcreated_by = e2.user_name;
                }else if(e1.bug_assignee == e2.user_id){
                    bugassignee = e2.user_name;
                }
            });
            total_bugs_list.push({
                "bug_id": e1.bug_id,
                "bug_name": e1.bug_name,
                "bug_description":e1.bug_description,
                "bug_priority":e1.bug_priority,
                "bug_points": e1.bug_points,
                "bug_status":e1.bug_status,
                "bug_created_by" : bugcreated_by,
                "bug_assignee" : bugassignee,
                "bug_completed_hours": e1.bug_completed_hours,
                "bug_estimated_hours": e1.bug_estimated_hours,
                "bug_sprint" : e1.bug_sprint
            });
        });
        res.send({"statuscode":200,"body":total_bugs_list});
    }else{
        res.send({"statuscode":200,"body":"No bugs listed."});
    }

};

const users = ()=>
    new Promise((resolve,reject)=>{
        Users.gatallusers((err1,data1)=>{
            if(err1){
                reject(err1);
            }else{
                resolve(data1);
            }
    });
});

const bugs = ()=>
    new Promise((resolve,reject)=>{
        Bugs.listallbugs((err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    });