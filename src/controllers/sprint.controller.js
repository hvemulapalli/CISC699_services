const Sprint = require("../models/sprint.model.js");

exports.create = (req,res)=>{
    
    const sprint = new Sprint({
        sprint_name        : req.body.sprint_name,
        sprint_duration    : req.body.sprint_duration,
        sprint_start_time  : new Date(req.body.sprint_start_time),
        sprint_end_time    : new Date(req.body.sprint_end_time),
        sprint_admin       : req.body.sprint_admin
    });

    Sprint.createsprint(sprint,(err,data)=>{
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    });
};

exports.getallsprints = (req,res)=>{
    Sprint.getallsprints((err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });
};

exports.updatesprint =(req,res)=>{
    Sprint.updatesprint(req.body,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });
};