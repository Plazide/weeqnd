const express = require("express");
const mockEvent = require("../service/event.json");
const mockContext = require("../service/context.json");
const emulate = require("./emulate");
const bodyParser = require("body-parser");

require("dotenv").config();

const PORT = 8080;
const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(emulate());
app.use("/api", async (req, res) => {
	const event = { ...mockEvent, ...req };
	const context = mockContext;

	try{
		const path = req.path.replace(/\/api/, "").split("?")[0];
		const func = require("../service" + path);

		if(typeof func !== "function")
			return res.status(404).json({ message: "Not found" });

		console.time(req.path);
		const{ statusCode, body, headers } = await func(event, context);
		console.timeEnd(req.path);
		console.count("Lambda");

		if(statusCode === 301 || statusCode === 302){
			res.redirect(statusCode, headers.Location);
			return;
		}

		res.status(statusCode).set(headers).json(body ? JSON.parse(body) : "");
	}catch(err){
		console.error(err);
		res.status(500).json({ message: "Internal Server Error", statusCode: 500 });
	}
});

app.listen(PORT, (err) => {
	if(err) throw err;

	console.log("Lambda server: " + process.env.API_SERVER);
});
