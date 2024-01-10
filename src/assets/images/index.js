export const Images = {
	get: (imgName) => {
		try {
			return require(`./${imgName}`);
		} catch (e) {
			return Images.noImage;
		}
	},
	noImage: require("./no-image.png"),
	food_1: require("./food-photography-an-overview.jpg"),
	food_2: require("./food-photography.jpg"),
	food_3: require("./food-photography-in-dubai.jpg"),
	food_4: require("./food-photography_1.jpg"),
};