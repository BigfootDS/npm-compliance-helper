#!/usr/bin/env node

const { getProjectLicenseInfo } = require('./projectLicenseInfo');
const path = require("node:path");



async function app(customLicenseDataJsonPath = "", excludedLicenses = [], licenseOverrides = []){
	let output = "";
	
	output = await getProjectLicenseInfo(
		customLicenseDataJsonPath ? customLicenseDataJsonPath : null,
		excludedLicenses,
		licenseOverrides
	).catch(error => error);

	return output;
}


(async () => {
	if (require.main === module){
		// If running this package as a CLI tool, process any provided arguments,
		// and give those arguments to the app function.
		// We just need to print the returned value of the app function at the end.
		//console.log(`Running ${require('../package.json').name} as a terminal application.`);
		//console.log(path.join(process.cwd(), "package.json"));
		const { program } = require('commander');
	
	
		program
			.option('-p, --packageJsonPath <packageJsonPath>', "A path to a package.json. If not provided, the package.json in the current working directory will be used.", path.join(process.cwd(), "package.json"))
			.option('-lo, --licenseOverrides <licensesToOverride>', "The licenses you want to allow in your project.", [])
			.option('-ex, --excludedLicenses <excludedSpdxIdentifiers>', "The licenses you want to forbid in your project.", []);
	
		program.parse();
	
		const options = program.opts();
	
		let output = await app(options.packageJsonPath);
	
		
		console.log(JSON.stringify(output, null, 4));
	
	} else {
		// Do nothing, let the user configure and execute the app as a function themselves.
		// console.log(`Running ${require('../package.json').name} as an imported function.`);
		module.exports = {
			organiseProjectLicenseInfo: getProjectLicenseInfo
		}
	}
})();


