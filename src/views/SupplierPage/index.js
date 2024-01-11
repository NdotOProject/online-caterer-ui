import CustomerLayout from "../../layouts/customer/CustomerLayout";
import SupplierCard from "./SupplierCard";
import {useEffect, useState} from "react";
import {instance} from "../../services/HttpClient";

import classes from './SupplierPage.module.scss';
import clsx from "clsx";

export default function SupplierPage() {

	const [suppliers, setSuppliers] = useState([]);

	useEffect(() => {
		instance.get("Supplier")
		.then((res) => {
			setSuppliers(res.data.Payload);
		})
		.catch((e) => {
			console.log(e)
		});
	}, []);

	return (
		<CustomerLayout>
			<div
				className={clsx({
					[classes.supplier_list]: true,
				})}
			>
				{suppliers.map((supplier) => {
					return (
						<SupplierCard
							key={supplier.Id}
							id={supplier.Id}
							name={supplier.Name}
							address={supplier.Address}
							introduction={supplier.Introduction}
							status={supplier.Status}
							ratingPoint={supplier.RatingPoint}
							foods={supplier.Foods}
						/>
					);
				})}
			</div>
		</CustomerLayout>
	);
}