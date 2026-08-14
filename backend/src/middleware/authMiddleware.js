import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  const parts = auth.split(" ");
  const correct = parts[1];

  const decoded = jwt.verify(correct, "senha");
  req.user = decoded;
  next();

  try {
    const decoded = jwt.verify(correct, "senha");

    jwt.verify(auth);
  } catch (error) {
    return res.status(401).json({ message: "Token não informado" });
  }
}
