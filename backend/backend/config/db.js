const mongoose = require("mongoose");

const connectDB = async () => {
  const options = {
    autoIndex: false,
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };
  try {
    const conn = await mongoose
      .connect(process.env.MONGO_URI, options)
      .then(() => {
        console.log("Connection was Successful.");
      })
      .catch((err) => {
        console.log("Connection error:", err.message);
        console.log("Reconecting...");
        setTimeout(connectDB, 5000);
      });
    console.log('MongoDB Connected'.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
  console.log("Trying to reconnect");

  setTimeout(connectDB, 3000);
});

module.exports = connectDB;
