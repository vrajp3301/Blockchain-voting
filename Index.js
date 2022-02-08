// Importing the requirements.
const express = require("express");
const session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
// Defining the constants.
const app = express();
// Configuring the app.
app.use(
    require("cors")({
        origin: [],
        credentials: true,
        optionSuccessStatus: 200,
    })
);
app.use(require("compression")());
app.use(express.urlencoded({ extended: !0 }));
app.use(express.json());
app.use(express.static("public"));
app.use("/public", express.static("public"));
app.use(
    session({
        secret: "None_of_Your_Buisness_Ok",
        resave: false,
        saveUninitialized: true,
        proxy: true,
        cookie: { secure: false, sameSite: "none" },
        store: new MongoDBStore({
            uri: require("./configs/db.config").LocalUrl,
            collection: "sessions",
        }),
    })
);
// Configuring the routes
app.use("/", require("./route/Page"));
app.use("/user", require("./route/User"));
app.use("/pp", require("./route/PP"));
app.use("/bc", require("./route/BlockChain"));
// Starting the server.
/*db.getDB()
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
        });*/
app.listen(process.env.PORT || 8501, () => {
    console.log("Server started on ", process.env.PORT || 8501);
});
