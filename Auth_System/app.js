import express from "express";
import 'dotenv/config.js';
import userRoutes from "./routes/UserRoutes.js";
import cors from "cors";                                                                                       

const app = express();

let corsOptions = {
    origin: process.env.ORIGIN
}

//*miiddleware
app.use(express.json());
app.use(cors(corsOptions));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

try {
    app.listen(process.env.PORT || 3000, () => {     
        console.log(`Listening to port ${process.env.PORT || 3000}...`);
    });
} catch (e) {
    console.log(e);
}

app.use('/user', userRoutes);

export default userRoutes;

