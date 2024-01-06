import {useEffect, useRef, useState} from "react";

export function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(
			() => setDebouncedValue(value),
			delay
		);

		return () => clearTimeout(handler);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	return debouncedValue;
}

export function useCancelCallback(callback, recallTime) {
	const isCanceled = useRef(false);
	const [isCancel, setIsCancel] = useState(false);

	useEffect(() => {
		if (typeof recallTime !== "number") {
			if (typeof callback === "function"
				&& !isCancel && !isCanceled.current) {
				callback();
			}

			return () => {
				isCanceled.current = true;
			};
		} else {
			const handler = setInterval(
				() => {
					setIsCancel(false);
					if (typeof callback === "function"
						&& !isCancel) {
						callback();
					}
				},
				recallTime
			);

			return () => clearInterval(handler);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [callback, isCancel]);

	return function setCancel(value) {
		setIsCancel(!!value);
	};
}
