const router = require("express").Router();

const Country = require("../models/Country");
const User = require("../models/User");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

/* =========================
   GET ALL COUNTRIES
   Auth required — no vote counts exposed
========================= */
router.get("/countries", auth, async (req, res) => {
  const countries = await Country.find({}, "name _id");
  res.json(countries);
});

/* =========================
   GET CURRENT USER'S VOTES
========================= */
router.get("/my-votes", auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate("votes", "name _id");
  res.json(user.votes);
});

/* =========================
   VOTE (MAX 3)
========================= */
router.post("/vote/:countryId", auth, async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user.votes.length >= 3) {
    return res.status(400).json({ message: "Maximum votes reached" });
  }

  if (user.votes.some(v => v.toString() === req.params.countryId)) {
    return res.status(400).json({ message: "Already voted for this country" });
  }

  const country = await Country.findById(req.params.countryId);

  if (!country) {
    return res.status(404).json({ message: "Country not found" });
  }

  country.votes++;
  await country.save();

  user.votes.push(req.params.countryId);
  await user.save();

  res.json({ message: "Vote successful" });
});

/* =========================
   LEADERBOARD — auth required
========================= */
router.get("/leaderboard", auth, async (req, res) => {
  const top = await Country.find({}, "name _id votes")
    .sort({ votes: -1 })
    .limit(3);
  res.json(top);
});

/* =========================
   ADMIN — FULL RESULTS
========================= */
router.get("/admin/results", admin, async (req, res) => {
  const results = await Country.find()
    .sort({ votes: -1 });
  res.json(results);
});

/* =========================
   ADMIN — ALL USERS & VOTES
========================= */
router.get("/admin/users", admin, async (req, res) => {
  const users = await User.find({}, "username votes role createdAt")
    .populate("votes", "name");
  res.json(users);
});

/* =========================
   ADMIN — RESET ALL VOTES
========================= */
router.post("/admin/reset", admin, async (req, res) => {
  await Country.updateMany({}, { votes: 0 });
  await User.updateMany({}, { votes: [] });
  res.json({ message: "All votes reset successfully" });
});

module.exports = router;