# @bigfootds/npm-compliance-helper

Tool to help generate an NPM dependency "bill of materials" and confirm whether your dependencies are commercially-usable or not.

## Legal Disclaimer

This tool should not be used blindly or without further human activity to process its output.

Don't come blaming us for your poor business decisions.

## What is this tool?

This tool uses other NPM packages to scour a target for package licenses, and then processes the output of those packages to compare it against's _Choose a License's_ appendix table.

This table: [https://choosealicense.com/appendix/](https://choosealicense.com/appendix/)

If  a license is not in that table, this tool won't help you.

This tool can tell you whether or not some packages are using licenses that don't meet your needs, but it's up to you to identify what your needs are and provide a valid list to this tool.

This is an automation tool, but does introduce several points of failure into your "continuous compliance" workflow that you must address: 

- This tool relies on data from, which means if any of these items provide incorrect data then this tool's output is unusable: 
	- Choose a License
	- license-checker
	- you
- This tool does not automatically know your project's needs or your business' needs. 
	- If you say "let me know if licenses in this project's dependencies list don't allow for commercial use" but you actually needed to know about their patent use rules, then this tool's output is unusable. 
- No sensible business or human should be using automation-generated data without having that data be analysed by a human. 
	- Computers aren't perfect. 
	- Computers can't be responsible for your incorrect usage of this tool.
	- Computers can't be responsible for your business decisions based on the output of this tool.
	- The author of this tool is not able to see your output from your usage of this tool, and thus they are not responsible for your business decisions based on the output of this tool too.



## Installation

Install this package using NPM:

`npm install @bigfootds/npm-compliance-helper`

This is **NOT** a global package. Install it into a project!

## Stored License Information

This tool stores this information about common licenses:

```json
{
	"licenseName":"",
	"identifier":"",
	"webpage":"",
	"commercialUse":"",
	"distribution":"",
	"modification":"",
	"patentUse":"",
	"privateUse":"",
	"discloseSource":"",
	"legalNotice":"",
	"networkUseIsDistribution":"",
	"sameLicense":"",
	"stateChanges":"",
	"liability":"",
	"trademarkUse":"",
	"warranty":""
}
```

The values of the keys are numbers, and can be either:

- **unmentioned** - The package's license makes no mention of this property. 
- **"permitted"** - The package's license explicitly permits usage relevant to this property. These are the light green circles on the `Choose a License` Appendix webpage.
- **"condition"** - The package's license requires you to do a certain thing in order to be permitted to use the package. These are the light blue circles on the `Choose a License` Appendix webpage.
- **"condition-special"** - The package's license requires you to do a certain thing in order to be permitted to use the package. This has additional conditions or information that require a human to acknowledge, such as "you don't need to display the license and copyright notice IF you are distributing this package as part of a compiled application binary file." These are the darkened blue circles on the `Choose a License` Appendix webpage.
- **"limited"** - The license explicitly limits, forbids or does not provide anything relevant to this property. These are the red "Limitations" on the `Choose a License` Appendix webpage.

These keys are an exception to the above:

- "licenseName" - The full, human-readable name of the license. Should match the name from _Choose a License_'s Appendix page, [found here.](https://choosealicense.com/appendix/)
- "identifier" - The identifier code declared in the SPDX license website, [found here.](https://spdx.org/licenses/)
- "webpage" - The relevant webpage detailing the license, ideally on `spdx.org`'s website.


## How to use this tool

Blah blah blah stuff in progress.

### Command-line tool

### JavaScript Import/Require




