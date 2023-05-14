const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const AxiosParamsObject = require("./classes/AxiosParamsObject");

app.use(
	cors({
		origin: "*",
	})
);

require("dotenv").config();

app.get(":endpoint([\\/\\w\\.-]*)", function (req, res) {
	// Remove any trailing slash from base url
	const endpoint =
		process.env.API_BASE_URL.replace(/\/$/, "") + req.params.endpoint;

	const paramsObj = new AxiosParamsObject();
	paramsObj.addParamsFromRequest(req);
	paramsObj.addHeadersFromRequest(req);
	console.log(paramsObj);
	axios
		.get(endpoint, {
			params: paramsObj.getParams(req),
			headers: {
				Authorization: req.headers.authorization,
			},
		})
		.then((response) => {
			res.json(response.data);
		})
		.catch((error) => {
			res.json(error);
		});
});

app.listen(8000);
