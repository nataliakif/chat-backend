const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 5001 } = process.env;

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Database connection successful on ${PORT}`)
    )
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// require("dotenv").config();

// const mongoose = require("mongoose");
// const app = require("./app");

// const { DB_HOST, PORT = 5001 } = process.env;

// mongoose.set("strictQuery", true);

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     console.log("Database connection successful");
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error(" Database connection error:", error.message);
//     process.exit(1);
//   });
