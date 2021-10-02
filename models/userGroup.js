const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const UserGroupSchema = new Schema({
    userId: {
        type: String , 
        required: true, 
    } , 
    groupId:{
        type:String,
        required: true, 
    },
    group:{
        type:Object
    },
    tasks:{
      type: Array
    },
    points:{
        type:Number
    },
    unread:{
        type:Number
    }
   
});


module.exports = mongoose.model('UserGroup' , UserGroupSchema);