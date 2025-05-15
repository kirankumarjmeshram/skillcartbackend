const User = require('../models/User');

const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(req.user);
  } catch (error) {
    console.error('Error in getMe:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getMe,
};



// const User = require('../models/User');

// // Controller to get logged-in user's info
// const getMe = async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const user = await User.findById(req.user._id).select('-password');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error('Error in getMe:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = {
//   getMe,
// };
