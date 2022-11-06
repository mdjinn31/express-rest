const jwt = require('jsonwebtoken');

const getJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = {uid};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
                        expiresIn: '3h'
                    },
                    (error, token) => {
                       if(error){
                            console.log(error);
                            reject("There was an error trying to generate the token");
                       }else{
                            resolve(token);
                       }
                    }
                );
    });
}

module.exports = {
    getJWT
}