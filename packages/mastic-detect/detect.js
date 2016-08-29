export const hasPromise = typeof window.Promise !== 'undefined';
export const hasFetch = typeof window.fetch !== 'undefined';

export default {
	Promise: hasPromise,
	fetch: hasFetch
};
