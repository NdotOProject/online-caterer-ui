import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import {Images} from "../../assets/images";
import styles from './ImageStyle.module.scss';
import clsx from "clsx";

const Image = forwardRef((
	{src, alt, className, fallback: customFallback = Images.noImage, ...props },
	ref) => {
	const [fallback, setFallback] = useState('');

	const handleError = () => {
		setFallback(customFallback);
	};

	return (
		<img
			className={clsx({
				[styles.wrapper]: true,
				[className]: className
			})}
			ref={ref}
			src={fallback || src}
			alt={alt}
			{...props}
			onError={handleError}
		/>
	);
});

Image.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string,
	className: PropTypes.string,
	fallback: PropTypes.string,
};

export default Image;