import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({
      message: "Token não informado",
    });
  }

  const parts = auth.split(" ");
  const correct = parts[1];

  try {
    const decoded = jwt.verify(correct, "senha");

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido",
    });
  }
}

export { authMiddleware };
