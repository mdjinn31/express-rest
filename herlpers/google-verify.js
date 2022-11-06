
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async( token = '' )  => {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  
  });
  const { email, name, picture } = ticket.getPayload();
  return { 
            name, 
            email, 
            img: picture,
            password: 'abc123def456',
            role: 'USER_ROLE',
            google: true
         };
}

module.exports = {
    googleVerify
}