import {cloneElement, memo, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import {Column, Item, Row} from "../ListView";
import ComponentKeyProvider from "../ComponentKeyProvider";
import CarouselNavigator from "./CarouselNavigator";
import CarouselButton from "./CarouselButton";
import NavigatorPosition from "./NavigatorPosition";

import {useCancelCallback, useDebounce} from "../../hooks";

import classes from "./CarouselStyle.module.scss";

// page-turning style;
// right away;
// delay;

const Carousel = memo(
		({
			 width = 600, height = 400,
			 navigator,
			 nextButton = CarouselButton.next({alwaysShowIcon: false}),
			 previousButton = CarouselButton.previous({alwaysShowIcon: false}),
			 className,
			 children,
		 }) => {

			// fix children always is an array.
			if (!Array.isArray(children)) {
				children = [children];
			}

			// create unique key for component and children.
			const carouselKey = useMemo(() =>
				ComponentKeyProvider.getKey(`Carousel`), []
			);

			const mainKey = useMemo(() =>
					ComponentKeyProvider.getKey(`${carouselKey}__content_section`),
				[carouselKey]
			);

			// wrap children.
			const screens = useMemo(() => children.map((child, index) => (
				<Item key={`${mainKey}__item--${index}`}>
					{child}
				</Item>
			)), [children, mainKey]);

			const [activeIndex, setActiveIndex] = useState(0);

			const lastActiveIndex = useRef(activeIndex);
			const getScreen = (index) => {
				if (index < 0) {
					index = screens.length + index;
				} else if (index >= screens.length) {
					index = index - screens.length;
				}
				lastActiveIndex.current = index;
				return screens[index];
			}

			// validate and set value for activeIndex
			const updateIndex = (newIndex) => {
				if (newIndex < 0) {
					newIndex = screens.length - 1;
				} else if (newIndex >= screens.length) {
					newIndex = 0;
				}
				setActiveIndex(newIndex);
			}

			const [leftScreen, setLeftScreen] = useState(cloneElement(
				getScreen(activeIndex - 1), {
					className: clsx({
						[classes.carousel_item]: true,
						[classes["carousel_item--left"]]: true
					})
				}
			));

			const [activeScreen, setActiveScreen] = useState(cloneElement(
				getScreen(activeIndex), {
					className: clsx({
						[classes.carousel_item]: true,
						[classes["carousel_item--active"]]: true,
					})
				}
			));

			const [rightScreen, setRightScreen] = useState(cloneElement(
				getScreen(activeIndex + 1), {
					className: clsx({
						[classes.carousel_item]: true,
						[classes["carousel_item--right"]]: true,
					})
				}
			));

			const animationTime = 500;
			const delay = 1500;
			const debouncedValue = useDebounce(activeIndex, delay);

			const getAnimation = (name) => {
				if (name) {
					return `${classes[name]} ${animationTime}ms ease-in-out forwards`;
				} else {
					return "";
				}
			}

			const handleNextButtonClick = (current) => {
				updateIndex(current);

				let currentScreen = getScreen(current);
				let nextScreen = getScreen(current + 1);

				let leftItem = cloneElement(activeScreen, {
					style: {
						...activeScreen.props.style,
						animation: getAnimation("disappearsOnTheLeft"),
					}
				});

				const isSpecialCase = nextScreen.key === leftItem.key;

				setLeftScreen(leftItem);
				setTimeout(() => {
					if (isSpecialCase) {
						leftItem = getScreen(current - 1)
					}
					setLeftScreen(cloneElement(
						leftItem, {
							className: clsx({
								[classes.carousel_item]: true,
								[classes["carousel_item--left"]]: true
							}),
							style: {
								...leftItem.props.style,
								animation: "",
							}
						}
					));
				}, animationTime);

				setActiveScreen(cloneElement(
					currentScreen, {
						className: clsx({
							[classes.carousel_item]: true,
						}),
						style: {
							...currentScreen.props.style,
							animation: getAnimation("appearsFromTheRight"),
						}
					}
				));
				setTimeout(() => {
					setActiveScreen(cloneElement(
						currentScreen, {
							className: clsx({
								[classes.carousel_item]: true,
								[classes["carousel_item--active"]]: true
							}),
							style: {
								...currentScreen.props.style,
								animation: "",
							}
						}
					));
				}, animationTime);

				if (isSpecialCase) {
					setTimeout(() => {
						setRightScreen(cloneElement(nextScreen, {
							className: clsx({
								[classes.carousel_item]: true,
								[classes["carousel_item--right"]]: true
							}),
						}));
					}, animationTime);
				} else {
					setRightScreen(cloneElement(nextScreen, {
						className: clsx({
							[classes.carousel_item]: true,
							[classes["carousel_item--right"]]: true
						}),
					}));
				}
			};

			const handlePrevIconClick = (current) => {
				updateIndex(current);

				let currentScreen = getScreen(current);
				let prevScreen = getScreen(current - 1);

				setLeftScreen(cloneElement(prevScreen, {
					className: clsx({
						[classes.carousel_item]: true,
						[classes["carousel_item--left"]]: true
					}),
				}));

				setActiveScreen(cloneElement(
					currentScreen, {
						className: clsx({
							[classes.carousel_item]: true,
						}),
						style: {
							...currentScreen.props.style,
							animation: getAnimation("appearsFromTheLeft"),
						}
					}
				));
				setTimeout(() => {
					setActiveScreen(cloneElement(
						currentScreen, {
							className: clsx({
								[classes.carousel_item]: true,
								[classes["carousel_item--active"]]: true
							}),
							style: {
								...currentScreen.props.style,
								animation: "",
							}
						}
					));
				}, animationTime);

				let rightItem = cloneElement(
					activeScreen, {
						style: {
							...activeScreen.props.style,
							animation: getAnimation("disappearsOnTheRight"),
						}
					}
				);
				setRightScreen(rightItem);
				setTimeout(() => {
					setRightScreen(cloneElement(
						rightItem, {
							className: clsx({
								[classes.carousel_item]: true,
								[classes["carousel_item--right"]]: true
							}),
							style: {
								...rightItem.props.style,
								animation: "",
							}
						}
					));
				}, animationTime);

			};

			const setCancel = useCancelCallback(() => {
				handleNextButtonClick(debouncedValue + 1);
			}, delay);

			let ComponentWrapper;
			switch (navigator?.position) {
				case NavigatorPosition.LEFT:
				case NavigatorPosition.RIGHT:
					ComponentWrapper = Row;
					break;
				case NavigatorPosition.TOP:
				case NavigatorPosition.BOTTOM:
				default:
					ComponentWrapper = Column;
					break;
			}

			const ContentSection = (
				<Item
					key={mainKey}
					flex={4}
					className={clsx({
						[classes.carousel__content]: true,
					})}
				>
					<Row>
						{leftScreen}
						{activeScreen}
						{rightScreen}
						<Item
							flex={1}
							visible={previousButton?.value !== undefined}
							className={clsx({
								[classes.btn_prev]: true
							})}
							onClick={() => {
								handlePrevIconClick(activeIndex - 1);
							}}
						>
							{previousButton?.value}
						</Item>

						<Item
							flex={nextButton?.value ? 1 : 0}
							visible={nextButton?.value !== undefined}
							className={clsx({
								[classes.btn_next]: true
							})}
							onClick={() => {
								handleNextButtonClick(activeIndex + 1);
							}}
						>
							{nextButton?.value}
						</Item>
					</Row>
				</Item>
			);

			const NavigatorSection = navigator?.getNavigatorContent({
				active: activeIndex,
				children: children,
				handleClick: (index) => {
					if ((activeIndex === screens.length - 1 && index === 0)
						|| index > activeIndex) {
						handleNextButtonClick(index);
					} else if (index < activeIndex) {
						handlePrevIconClick(index);
					} else if (index === activeIndex) {
						setCancel(true);
					}
				},
			});

			let FirstSection, SecondSection;
			switch (navigator?.position) {
				case NavigatorPosition.LEFT:
				case NavigatorPosition.TOP:
					FirstSection = NavigatorSection;
					SecondSection = ContentSection;
					break;
				case NavigatorPosition.RIGHT:
				case NavigatorPosition.BOTTOM:
				default:
					FirstSection = ContentSection;
					SecondSection = NavigatorSection;
					break;
			}

			return (
				<ComponentWrapper
					key={carouselKey}
					width={width}
					height={height}
					className={clsx({
						[classes.carousel]: true,
						[className]: className,
					})}
				>
					{FirstSection}
					{SecondSection}
				</ComponentWrapper>
			);
		}
	)
;

Carousel.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	navigator: PropTypes.instanceOf(CarouselNavigator),
	nextButton: PropTypes.instanceOf(CarouselButton),
	previousButton: PropTypes.instanceOf(CarouselButton),
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node),
	]),
};

export default Carousel;
