import 'dotenv/config'
import express,{json} from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Database connection
import ConnectDB from "./database/connection.js"

const morsys = express();
morsys.use(cors());
morsys.use(json());
morsys.use(helmet());

const mongoDB = process.env.MONGO_URL;

// API
import User from "./API/user.js"
import Auth from "./API/auth.js"
morsys.use("/user", User);
morsys.use("/auth", Auth);


morsys.get("/", (req, res) => {
    return res.json({"WELCOME": `to my Backend Software for the Morsys`});
});

const PORT = process.env.PORT || 4000;


morsys.listen(PORT, () => {
    ConnectDB().then(() => {
        console.log("Server is running")
    })
    .catch(() => {
        console.log("Server is running but connect not established")
    })
})

