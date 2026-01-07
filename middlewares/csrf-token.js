function addCsrfToken(req, res, next) {
    res.locals.csrfToken = req.csrfToken() 
    //the csrfToken method is available thanks to the CSRF middleware pachage
    //The generated Token is saved in locals and locals
    //is available to all my views
    next();//that is a function which, when executed
    //forwards the request to the next middleware in line
}

module.exports = addCsrfToken