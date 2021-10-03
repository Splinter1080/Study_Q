const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const GroupSchema = new Schema({
    name: {
        type: String , 
        required: true, 
    } , 
    tasks:{
        type:Array,
    },
    deadline:{
        type:String
    },
    points:{
        type:Number
    },
    userId:{
        type:String
    },
    createdBy:{
        type:String
    }
});


module.exports = mongoose.model('Group' , GroupSchema);