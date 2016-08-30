export const isIE = (version, comparison) => {
	const b = document.createElement('B');
	const docElem = document.documentElement;

	const cc = `${comparison ? `${comparison} ` : ''} IE ${version ? ` ${version}` : ''}`;
	b.innerHTML = `<!--[if ${cc}]><b id="iecctest"></b><![endif]-->`;
	docElem.appendChild(b);
	const isIE = !!document.getElementById('iecctest');
	docElem.removeChild(b);
	return isIE;
};
