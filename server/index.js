import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/post.js";
import userRoutes from './routes/user.js'
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 8000;
app.use('/posts',postRoutes);
app.use('/users',userRoutes)


app.get('/',(req,res)=>{
  res.send('Hello to your Moments API');
})

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, function (err) {
      console.log("server is running at port ", PORT);
    })
  )
  .catch((error) => console.log("error port ", error));

mongoose.set("useFindAndModify", false);
