const express = require("express");
const router = new express.Router();
const axios = require("axios"); // Don't forget to import axios
const ExpressError = require("../expressError");
const names = require("../fakeDB");

// GET request to /base that sends a JSON result with names array
router.get("/", function (req, res) {
  res.json({ names });
});

// POST request to /base that retrieves information from GitHub for developers
router.post("/", async function (req, res, next) {
  try {
    const results = await Promise.all(
      req.body.developers.map(async (d) => {
        const response = await axios.get(`https://api.github.com/users/${d}`);
        return {
          name: response.data.name,
          bio: response.data.bio,
        };
      })
    );

    res.json(results);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
