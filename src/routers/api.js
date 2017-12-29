import express from "express"
import { api } from "../api/index"

const router = express.Router()
const _ = console.log

router.post("", (req, res) => {
  const { resData, statusCode, tasks } = api(req.body)
  res.status(statusCode)
  res.json(resData)
  Promise.all(tasks)
    .then(() => _("[tasks] All tasks done"))
    .catch(err => _("[tasks][ERR]", err))
})

export const apiRoute = router
