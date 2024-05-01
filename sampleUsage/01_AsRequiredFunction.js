const complianceHelper = require("../src/index.js");

(async () => {

	let result = await complianceHelper();

	console.log("Result is: " + result);

})();