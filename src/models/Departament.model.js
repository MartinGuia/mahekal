import { model, Schema } from "mongoose";

const departamentSchema = new Schema({
    name: {
        type: String, 
        required: true
    }
})

export default model('Department', departamentSchema);