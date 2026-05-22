import express from "express";
import 'dotenv/config.js';
import authRoutes from "./routes/authRoute.js";                                                                                

const app = express();

let corsOptions = {
    origin: process.env.ORIGIN
}

//*miiddleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

try {
    app.listen(process.env.PORT || 4000, () => {     
        console.log(`Listening to port ${process.env.PORT || 4000}...`);
    });
} catch (e) {
    console.log(e);
}

app.use('/auth', authRoutes);

export default authRoutes;

