export class PositionClassName {
    public readonly className: string;

    private constructor(value: string) {
        this.className = value;
    }

    public static top(): PositionClassName {
        return new PositionClassName("top");
    }

    public static left(): PositionClassName {
        return new PositionClassName("left");
    }

    public static bottom(): PositionClassName {
        return new PositionClassName("bottom");
    }

    public static right(): PositionClassName {
        return new PositionClassName("right");
    }
}

export class Position {
    private readonly top: number;
    private readonly left: number;
    private readonly bottom: number;
    private readonly right: number;

    public constructor({top, left, bottom, right}) {
        this.top = top;
        this.left = left;
        this.bottom = bottom;
        this.right = right;
    }

    public getPosition() {
        return {
            top: this.top,
            left: this.left,
            bottom: this.bottom,
            right: this.right
        };
    }
}
