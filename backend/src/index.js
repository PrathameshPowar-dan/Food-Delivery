import { app } from "./app.js";
import dotenv from "dotenv";
import ConnectDB from "./database/index.js";

dotenv.config();

ConnectDB()
.then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((err) => console.error("Connection error:",err));

app.get("/", (req, res) => {
    res.send("Hello World");
});
