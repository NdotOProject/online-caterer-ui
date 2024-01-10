import clsx from "clsx";
import Carousel, {CarouselButton} from "../../components/Carousel";
import {Images} from "../../assets/images";
import Image from "../../components/Image";

import classes from "./HomeStyle.module.scss";
import {useEffect, useState} from "react";
import {instance} from "../../services/HttpClient";
import FoodCard from "./FoodCard";
import CustomerLayout from "../../layouts/customer/CustomerLayout";

export default function Home() {

	const [foodList, setFoodList] = useState([]);
	const [publicValue, setPublicValue] = useState({});

	useEffect(() => {
		instance.get("Food",)
		.then((res) => {
			setFoodList(res.data.Payload);
		}).catch((e) => {
			console.log(e);
		});
	}, []);

	return (
		<CustomerLayout
			publicValue={publicValue}
			setPublicValue={setPublicValue}
		>
			<Carousel
				className={clsx({
					[classes.food_carousel]: true
				})}
				nextButton={CarouselButton.next({
					alwaysShowIcon: false
				})}
				previousButton={CarouselButton.previous({
					alwaysShowIcon: false
				})}
				height={500}
			>
				<div>
					<Image src={Images.food_1}/>
				</div>
				<div>
					<Image src={Images.food_2}/>
				</div>
				<div>
					<Image src={Images.food_3}/>
				</div>
				<div>
					<Image src={Images.food_4}/>
				</div>
			</Carousel>

			<div
				className={clsx({
					[classes.food_list]: true,
				})}
			>
				{foodList.map((food) => {
					return (
						<FoodCard
							key={food.Id}
							id={food.Id}
							name={food.Name}
							description={food.Description}
							price={food.UnitPrice}
							imageSrc={food.Images}
						/>
					);
				})}
			</div>
		</CustomerLayout>
	);
}