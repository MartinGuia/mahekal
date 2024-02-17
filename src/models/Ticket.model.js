import { model, Schema } from "mongoose";

const ticketSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    date:[{
        type: Date,
        // type: String,
        required: true,
    }],
    title: {
        type: String,
        required: true,
    },
    priority:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    assignedDepartment:{
        ref: "Department",
        type: Schema.Types.ObjectId,
        required: true,
    },
    assignedTo:[{
        ref: "User",
        type: Schema.Types.ObjectId,
    }],
    ejecutionTime:{
        type: Number,
        // required: true,
    },
    roomOrArea:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    imageURL:{
        type: String,
        required: false,
    },
},{
    timestamps: false,
    versionKey: false,
})

export default model('Ticket', ticketSchema);