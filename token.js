const jwt = require("jsonwebtoken");
const auth_sec = "DE_PROJECT-PORTABLE-VOTING-SYSTEM-@MALAY";
const GenToken = (payload, does_expire = false, days = 1) => {
    if (does_expire == false) {
        return jwt.sign(payload, auth_sec);
    } else {
        return jwt.sign(payload, auth_sec, {
            expiresIn: `${days} days`,
        });
    }
};
const VerifyToken = (token) => {
    try {
        return {
            success: true,
            data: jwt.verify(token, auth_sec),
        };
    } catch (err) {
        return { success: false, msg: err };
    }
};

module.exports = { GenToken, VerifyToken };
