import Card from "../../components/Card";
import Image from "../../components/Image";
import {Item, Row} from "../../components/ListView";
import Button, {ButtonLink, ButtonType} from "../../components/Button";
import {CartShopping} from "../../components/Icons/Icons";
import {Images} from "../../assets/images";

import classes from "./FoodCard.module.scss";
import clsx from "clsx";

export default function FoodCard(
	{
		id,
		imageSrc,
		name,
		description,
		price,
	}
) {

	if (Array.isArray(imageSrc)) {
		imageSrc = imageSrc[0];
	}

	return (
		<Card
			key={id}
			className={clsx({
				[classes.food_card]: true,
			})}
		>
			<span
				className={clsx({
					[classes.food_price]: true
				})}
			>
				{price}
			</span>
			<Image
				src={Images.get(imageSrc)}
				className={clsx({
					[classes.food_img]: true,
				})}
			/>
			<div
				className={clsx({
					[classes.detail_box]: true,
				})}
			>
					<span
						className={clsx({
							[classes.food_name]: true,
						})}
					>
						{name.length > 24
							? name.substring(0, 21).concat("...")
							: name}
					</span>
				<p>
					{description?.length > 130
						? description.substring(0, 127).concat("...")
						: description}
				</p>
				<Row
					className={clsx({
						[classes.card_options]: true,
					})}
				>
					<Item
						className={clsx({
							[classes.link_container]: true,
						})}
					>
						<Button
							link={ButtonLink.internal("/")}
							className={clsx({
								[classes.link]: true,
							})}
						>
							More Detail
						</Button>
					</Item>
					<Item
						className={clsx({
							[classes.cart_btn_container]: true,
						})}
					>
						<Button
							type={ButtonType.OUTLINE}
							className={clsx({
								[classes.cart_btn]: true,
							})}
						>
							<CartShopping
								className={clsx({
									[classes.cart_btn_icon]: true,
								})}
								height={"18px"}
							/>
						</Button>
					</Item>
				</Row>
			</div>
		</Card>
	);
}