function monMiddleWare(req, res, next) {
  const auth = req.headers.authorization;
  console.log(auth.split(" "));
  if (auth.split(" ")[1] === "mdp") {
    next();
    return;
  }
  res.sendStatus(403);
}

export default monMiddleWare;
