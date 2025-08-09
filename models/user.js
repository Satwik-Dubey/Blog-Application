const { Schema, model } = require('mongoose');
const { createHmac, randomBytes } = require('node:crypto')
const userSchema=new Schema(
    {
        fullName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        salt:{
            type:String
        },
        password:{
            type:String,
            required:true,
        },
        profileImageUrl:{
            type:String,
            default:'/images/profile.jpg',
        },
        roles:{
            type:String,
            enum:["USER","ADMIN"],
            default:"USER"
        },

    },
    {timestamps:true}
);

// using pre middleware of mongoose
// for encryptin gpassword
// Pre-save middleware to hash password before saving the user document
userSchema.pre('save', function() {
    const user = this; // Reference to the current user document

    // Only run this function if password is modified (or new)
    if (!user.isModified("password")) return;

    // Generate a random salt (a string used for hashing)
    const salt = randomBytes(16).toString();

    // Hash the password using HMAC with SHA-256 and the generated salt
    const hashedPassword = createHmac('sha256', salt)
        .update(user.password) // Use the current password
        .digest("hex");        // Get the hashed password as a hex string

    // Store the salt in the user document
    this.salt = salt;

    // Replace the plain password with the hashed password
    this.password = hashedPassword;
});

//making function
userSchema.static('matchPassword',async function(email,password){
    const user =await this.findOne({email});
    if(!user) throw new Error('User not found !');

    console.log(user);
    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvideHash = createHmac("sha256",salt)
    .update(password)
    .digest("hex")

    if(hashedPassword !== userProvideHash){
        throw new Error("Incorrect Password!");
    }
    return user; 

})



const User= model("user",userSchema);

module.exports=User;

//  use crypto for hashing a password