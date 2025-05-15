// module.exports = (role) => (req, res, next) => {
//   if (req.user.role !== role) {
//     return res.status(403).json({ error: 'Access denied' });
//   }
//   next();
// };// middleware/roleMiddleware.js
module.exports = function(role) {
  return function(req, res, next) {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
};
