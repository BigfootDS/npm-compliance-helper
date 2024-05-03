
/**
 * A function used to filter an array into two separate arrays, based on a callback.
 * 
 * Code comes from this StackOverflow answer by 
 * StackOverflow user named "Yaremenko Andrii", edited by StackOverflow user named "Nicolai Lissau":
 * 
 * https://stackoverflow.com/a/42299191
 * 
 * That particular answer is licensed under "CC BY-SA 4.0", you can read that license's terms here:
 * 
 * https://creativecommons.org/licenses/by-sa/4.0/
 * 
 * 
 * @param {[*]} array Array that needs splitting.
 * @param {(element: T, index: number, array: T[]) => boolean} callback Function used to determine the partitions of the array contents. If something returns true from this callback, it goes into partition 1, otherwise it goes into partition 2.
 * @returns {[[],[]]} A nested array, where array[0] is all items that returned true in the provided callback.
 */
function partition(array, callback) {
	return array.reduce(function (result, element, i) {
		callback(element, i, array)
			? result[0].push(element)
			: result[1].push(element);

		return result;
	}, [[], []]
	);
};


module.exports = {
	partition: partition
}