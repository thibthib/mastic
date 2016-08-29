export const hasPromise = typeof window.Promise !== 'undefined';
export const hasFetch = typeof window.fetch !== 'undefined';
export const hasClassList = 'classList' in document.createElement('div');

export default {
	Promise: hasPromise,
	fetch: hasFetch,
	classList: hasClassList
};
