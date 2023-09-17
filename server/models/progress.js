const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
require('dotenv').config();


const progressSchema = mongoose.Schema({
    exercise:{
        type:String,
        maxLength:100,
        required:[true,'You need a title']
    },
    results:{
        type:String,
        required:[true,'For each line, input Weight and Number of Reps']
    },
    status:{
        type:String,
        required:true,
        enum:['draft','public'],
        default:'draft',
        index:true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

progressSchema.plugin(aggregatePaginate)

const Progress = mongoose.model('Progress', progressSchema);
module.exports = { Progress };