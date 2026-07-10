import mongoose from "mongoose";

const uri = "mongodb+srv://Renukaparmar:YOUR_PASSWORD@cluster0.rq5kkcs.mongodb.net/Renuka?retryWrites=true&w=majority&appName=Cluster0";

mongoose
    .connect(uri)
    .then(() => {
        console.log("✅ Connected");
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });