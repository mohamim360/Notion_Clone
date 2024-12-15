
// This stringToColor function generates a consistent hexadecimal color code (e.g., #FF5733) based on a given string. It's commonly used in scenarios like assigning unique colors to users or tags, ensuring that the same input string always maps to the same color.


function stringToColor(str: string){
	let hash = 0;

	for(let i = 0 ; i < str.length; i++){
		hash = str.charCodeAt(i) +((hash << 5) - 5)
	}

	const c = (hash & 0x00ffffff).toString(16).toUpperCase();
	return "#" + "00000".substring(0, 6 - c.length) + c
}

export default stringToColor