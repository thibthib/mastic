import animationTest from './test/animations.js';

export const hasPromise = typeof window.Promise !== 'undefined';
export const hasFetch = typeof window.fetch !== 'undefined';
export const hasClassList = 'classList' in document.createElement('div');
export const hasAnimations = animationTest;

export default {
	Promise: hasPromise,
	fetch: hasFetch,
	classList: hasClassList,
	animations: hasAnimations
};
