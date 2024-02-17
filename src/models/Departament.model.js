import { model, Schema } from "mongoose";

const departamentSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    colaborators:[{
        ref: "User",
        type: Schema.Types.ObjectId,
    }],
    ticketsDepartment:[{
        ref: "Ticket",
        type: Schema.Types.ObjectId,
    }]
},{
    versionKey: false
})

export default model('Department', departamentSchema);