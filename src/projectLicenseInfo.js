const { getProjectLicenses } = require('generate-license-file');
var path = require('path');
const { partition } = require('./utilities/arrayPartition');




/**
 * Process a project's package.json file and create an organized object of its various dependencies and their licenses.
 * 
 * Each license is represented as an object containing the license text content (as `content`) and package dependencies that use that license (as `dependencies`);
 * 
 * Licenses that apply to multiple dependencies (eg. if two packages are made by the same author and have the same license) will be grouped together.
 * 
 * @param {string} projectPackageJsonPath File path to the package.json file of the project you wish to process. Default value is a path pointing to a package.json file in the current working directory.
 * @return {{
 * 	directDependencies: [{content: string, dependencies: [string]}],
 * 	transitiveDependencies: [{content: string, dependencies: [string]}],
 * 	allDependencies: [{content: string, dependencies: [string]}] 
 * }} Organized data structure of licenses and their relevant dependencies found in the project.
 */
async function getProjectLicenseInfo(
	projectPackageJsonPath = path.join(process.cwd(), 'package.json'),
	dependenciesToExclude = [],
	licensesToOverride = {},
	
) {

	let licenses = await getProjectLicenses(path.join(process.cwd(), "package.json"), {
		replace: licensesToOverride,
		exclude: dependenciesToExclude
	});

	let organisedLicenses = {
		directDependencies: [],
		transitiveDependencies: [],
		allDependencies: JSON.parse(JSON.stringify(licenses))
	}

	let projectInfo = require(projectPackageJsonPath);

	let partitionedLicenses = partition(licenses, (license, index) => {
		return license.dependencies.some(dependency => {
			let dependencyNameNoVersion = dependency.substring(0, dependency.lastIndexOf("@"));
			if (
				(projectInfo.dependencies && Object.keys(projectInfo.dependencies).includes(dependencyNameNoVersion))
				||
				(projectInfo.devDependencies && Object.keys(projectInfo.devDependencies).includes(dependencyNameNoVersion))
			){
				return true;
			}
		})
	})
	

	organisedLicenses.directDependencies = partitionedLicenses[0];
	organisedLicenses.transitiveDependencies = partitionedLicenses[1];

	return organisedLicenses;

	
}


module.exports = {
	getProjectLicenseInfo
}