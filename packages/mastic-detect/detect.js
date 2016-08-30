import animationTest from './tests/animations.js';

export const hasPromise = typeof window.Promise !== 'undefined';
export const hasFetch = typeof window.fetch !== 'undefined';
export const hasClassList = 'classList' in document.createElement('div');
export const hasAnimations = animationTest;
export const hasIntl = typeof window.Intl !== 'undefined';
export const hasObjectFit = 'object-fit' in new Image().style;
export const hasObjectAssign = typeof Object.assign !== 'undefined';

export default {
	Promise: hasPromise,
	fetch: hasFetch,
	classList: hasClassList,
	animations: hasAnimations,
	Intl: hasIntl,
	objectFit: hasObjectFit,
	objectAssign: hasObjectAssign
};
