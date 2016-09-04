import animationDetect from './detects/animations.js';
import classListDetect from './detects/classList.js';

export const hasPromise = typeof window.Promise !== 'undefined';
export const hasFetch = typeof window.fetch !== 'undefined';
export const hasClassList = classListDetect;
export const hasAnimations = animationDetect;
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
