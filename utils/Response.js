const response = (res, success = false, msg = "Default Failure", data = {}) => {
    return res.json({ success, msg, data });
};

module.exports = response;
