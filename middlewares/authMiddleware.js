const authMiddleware = {
    addUserToLocals: (req, res, next) => {
      res.locals.user = req.user;
      next();
    }
  };
  
  module.exports = authMiddleware;