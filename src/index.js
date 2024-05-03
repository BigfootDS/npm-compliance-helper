#!/usr/bin/env node

const { getProjectLicenseInfo } = require('./projectLicenseInfo');




async function app(allowed = [], forbidden = [], customLicenseDataJsonPath = ""){
	let output = "";


	return output;
}


(async () => {
	if (require.main === module){
		// If running this package as a CLI tool, process any provided arguments,
		// and give those arguments to the app function.
		// We just need to print the returned value of the app function at the end.
		console.log(`Running ${require('../package.json').name} as a terminal application.`);
	
		const { program } = require('commander');
	
	
		program
			.option('-a, --allowed <allowedSpdxIdentifiers>', "The licenses you want to allow in your project.")
			.option('-f, --forbidden <forbiddenSpdxIdentifiers>', "The licenses you want to forbid in your project.");
	
		program.parse();
	
		const options = program.opts();
	
		let output = await app();
	
		console.log(output);
		return output;
	
	} else {
		// Do nothing, let the user configure and execute the app as a function themselves.
		// console.log(`Running ${require('../package.json').name} as an imported function.`);
		module.exports = {
			getProjectLicenseInfo
		}
	}
})();


