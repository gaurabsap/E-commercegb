const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (res, rep) => {
  rep.send("hello");
});

app.post("/", (req, rep) => {
  console.log(req.body);
  return;
});

app.listen(3000, () => {
  console.log("server is runinng...");
});
