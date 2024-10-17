import Express, { Request, Response, Express as ExpressServer } from "express";
import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://sunny:sunny@firstcluster.gxsun.mongodb.net/book-management?retryWrites=true&w=majority&appName=FirstCluster"
).then(res => {
    console.log(res);
}).catch;

const app: ExpressServer = Express();

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log("Server running at port:", 3000);
});
