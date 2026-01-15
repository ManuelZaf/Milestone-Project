function checkAuthStatus(req, res, next){
    const uid = req.session.uid;
    //in authentication.js we create the session and we store the uid
    if(!uid){ //we check if the user exists, if not the function ends and the programm continues to the next middleware
        return next();
    }
    res.locals.uid = uid;
    res.locals.isAuth = true;
    next();
}

module.exports = checkAuthStatus;