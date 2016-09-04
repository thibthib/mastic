let isSupported = true;

if (typeof document.documentElement.animate === 'undefined') {
	isSupported = false;
} else {
	const player = document.documentElement.animate([], 0);
	if (typeof player === 'undefined') {
		isSupported = false;
	} else {
		['play', 'currentTime', 'pause', 'reverse', 'playbackRate', 'cancel', 'finish', 'startTime', 'playState'].forEach(method => {
			if (player[method] === undefined) {
				isSupported = false;
			}
		});
	}
}

export default isSupported;
