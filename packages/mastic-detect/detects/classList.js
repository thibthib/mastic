const isSupported = element => {
	return ('classList' in element) ?
	(!element.classList.toggle('a', false) && !element.classList.contains('a')) :
	false;
};

const testHTMLElement = document.createElement('x');
const testSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  
export default isSupported(testSVGElement) && isSupported(testHTMLElement);
