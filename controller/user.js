import { User } from "../models/user.js";


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
        daily_tokens_available: 3, // Initial value for tokens_available
        purchased_tokens_available: 0,
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
        daily_tokens_available: existingUser.daily_tokens_available,
        purchased_tokens_available: existingUser.purchased_tokens_available,
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

// Function to use one token for a user
export const useToken = async (req) => { // Removed 'res' parameter
  try {
    const { email } = req.body;

    // Find the user based on the email
    const user = await User.findOne({ email });

    if (!user) {
      return { error: 'User not found' }; // Return an error object instead of sending a response
    }

    // Check if the user has any tokens available
    if (user.daily_tokens_available <= 0) {
      return { error: 'No tokens available please update your package to use more' }; // Return an error object instead of sending a response
    }

    // Update the user's token counts
    // user.daily_tokens_available -= 1;
    if(user.daily_tokens_available <=0 && user.purchased_tokens_available > 0){
      user.purchased_tokens_available--;
    }

    if(user.daily_tokens_available > 0 ){
      user.daily_tokens_available--;
    }

    

    user.tokens_used += 1;
    await user.save();

    console.log("token used successfully");

    // Return the updated user object
    return {
      user: {
        email: user.email,
        daily_tokens_available: user.daily_tokens_available,
        purchased_tokens_available: user.purchased_tokens_available,
        tokens_used: user.tokens_used,
      },
    };
  } catch (error) {
    console.error('Error using token:', error);
    return { error: 'Internal server error : user can not be updated' }; // Return an error object instead of sending a response
  }
};

