import { model, Schema } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,    
    },
    password:{
        type: String,
        min: 8,
        required: true,    
    },
    role:[{
        // type: String,
        ref: "Role",
        type: Schema.Types.ObjectId,
        required: true
    }],
    departament: [{
        type: String,
        required: true
        // ref: "Departament",
        // type: Schema.Types.ObjectId,
        // required: true
    }],
    tickets: [{
        ref: "Ticket",
        type: Schema.Types.ObjectId
    }]
},{
    versionKey: false,
});

// userSchema.statics.encryptPassword = async (password) => {
//     const salt = await bcryptjs.genSalt(10);
//     return await bcryptjs.hash(password, salt)
// };

// userSchema.statics.comparePassword = async (password, receivedPassword) => {
//     return await bcryptjs.compare(password, receivedPassword)
// };

export default model('User', userSchema)