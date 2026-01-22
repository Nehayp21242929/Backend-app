import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.static("public"))
app.use(cookieparser())

//routes import
app.use((req, res, next) => {
  console.log("👉 Incoming Content-Type:", req.headers["content-type"]);
  next();
});

import userRouter from './routes/user.routes.js'

// app.use(express.json({limit : "1600kb"}))
// app.use(express.urlencoded({extended : true, limit : "1600kb"}))



//routes declaration
app.use("/api/v1/users", userRouter)

export { app };