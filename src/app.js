import express from "express";
import morgan from "morgan";
import authRouthes from './routes/auth.routes.js'
import userRouthes from './routes/accounts.routes.js'
import ticketsRouthes from './routes/tickets.routes.js'
import departamentsRouthes from './routes/departament.routes.js'
import { createRoles } from "./libs/initialRoles.js";
import cookieParser from "cookie-parser";

const app = express();
createRoles();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser())

app.use('/api/auth', authRouthes);
app.use('/api/users', userRouthes);
app.use('/api/tickets', ticketsRouthes);
app.use('/api/departments', departamentsRouthes);

export default app
 