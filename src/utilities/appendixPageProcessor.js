let columnPositioning = [
	"commercialUse",
	"distribution",
	"modification",
	"patentUse",
	"privateUse",
	"discloseSource",
	"legalNotice",
	"networkUseIsDistribution",
	"sameLicense",
	"stateChanges",
	"liability",
	"trademarkUse",
	"warranty"
]


/**
 * Paste this function into the browser dev tools console when viewing https://choosealicense.com/appendix/
 * Then, run `appendixPageProcessor();` in the browser dev tools console.
 * The output in the browser dev tools console is a minified JSON string that can be used as `licenseData.json`.
 * This is processing data that has already been loaded on the page, it does not crawl or trigger any other activity from Choose a License's servers or databases or anything else like that.
 * This is essentially a helper utility function for use when developing this "npm compliance helper" package.
 * Additionally, the JSON string output is not "immediately ready to use" - it needs further manual input for finding any special conditions or bespoke properties of a license. 
 * 
 * @author BigfootDS
 *
 * @returns JSON string depicting an array of objects of processed table elements.
 */
function appendixPageProcessor(){
	let tableBody = document.querySelector("tbody");
	console.log(tableBody);
	let tableRows = Array.from(tableBody.querySelectorAll("tr"));
	console.log(tableRows);
	tableRows.shift();
	let jsonData = [];

	tableRows.forEach((row, rowIndex) => {
		let jsonStructure = {
			licenseName:"",
			identifier:"",
			commercialUse:"",
			distribution:"",
			modification:"",
			patentUse:"",
			privateUse:"",
			discloseSource:"",
			legalNotice:"",
			networkUseIsDistribution:"",
			sameLicense:"",
			stateChanges:"",
			liability:"",
			trademarkUse:"",
			warranty:""
		}
		let headerRow = row.querySelector("th");
		console.log(headerRow);
		let anchorTag = headerRow.querySelector("a");
		console.log(anchorTag);
		jsonStructure.licenseName = anchorTag.textContent;
		jsonStructure.identifier = anchorTag.href.substring(anchorTag.href.toString().lastIndexOf("/") + 1);
		let columns = row.querySelectorAll("td");
		columns.forEach((column, colIndex) => {

			if (column.className.startsWith("license-permissions")){
				jsonStructure[columnPositioning[colIndex]] = "permitted"
			} else if (column.className.startsWith("license-limitations")){
				jsonStructure[columnPositioning[colIndex]] = "limited"
			} else if (column.className.startsWith("license-conditions")){
				jsonStructure[columnPositioning[colIndex]] = "condition"
			} 
		});

		for (let index = 3; index < Object.keys(jsonStructure).length; index++) {
			const property = Object.keys(jsonStructure)[index];
			if (jsonStructure[property].length == 0){
				jsonStructure[property] = "unmentioned";
			}
		}
		
		jsonData.push(jsonStructure);
	});

	return JSON.stringify(jsonData);
}