import app from "./app.js";
import { connectDB } from "./db.js";
import 'dotenv/config'
import bodyParser from "body-parser";


connectDB();



app.listen(process.env.PORT);    
console.log(`Server listening on port ${process.env.PORT}`);