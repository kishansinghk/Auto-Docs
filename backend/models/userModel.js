const {Schema, model} = require('../connection');

const userSchema = new Schema({
    name:{type:String,},
    email: {type:String, required:true,unique:true},
    password:{type:String,required:true},
    city:{type:String, default: 'No city'},
    createdAt:{type:Date,default:Date.now},                                                                         

});




module.exports = model('users',userSchema);

