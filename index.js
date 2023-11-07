import express from "express";
import cors from "cors";

const app = express();

import { scrapeGoogleMaps } from "./scrapper.js";

app.use(cors());

app.get("/", async (request, response) => {
  const search = request.query.search;
  try {
    const results = await scrapeGoogleMaps(search);
    response.send(results);
  } catch {
    response.send({ message: "An error occured" });
  }
});

app.listen(3005, function () {
  console.log("The server has started on port 3005");
});
