import { User } from "../models/user.js";


export const register = async (req, res) => {
  try {
    const { username, email, profilePic, token } = req.body;

    // Find or create the user based on the email
    const existingUser = await User.findOneAndUpdate(
      { email },
      { $setOnInsert: { username, email, profilePic } }, // Set fields on insert
      { upsert: true, new: true }
    );

    // Respond with success message and user data
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        email: existingUser.email,
        username: existingUser.username,
        profilePic: existingUser.profilePic,
        // Add other fields as needed
      },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// export const register = async (req, res) => {
//     try {
//         const { username, email, profilePic, token } = req.body;
    
//         const existingUser = await User.findOneAndUpdate(
//             { email },
//             { $setOnInsert: { username, email, profilePic } }, // Set fields on insert
//             { upsert: true, new: true }
//           );
      
//           // Respond with success message or user data as needed
//           res.status(201).json({
//             message: 'User registered successfully',
//             user: {
//               email: existingUser.email,
//               username: existingUser.username,
//               profilePic: existingUser.profilePic,
//               // Add other fields as needed
//             },
//           });
//         // Respond with success message or user data as needed
//         res.status(201).json({ message: 'User registered successfully' });
//       } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ message: 'Internal server error' });
//       }
//   };