import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; //if less than 500 then it is our own else if greater that 500 then google auth token
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData ? decodedData.id : null;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData ? decodedData.sub : null;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
