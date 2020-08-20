const jwt = require("jsonwebtoken");
const config = require("../config");
const secret = config.jwt.secret;
const error = require("../utils/error");
//sign JWT
function sign(data) {
  return jwt.sign({ data }, secret);
}

function verify(token) {
  return jwt.verify(token, secret);
}

function getToken(auth) {
  if (!auth) {
    throw new Error("Token is empty");
  }

  if (auth.indexOf("Bearer ") === -1) {
    throw new Error("Invalid Format");
  }

  let token = auth.replace("Bearer ", "");

  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;
  return decoded;
}
const check = {
  own: function (req, owner) {
    console.log(owner)
    const decoded = decodeHeader(req);
    console.log('decoded',decoded);
    if (decoded.data.clpa_clientid !== owner) {
      throw error("You can not do this", 401);
    }
  },
};
module.exports = {
  sign,
  check,
};
