import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; 

const videoSchema = Schema({
    videoFile : {
        type : String,
         required : [true, "videoFile is required .."]
    },
    thumbnail : {
        type : String,
         required : [true, "thumbnail is required .."]
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    title : {
        type : String,
        trim : String,
        required : [true, "title is required .."]
    },
    description : {
        type : String,
        trim : String,
         required : [true, "description required .."]
    },
    duration : {
        type : Number,
    },
    views : {
        type : Number,
        default : 0
    },
    isPublished : {
        type : Boolean,
        default : true
    }
}, {timestamps : true});

videoSchema.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model("Video", videoSchema);
