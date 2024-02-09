import { model, Schema } from "mongoose";

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
    role:{
        ref: "Role",
        type: Schema.Types.ObjectId,
        required: true
    },
    department: {
        ref: "Departament",
        type: Schema.Types.ObjectId,
        required: true
    },
    tickets: [{
        ref: "Ticket",
        type: Schema.Types.ObjectId
    }]
},{
    versionKey: false,
});

export default model('User', userSchema)