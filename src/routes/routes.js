module.exports = app => {
    const admin   = require("../controllers/admin.controller.js");
    const user    = require("../controllers/users.controller.js");

    /**Admin */

    //admin login info
    app.post("/admin/login",admin.getadminlogin);

    /**Admin Ends */

    /**User */
    app.post("/createuser",user.create);
    app.post("/userlogin",user.userlogin);
    /**User ends */  

};