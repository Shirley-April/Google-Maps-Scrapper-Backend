import express from "express"
const app = express();

import { scrapeGoogleMaps } from "./scrapper.js";

app.get("/", async (request, response) => {
  try {
    const results = await scrapeGoogleMaps();
    response.send(results);
  } catch {
    response.send({ message: "An error occured" });
  }
});

app.listen(3005, function () {
  console.log("The server has started on port 3005");
});
