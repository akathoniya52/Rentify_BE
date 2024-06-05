import express from "express";
import bodyParser from "body-parser";

import cors from "cors";
import router from './routes/index';

const app = express();
const PORT = process.env.PORT || 8000;
 
app.use(express.json())
app.use(bodyParser.json());
app.use(cors({ origin: "*", credentials: true }));

// Routes
app.get("/",(req,res)=>{
  res.json("routes working")
})

app.use('/',router)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
