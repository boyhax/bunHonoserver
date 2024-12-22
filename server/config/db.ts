import * as mongoose from "mongoose";

const connectDB = async () => {
  try {
    const PROD = process.env.NODE_ENV == "production";
    console.log("prod :>> ", PROD);
    if (process.env.MONGO_URI !== undefined) {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        autoIndex: true,
        dbName: PROD ? "default" : "sample_mflix",
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);

      return conn;
    } else {
      console.error(`Error: cant find env MONGO_URI`);
      process.exit(1);
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
