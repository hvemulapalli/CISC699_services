module.exports = app => {
    const admin   = require("../controllers/admin.controller.js");
    const user    = require("../controllers/users.controller.js");
    const sprints = require("../controllers/sprint.controller.js");
    const story   = require("../controllers/story.controller.js");
    const bugs    = require("../controllers/bugs.controller.js");

    /**Admin */

    //admin login info
    app.post("/admin/login",admin.getadminlogin);

    /**Admin Ends */

    /**User */
    app.post("/createuser",user.create);
    app.get("/userslist",user.getallusers);
    app.post("/userlogin",user.userlogin);
    app.put("/userupdate",user.updateuser);
    /**User ends */  

    /**Sprint */
    app.post("/createsprint",sprints.create);
    app.get("/getallsprints",sprints.getallsprints);
    app.put("/updatesprint",sprints.updatesprint);
    /**Sprint ends */

    /**stories */
    app.post("/createstory",story.createstory);
    app.get("/getlistofstories",story.getallstoreis);
    app.put("/updatestory",story.updatestory);
    app.post("/listuserstories",story.listuserstories);
    app.post("/storymovetosprint",story.movestorytosprint);
    app.post("/getfilterstories",story.getfilterstories);
    /**stories ends */

    /**Bugs */
    app.post("/createbugs",bugs.createbug);
    app.get("/listbugs",bugs.getbugs);
    app.post("/listuserbugs",bugs.listusersbugs);
    app.put("/updatebug",bugs.updatebug);
    app.post("/bugmovetosprint",bugs.moveBugtosprint);
    app.post("/getfilterbugs",bugs.getfilterbugs);
    /**Bugs ends */
};