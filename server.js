const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

const certificates = {
  "c9ef02abad1c7212": {
    name: "Gagan Deep S",
    course: "Web Development | Back End with Node.js",
    file: "certificate_c9ef02abad1c7212_24251421bf4dfda509b4ade797f17260.pdf"
  }
};

app.get("/verify/:id", (req, res) => {
  const cert = certificates[req.params.id];
  if (!cert) return res.status(404).send("Invalid Certificate");

  const filePath = path.join(__dirname, "certificates", cert.file);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `inline; filename="${cert.file}"`
  );

  fs.createReadStream(filePath).pipe(res);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
