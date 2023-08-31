const express = require("express");
const app = express();

app.get("/", function(request, response) {
  return response.send("Hello World!");
});


app.listen(3005, function() {
  console.log(
    "The server has started on port 3005"
  );
});