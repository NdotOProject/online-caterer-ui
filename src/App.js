import './styles/App.scss';
import './styles/Colors.scss';
import Layout from "./layouts/Layout";
import Carousel, {
	CarouselButton,
	CarouselNavigator,
	NavigatorPosition,
	NavigatorStyle
} from "./components/Carousel";

function App() {

	document.title = "Online Catering";

	return (
		<Layout>
			<Carousel
				navigator={new CarouselNavigator({
					visible: true,
					position: NavigatorPosition.BOTTOM,
					length: 5,
					style: NavigatorStyle.DOT(true),
				})}
				// navigator={CarouselNavigator.none()}
				nextButton={CarouselButton.next({
					alwaysShowIcon: true
				})}
				previousButton={CarouselButton.previous({
					alwaysShowIcon: true
				})}
			>
				<div>
					Page 1
				</div>
				<div>
					Page 2
				</div>
				<div>
					Page 3
				</div>
				<div>
					Page 4
				</div>
				<div>
					Page 5
				</div>
				{/*<div style={{*/}
				{/*	width: "100%",*/}
				{/*	height: "100%",*/}
				{/*	display: "inline-flex",*/}
				{/*	alignItems: "center",*/}
				{/*	justifyContent: "center",*/}
				{/*	backgroundColor: "grey",*/}
				{/*}}>*/}
				{/*	Page 6*/}
				{/*</div>*/}
				{/*<div style={{*/}
				{/*	width: "100%",*/}
				{/*	height: "100%",*/}
				{/*	display: "inline-flex",*/}
				{/*	alignItems: "center",*/}
				{/*	justifyContent: "center",*/}
				{/*	backgroundColor: "gold",*/}
				{/*}}>*/}
				{/*	Page 7*/}
				{/*</div>*/}
			</Carousel>
		</Layout>
	);
}

export default App;
