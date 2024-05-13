var express = require("express");
var router = express.Router();
const { createSQLQuery } = require("sql-ai-query-generator");

router.post("/", async function (req, res, next) {
  try {
    const { API_KEY, ENGINE, QUERY } = req.body.data;
    console.log(`Query`, QUERY);
    if (typeof QUERY !== "string" || QUERY.trim() === "")
      return res.status(500).send({ error: "Please provide a valid Input " });
    const query = await createSQLQuery(API_KEY, ENGINE, QUERY);
    res.status(200).send({ message: query });
  } catch (error) {
    const [status, message] = error?.message?.split(/(?<=\d{3})\s/);
    res
      .status(status || 500)
      .send({ Error: message || "something went wrong!" });
  }
});

module.exports = router;
