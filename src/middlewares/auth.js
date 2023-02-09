import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    /**@type {String} */
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }
    if (token.startsWith("Bearer ")) {
      token = token.split(/ /g)[1];
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.log("🚀 ~ file: auth.js:7 ~ verifyToken ~ error", error);
    res.status(500).json({ error: error.message });
  }
};
