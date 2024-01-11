import Home from "../views/Home";
import SupplierPage from "../views/SupplierPage";

export const PublicRoute = [
	{
		path: "/",
		component: Home
	},
	{
		path: "/suppliers",
		component: SupplierPage
	}
];
