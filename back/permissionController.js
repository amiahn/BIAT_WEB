const jwt = require('jsonwebtoken') ;

function checkRole(permissions) {

    return async (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
        
            return res.sendStatus(401);
        }
    
    

            await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(401);
            }
            
          
            const userRole = user.Role;
            if (permissions.includes(userRole)) {
                next()
            } else {
                return res.status(401).json("you dont have permession");
            }
            });
    }

}; 


module.exports = {checkRole} 
