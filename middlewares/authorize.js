const jwt = require('jsonwebtoken');
const authorized = (req, res, next) => {
  if(!req.headers.authorization){
    return res.status(401).send({error:'Unauthorized'})
  }
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { firstName, userId } = decoded;
    req.firstName = firstName;
    req.userId = userId;
    next();
  } catch {
    next('Authentication  failure');
  }
};
module.exports = authorized;
