export function auth(req, res, next) {
    const auth = req.headers.authorization;
    console.log(auth);
  
    if (auth === "user") {
      next();
      return;
    }
    res.sendStatus(403);
  }
  