const {Schema, model} = require('../connection');

const feedbackSchema = new Schema({
    name: String,
    email: {type:String, required:true,unique:true},
    subject:{type:String,required:true},
    feedback:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
});




module.exports = model('contact',feedbackSchema);
