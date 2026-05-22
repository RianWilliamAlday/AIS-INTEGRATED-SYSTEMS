import express from "express";
import 'dotenv/config.js';
import studentRoutes from "./routes/studentRoutes.js";

const app = express();

let corsOptions = {
    origin: process.env.ORIGIN
}

//*miiddleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

try {
    app.listen(process.env.PORT || 5000, () => {     
        console.log(`Listening to port ${process.env.PORT || 5000}...`);
    });
} catch (e) {
    console.log(e);
}

app.use('/student-portal', studentRoutes);

export default studentRoutes;