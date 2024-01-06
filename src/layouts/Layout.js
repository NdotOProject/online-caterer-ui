import CustomerLayout from "./customer/CustomerLayout";

export default function Layout({children}) {

	// let LayoutComponent = CustomerLayout;

	return (
		<CustomerLayout>
			{children}
		</CustomerLayout>
	);
}