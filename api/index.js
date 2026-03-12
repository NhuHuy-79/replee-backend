import express from "express";
import serverless from "serverless-http";
import app from "./app.js";

app.post("/send", async (req, res) => {
  res.json({ message: "Push sent from Vercel" });
});

export default serverless(app);