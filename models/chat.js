const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const ChatSchema = new Schema({
    message: {
        type: String , 
        required: true, 
    } , 
    name:{
        type: String , 
        required: true, 
    },
    userId:{
        type:String,
        required: true, 
    },
    groupId:{
        type:String,
        required: true, 
    },
   
});


module.exports = mongoose.model('Chat' , ChatSchema);