import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

userSchema.pre("save", async function (next) {
    if (! this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id : this._id,
        username : this.username,
        fullName : this.fullName,
        email : this.email
    }, process.env.ACCESS_TOKEN_SECRET, 
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
);
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id : this._id
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    });
}

export const User = mongoose.model("User", userSchema);
