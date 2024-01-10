import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {PublicRoute} from "./routes";

import './styles/App.scss';
import './styles/Colors.scss';

function App() {

	document.title = "Online Catering";

	return (
		<Router>
			<Routes>
				{PublicRoute.map((route, index) => {
					const Page = route.component;
					return (
						<Route
							key={index}
							path={route.path}
							element={
								<Page/>
							}
						/>
					);
				})}
			</Routes>
		</Router>
	);
}

export default App;
