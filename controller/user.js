import { User } from "../models/user.js";


// export const register = async (req, res) => {
//   try {
//     const { username, email, profilePic, token } = req.body;

//     // Find or create the user based on the email
//     const existingUser = await User.findOneAndUpdate(
//       { email },
//       { $setOnInsert: { username, email, profilePic } }, // Set fields on insert
//       { upsert: true, new: true }
//     );

//     // Respond with success message and user data
//     res.status(201).json({
//       message: 'User registered successfully',
//       user: {
//         email: existingUser.email,
//         username: existingUser.username,
//         profilePic: existingUser.profilePic,
//         // Add other fields as needed
//       },
//     });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
export const register = async (req, res) => {
  try {
    const { username, email, profilePic, token } = req.body;

    // Find the user based on the email
    let existingUser = await User.findOne({ email });

    if (!existingUser) {
      // If user does not exist, create a new user with initial values
      existingUser = await User.create({
        username,
        email,
        profilePic,
        tokens_available: 3, // Initial value for tokens_available
        tokens_used: 0, // Initial value for tokens_used
        is_premium: false // Initial value for is_premium
      });
    }

    // Respond with success message and user data
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        email: existingUser.email,
        username: existingUser.username,
        profilePic: existingUser.profilePic,
        tokens_available: existingUser.tokens_available,
        tokens_used: existingUser.tokens_used,
        is_premium: existingUser.is_premium,
        // Add other fields as needed
      },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};