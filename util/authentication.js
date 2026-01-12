function createUserSession(req, user, action){
    //request object, because we need to access the session
    //the user that we created, with all the user data
    //action should be executed once the session is updated (redirect for example)
req.session.uid = user._id.toString(); //the _id from the database
//that is available because of the express-session package
req.session.save(action); //it runs the anonymous function in login authUtil in auth.controller.js
}

module.exports = {
    createUserSession: createUserSession
};