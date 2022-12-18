const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
require("colors");
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

const uri =
  "mongodb+srv://lonefy:HN3fdeNvNEtBUwMx@cluster0.4mqdriq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function dbConnect() {
  try {
    await client.connect();
    console.log("Database Connected ".bgMagenta);
  } catch (error) {
    console.log(error.message.bgRed);
  }
}
dbConnect();

const LoanInformation = client.db("lonefy").collection("loadDetails");
app.post("/load-details", async (req, res) => {
  const details = req.body;
  const result = await LoanInformation.insertOne(details);
  res.send({ success: true });
});
