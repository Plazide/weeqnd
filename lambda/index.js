const express = require("express");
const mockEvent = require("../service/event.json");
const mockContext = require("../service/context.json");
const handler = require("../service/handler");
const emulate = require("./emulate");
const bodyParser = require("body-parser");

const PORT = 8001;
const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(emulate());
app.use("/api", async (req, res) => {
	const event = { ...mockEvent, ...req };
	const context = mockContext;

	try{
		const path = req.path.replace(/\/api/, "").replace(/\//, "").split("?")[0];
		const func = handler[path];

		if(typeof func !== "function")
			return res.status(404).json({ message: "Not found" });

		console.time(req.path);
		const{ statusCode, body, headers } = await func(event, context);
		console.timeEnd(req.path);

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

	console.log("Lambda server: http://localhost:" + PORT);
});