import { verify } from "jsonwebtoken";

function checkAuth(req, res, next) {
  const authToken = req.cookies.authToken;

  // Check if authToken is present
  if (!authToken) {
    return res.status(401).json({
      message: "Authentication failed: No authToken provided",
      ok: false,
    });
  }

  // Verify the authToken
  verify(authToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      // Auth token is invalid
      return res.status(401).json({
        message: "Authentication failed: Invalid authToken",
        ok: false,
      });
    } else {
      // Auth token is valid, set the userId in the request object and continue
      req.userId = decoded.userId;
      req.ok = true;
      next();
    }
  });
}

export default checkAuth;
