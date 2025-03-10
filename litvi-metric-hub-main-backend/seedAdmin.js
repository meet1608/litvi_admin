import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js"; // Ensure the correct path

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
}).then(async () => {
  console.log("MongoDB Connected");

  // Insert admin credentials
  await Admin.create({ email: "litvi@gmail.com", password: "Litvi@123" });

  console.log("Admin created successfully");
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
