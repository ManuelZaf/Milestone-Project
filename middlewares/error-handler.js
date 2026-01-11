function handleErrors(error, req, res, next){  //Any error comes from the server
    console.log(error);
    res.status(500).render('shared/500'); 
}

module.exports = handleErrors;
