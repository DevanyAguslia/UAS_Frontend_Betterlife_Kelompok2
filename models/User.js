import mongoose from 'mongoose';

// Define a schema for the User model
const userSchema = new mongoose.Schema({
    // username: The unique name chosen by the user for identification
    username: { type: String, required: true },

    // email: The user's email address, must be unique for each user
    email: { type: String, required: true, unique: true },

    // password: The password the user sets for secure authentication
    password: { type: String, required: true },

    // created: The timestamp when the user account was created. Defaults to the current date and time
    created: { type: Date, default: Date.now }
});

// Export the User model, so it can be used to interact with the users collection in the database
export default mongoose.model('Users', userSchema);