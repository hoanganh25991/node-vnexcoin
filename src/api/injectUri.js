export const injectReqUri = (req, res, next) => {
  process.reqRoot = req.protocol + "://" + req.get("host")
  next()
}
