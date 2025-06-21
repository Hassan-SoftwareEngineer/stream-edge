import mongoose, {Schema} from "mongoose";

const userSchema = Schema({
    username : {
        type : String,
        required : [true, "username is required .."],
        unique : true,
        lowercase : true,
        trim : true,
        index
    },
    fullName : {
        type : String,
        required : [true, "fullName is required .."],
        trim : true,
        index : true
    },
    email : {
        type : String,
        required : [true, "email is required .. .."],
        unique : true,
        lowercase : true,
        trim : true
    },
    avatar : {
        type : String,
        required : [true, "avatar is required .."]
    },
    coverImage : {
        type : String
    },
    password : {
        type : String,
        required : [true, "password is required .."],
        trim : true
    },
    refreshToken : {
        type : String,
        trim : true
    },
    watchHistory : [
        {
        type : Schema.Types.ObjectId,
        ref : "Video"
    }
]
}, {timestamps : true});

export const User = mongoose.model("User", userSchema);
