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
                return res.status(200).json({Message: "User Already exists"})
            }
            const user = await User.create({
                username,
                email:email.toLowerCase(),
                password,
                loggedIn: false
            });
            
            res.status(200).json({Message:"user registered",
                user: { id:user.id, email: user.email, username: user.username}})
    } catch (error) {
        res.status(500).json({Message: "Internal Server Error", error:error.message});
    }
}

const  loginUser = async(req, res) => {
    try {
         const {email, password} = req.body;

         const user = await User.findOne({
            email:email.toLowerCase()
         });

         if(!user) return res.status(400).json({
            message:"User doesn't Exist"
         })

          const isMatch =  await user.comparePassword(password);
          if(!isMatch)
            return res.status(400).json({
                message:"Invalid password"
            })
            
            res.status(200).json({message:"User loggedin",
                user:{
                    id:user._id,
                    email:user.email,
                    username:user.username
                }
            })

    } catch (error) {
        res.status(500).json({
            message:"Internal server Error"
        })
    }
}

const logoutUser = async(req, res) =>{
    try {
        const { email } = req.body;

        const user = await User.findOne({
            email
        });

        if(!user) return res.status(404).json({ 
            message: "User not found"
        });

        return res.status(200).json({
            message: "Successfully logged out"
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error",
            error:error
        });
    }
}
export {
    registerUser, loginUser, logoutUser
};