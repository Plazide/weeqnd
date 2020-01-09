const express = require("express");
const mockEvent = require("../service/event.json");
const mockContext = require("../service/context.json");
const handler = require("../service/handler");

const PORT = 8001;
const app = express();

app.use("/api", async (req, res) => {
	const event = { ...mockEvent, ...req };
	const context = mockContext;

	try{
		const path = req.path.replace(/\/api/, "").replace(/\//, "");
		const func = handler[path];

		if(typeof func !== "function")
			return res.status(404).json({ message: "Not found" });

		const{ statusCode, body, headers } = await func(event, context);

		res.set(headers).status(statusCode).json(body);
	}catch(err){
		res.status(500).json({ message: "Internal Server Error", statusCode: 500 });
	}
});

app.listen(PORT, (err) => {
	if(err) throw err;

	console.log("Lambda server: http://localhost:" + PORT);
});
