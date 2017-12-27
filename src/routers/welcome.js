import express from "express"

const router = express.Router()
const _ = console.log

router.get("", async (req, res) => {
  res.send("Welcome")
})

export const welcomeRoute = router
