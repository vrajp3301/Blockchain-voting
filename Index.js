// Importing the requirements.
const express = require("express");
const db = require("./db");
const Blockchain = require("./Blockchain");
const { GenToken, VerifyToken } = require("./token");
const path = require("path");
var ip = require("ip");
// Defining the constants.
const app = express();
const Route = express.Router();
const blockchain = new Blockchain();
const db_auth = "vote_auth";
const db_block = "vote_block";
const db_candidate = "vote_candidate";
// Configuring the app.
app.use(express.static("public"));
app.use(express.urlencoded({ extended: !0 }));
app.use(express.json());
app.use("/public", express.static("public"));

// Configuring the routes
Route.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});
Route.post("/vote", (req, res) => {
    var token = VerifyToken(req.headers.token);
    if (token.success == true) {
        var btoken = VerifyToken(req.body.token);
        if (btoken.success == true) {
            if (
                btoken.data._id == token.data._id &&
                btoken.data.aadhar == token.data.aadhar &&
                btoken.data.v_id == token.data.v_id
            ) {
                if (blockchain.exists(token.data.v_id)) {
                    res.json({ success: false, msg: "You have already voted" });
                } else {
                    req.body["v_id"] = btoken.data.v_id;
                    var resp = blockchain.newBlock(Date.now(), req.body);
                    if (resp == true) {
                        var lb = blockchain.lastBlock();
                        var query = {
                            index: lb.index,
                            timestamp: lb.timestamp,
                            data: lb.data,
                            prevHash: lb.prevHash,
                            hash: lb.hash,
                        };
                        db.getDB()
                            .collection(db_block)
                            .insertOne(query, (err, result) => {
                                if (err) throw err;
                                res.json({
                                    success: true,
                                    msg: "Your vote has been casted",
                                });
                            });
                    } else {
                        res.json({
                            success: false,
                            msg: "Unable to cast your vote! Try again",
                        });
                    }
                }
            } else {
                res.json({ success: false, msg: "Token MisMatched" });
            }
        } else {
            res.json({ success: false, msg: "Token ERR" });
        }
    } else {
        res.json({ success: false, msg: "session-expired. Login again" });
    }
});
Route.get("/valid_chain", (req, res) => {
    var isVaild = blockchain.isValidChain();
    res.json({ isValid: isVaild, lastHash: blockchain.lastBlock().hash });
});
Route.post("/login", (req, res) => {
    var aadhar = req.body.aadhar;
    var v_id = req.body.v_id;
    var bday = req.body.bday;
    if (!aadhar || !v_id || !bday) {
        res.json({
            success: false,
            msg: "Missing Fields!",
        });
    } else {
        db.getDB()
            .collection(db_auth)
            .findOne({ aadhar, v_id, bday, isDeleted: 0 }, (err, result) => {
                if (err) throw err;
                if (result) {
                    res.json({
                        success: true,
                        name: result.name,
                        header_token: GenToken(result, true, 1),
                        body_token: GenToken(result),
                    });
                } else {
                    res.json({ success: false, msg: "Try Again!" });
                }
            });
    }
});
Route.post("/new_account", (req, res) => {
    var name = req.body.name;
    var aadhar = req.body.aadhar;
    var v_id = req.body.v_id;
    var bday = req.body.bday;
    if (!name || !aadhar || !v_id || !bday) {
        res.json({
            success: false,
            msg: "Missing Fields!",
        });
    } else {
        db.getDB()
            .collection(db_auth)
            .insertOne(
                { name, aadhar, v_id, bday, isDeleted: 0 },
                (err, result) => {
                    if (err) throw err;
                    console.log("[+] New Voter Registered");
                    res.json({
                        success: true,
                        msg: "New Account Created Successfully",
                    });
                }
            );
    }
});
Route.get("/candidate", (req, res) => {
    db.getDB()
        .collection(db_candidate)
        .find({})
        .toArray((err, result) => {
            if (err) throw err;
            res.json({ success: true, data: result });
        });
});
app.use("/", Route);
// Starting the server.
const port = process.env.PORT || 2905;
db.connect((err) => {
    if (err) throw err;
    db.getDB()
        .collection(db_block)
        .find({})
        .toArray((err, arr) => {
            if (err) throw err;
            console.log(
                "[+] Creating Blockchain\n[+] Total Blocks: ",
                arr.length
            );
            arr.map((ele) => {
                blockchain.newBlock(ele.timestamp, ele.data);
            });
            console.log("[+] Blockchain Valid?", blockchain.isValidChain());
        });
    app.listen(port, () => {
        console.log(
            "[+] Started at --> http://" + ip.address() + ":" + port + "/"
        );
    });
});
