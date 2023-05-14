class AxiosParamsObject {
	constructor() {
		this.params = {};
		this.headers = {};
	}

	setApiKey(key, value) {
		if (!!key && !!value) {
			this.addParam(key, value);
		}
	}

	addParam(field, value) {
		this.params[field] = value;
	}

	addHeader(field, value) {
		this.headers[field] = value;
	}

	addParamsFromRequest(req) {
		for (const [field, value] of Object.entries(req.query)) {
			this.addParam(field, value);
		}
	}

	addHeadersFromRequest(req) {
		for (const [field, value] of Object.entries(req.headers)) {
			this.addHeader(
				field.replace(/^\w/, (c) => c.toUpperCase()),
				value
			);
		}
	}

	getParams() {
		return this.params;
	}
}

module.exports = AxiosParamsObject;
