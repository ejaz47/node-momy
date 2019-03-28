
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');

let auth = {};

//A midleware to check token status
auth.check = function(req, res, next){
    // check header for the token
    var token = req.headers['access-token'];

    // decode token
    if (token) {
        // verifies secret and checks if the token is expired
        jwt.verify(token, req.app.get('Secret'), (err, decoded) =>{      
            if (err) {
              return res.json({ message: 'invalid token' });    
            } else {
              // if everything is good, save to request for use in other routes
              req.current_user = decoded;
              next();
            }
        });
    } else {
        // if there is no token  
        res.status(403).send({ 
            message: 'No token provided.' 
        });
    }
};

auth.login = (req, res, next) => {

    //Validation
    const verrors = validationResult(req);
    if (!verrors.isEmpty()) {
        return res.status(422).json({ errors: verrors.array() });
    }

    //Check if username password matches
	let query = 'SELECT * FROM user WHERE username = ? and password = ?';

	let username = req.body.username;
	let password = req.body.password;

    global.connection.query(query, [username, password], function (error, results, fields) {
        
        if (error){
            res.send({ 
            	success: 0,
	            message: 'Mysql Server Error'
	        });
        }else{
            
            result = JSON.parse(JSON.stringify(results));
            //send error if no records foud 
            if(results.length < 1){
                res.send({ 
                    success: 0,
                    message: 'Invalid username or password'
                });
            }else{

                //Store token in database
                let updateQuery = 'UPDATE user SET token = ? WHERE id = ?';

                let payload = {
                    id: results[0].id,
                    name: results[0].name,
                    email: results[0].email,
                    username: results[0].username,
                    role: 'Admin'
                }

        		let token = jwt.sign(payload, req.app.get('Secret'), {
                	//expiresIn: 1440 // expires in 24 hours
    			});

                console.log(results[0]);
            	let user_id = results[0].id;

            	global.connection.query(updateQuery, [token, user_id], function (error, results, fields) {
                    if (error){
                        res.send({ 
                            success: 0,
                            message: 'Mysql Server Error'
                        });
                    }else{
        	            res.send({
        	                success: 1,
        	                data: {token: token}
        	            });
                    }
    	            
    		        // global.connection.end();
            	});
            }
        }
    });
};

auth.validator = function(method){

    switch (method){
        case 'login': {
            return [
                check(['username', 'password']).not().isEmpty().withMessage('is required.'),
            ]
        }
    }
};


module.exports = auth;
