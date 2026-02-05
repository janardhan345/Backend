import mongoose, {Schema} from "mongoose";

const postSchema = new Schema(
    {
        name: {
            type:String,
            required:true,
            trim:true
        },
        description: {
            type:String,
            required:true,
            trim:true
        },
        age:{
            type:Number,
            required:true,
            min:1,
            max:85
        }

    },
    {
        timestamp:true
    }
)

export const post = mongoose.model('post', postSchema);
