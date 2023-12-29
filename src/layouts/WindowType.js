export default class WindowType {
    constructor(type) {
        this.type = type;
    }

    isMobile = () => this.type === "mobile";

    isTablet = () => this.type === "tablet";

    isComputer = () => this.type === "computer";

    static getType = () => {
        const width = window.innerWidth;
        if (width <= 426) {
            return new WindowType("mobile");
        } else if (width > 426 && width <= 769) {
            return new WindowType("tablet");
        } else {
            return new WindowType("computer");
        }
    };

}