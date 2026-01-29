import { User } from "../model/user.model.js"

const registerUser = async(req, res) => {
    try {
        const { username, email, password } = req.body;
            //basic validation 
        if(!username || !email || !password){
            return res.status(400).json({Message:"All fields are required"})
        }

            // If already signed up 
            const existing = await User.findOne({ email:email.toLowerCase()})
            if(existing){
                return res.status(400).json({Message: "User Already exists"})
            }
            const user = await User.create({
                username,
                email:email.toLowerCase(),
                password,
                loggedIn: false
            });
            
            res.status(400).json({Message:"user registered",
                user: { id:user.id, email: user.email, username: user.username}})
    } catch (error) {
        res.status(500).json({Message: "Internal Server Error", error:error.message});
    }
}
export {
    registerUser
};