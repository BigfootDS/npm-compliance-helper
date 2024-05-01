var lcc = require('license-compatibility-checker');
var path = require('path');


async function licenseCompatibilityChecker() {
	let result = "";

	lcc.check(path.join(process.cwd(), 'package.json'), path.join(process.cwd(), "node_modules"), function (/*error*/ err,/*boolean*/ passed,/*string*/ output) {
		if (err) console.log(err);
		else if (passed) {
			//No license issues found
			console.log(output);
			return output;
		} else {
			//License issues found 
			console.log(output);
			//process.exit(1);
			//or
			//throw new Error('License issues found');
			return output;
		}
	});

}

licenseCompatibilityChecker();

module.exports = {
	licenseCompatibilityChecker
}