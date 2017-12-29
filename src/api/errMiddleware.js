/**
 * Handle ERR
 * @warn PLease dont remove "next" in callback
 * express count argv's length
 * to provide req or res or next
 * @param err
 * @param req
 * @param res
 * @param next
 */
export const errMiddleWare = (err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500)
  res.send("ERR")
}
