// Package imports
const Discord = require("discord.js");
const client = new Discord.Client();
const express = require("express");

require("dotenv").config();

// Express server section
const app = express();
app.use(express.json());
// app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to Fork the World!");
});

app.post("/payload", (req, res) => {
    if (req.body.action === "labeled") {
        let issue = req.body.issue.html_url;
        // let title = req.body.issue.title;
        // let desc = req.body.issue.body || "No description provided.";
        // let state = req.body.issue.state;
        let label = req.body.label.name;

        if (label === "looking-for-team") {
            client.guilds.cache
                .get(process.env.GUILD_ID)
                .channels.cache.get(process.env.LOOKING_FOR_TEAM_ID)
                .send(issue);
        } else if (label === "looking-for-hackers") {
            client.guilds.cache
                .get(process.env.GUILD_ID)
                .channels.cache.get(process.env.LOOKING_FOR_TEAM_ID)
                .send(issue);
        } else if (label === "create-new-team") {
            client.guilds.cache
                .get(process.env.GUILD_ID)
                .channels.cache.get(process.env.CREATE_NEW_TEAM_ID)
                .send(issue);
        }
    }

    res.send("Received");
});

// Bot on ready
client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    app.listen(process.env.PORT || 5000, () => console.log("Listening.."));
});

// Bot on message
// client.on("message", (message) => {
//     message.channel.send("Hi");
// });

client.login(process.env.TOKEN);
