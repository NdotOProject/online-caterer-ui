import {useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import ComponentKeyProvider from "../ComponentKeyProvider";
import FlexDirectionType from "./FlexDirectionType";

import classes from "./Grid.module.scss";

function getSize(value) {
	return value ? `${value}px` : "100%";
}

function useTotalFlex(children) {
	return useMemo(() => {
		return children.reduce((result, child) => {
			const visible = child.props.visible ?? true;
			if (visible) {
				const flex = child.props.flex ?? 1;
				return result + flex;
			} else {
				return result;
			}
		}, 0);
	}, [children]);
}

function asArrayItems(arr) {
	if (!Array.isArray(arr)) {
		arr = [arr];
	} else {
		arr = arr.reduce((result, element) => {
			if (element) {
				if (Array.isArray(element)) {
					return [...result, ...element];
				} else {
					return [...result, element];
				}
			} else {
				return result;
			}
		}, []);
	}
	return arr.map((item) => {
		if (item?.type !== Item) {
			return (
				<Item>
					{item}
				</Item>
			);
		} else {
			return item;
		}
	});
}

function Column({width, height, className, style, children}) {

	// fix children always is an array
	// and wrap children isn't Item component.
	children = asArrayItems(children);

	// calculate total of property flex of children.
	const totalFlex = useTotalFlex(children);

	const colRef = useRef();

	// calculate and store item width per one flex unit.
	const [itemHeight, setItemHeight] = useState(0);
	useEffect(() => {
		const colHeight = height ?? colRef.current?.clientHeight;
		setItemHeight(colHeight / totalFlex);
	}, [totalFlex, height]);

	// create unique key for col
	const colKey = useMemo(() =>
		ComponentKeyProvider.getKey(`Col_size_${totalFlex}`), [totalFlex]
	);

	return (
		<div
			key={colKey}
			ref={colRef}
			className={clsx({
				[classes.col]: true,
				[className]: className
			})}
			style={{
				"--col-width": getSize(width),
				"--col-height": getSize(height),
				...style
			}}
		>
			{children.map((item, index) => (
				<Item
					key={item.key ?? `${colKey}__Item_${index}`}
					ref={item.ref}
					flexDirection={FlexDirectionType.COL}
					// resize for child.
					height={item.props.height ?? itemHeight}
					{...item.props}
				/>
			))}
		</div>
	);
}

Column.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	className: PropTypes.string,
	style: PropTypes.object,
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node),
	]),
};

function Row({width, height, className, style, children}) {

	// fix children always is an array
	// and wrap children isn't Item component.
	children = asArrayItems(children);

	// calculate total of property flex of children.
	const totalFlex = useTotalFlex(children);

	const rowRef = useRef();

	// calculate and store item width per one flex unit.
	const [itemWidth, setItemWidth] = useState(0);
	useEffect(() => {
		const rowWidth = width ?? rowRef.current?.clientWidth;
		setItemWidth(rowWidth / totalFlex);
	}, [totalFlex, width]);

	// create unique key for row
	const rowKey = useMemo(() =>
		ComponentKeyProvider.getKey(`Row_size_${totalFlex}`), [totalFlex]
	);

	return (
		<div
			key={rowKey}
			ref={rowRef}
			className={clsx({
				[classes.row]: true,
				[className]: className
			})}
			style={{
				"--row-width": getSize(width),
				"--row-height": getSize(height),
				...style
			}}
		>
			{children.map((item, index) => (
				<Item
					key={item.key ?? `${rowKey}__Item_${index}`}
					ref={item.ref}
					flexDirection={FlexDirectionType.ROW}
					// resize for child.
					width={item.props.width ?? itemWidth}
					{...item.props}
				/>
			))}
		</div>
	);
}

Row.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	className: PropTypes.string,
	style: PropTypes.object,
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node),
	]),
};

const Item = (
	{
		flex = 1, flexDirection,
		visible = true,
		width, height,
		className, style,
		children,
		...props
	}) => {

	// resize for child is a Row component.
	if (children?.type === Row) {
		children = (
			<Row
				key={children.key}
				ref={children.ref}
				width={children.props.width ?? width * flex}
				{...children.props}
			/>
		);
	}

	if (children?.type === Column) {
		children = (
			<Column
				key={children.key}
				ref={children.ref}
				height={children.props.height ?? height * flex}
				{...children.props}
			/>
		);
	}

	if (width && flexDirection === FlexDirectionType.ROW) {
		width = width * flex;
	}

	if (height && flexDirection === FlexDirectionType.COL) {
		height = height * flex;
	}

	return visible
		? (
			<div
				className={clsx({
					[classes.item]: true,
					[className]: className
				})}
				style={{
					"--item-width": getSize(width),
					"--item-height": getSize(height),
					...style
				}}
				{...props}
			>
				{children}
			</div>
		)
		: undefined;
}

Item.propTypes = {
	flex: PropTypes.number,
	flexDirection: PropTypes.instanceOf(FlexDirectionType),
	width: PropTypes.number,
	height: PropTypes.number,
	className: PropTypes.string,
	style: PropTypes.object,
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node),
	]),
};

export {
	Row, Item, Column, FlexDirectionType
}
