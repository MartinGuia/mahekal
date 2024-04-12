import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/accounts.routes.js";
import ticketsRoutes from "./routes/tickets.routes.js";
import departamentsRoutes from "./routes/departament.routes.js";
import { createRoles } from "./libs/initialRoles.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { checkTicketExpired } from "./middlewares/checkTicketExpired.js";
import rolesRoutes from "./routes/roles.routes.js";

const app = express();
createRoles();
app.use(cors({
    origin: 'http://localhost:3000',
    //*Es para establecer las credenciales
    credentials:true
}))

// checkTicketExpired();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use("/api/departments", departamentsRoutes);
app.use("/api/roles", rolesRoutes);

export default app;