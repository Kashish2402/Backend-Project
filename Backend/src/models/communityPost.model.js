import mongoose, { Schema } from "mongoose";

const communityPostSchema=new Schema(
    {
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },

        content:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

export const communityPost=mongoose.model("CommunityPost",communityPostSchema)