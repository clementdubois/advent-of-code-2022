import {MY_MOVE, OPPONENT_MOVE} from "./MovesToRoundTransformer";

export enum SHAPE {
    ROCK,
    PAPER,
    SCISSORS,
}

export abstract class ShapeHandler {
    protected constructor(private shape: SHAPE) {
    }

    abstract drawWith(): SHAPE;

    abstract winAgainst(): SHAPE;

    abstract loseAgainst(): SHAPE;

    toShape(): SHAPE {
        return this.shape;
    };

    static fromOpponentMove(opponentMove: OPPONENT_MOVE): ShapeHandler {
        switch (opponentMove) {
            case OPPONENT_MOVE.ROCK:
                return new RockShape();
            case OPPONENT_MOVE.PAPER:
                return new PaperShape();
            case OPPONENT_MOVE.SCISSORS:
                return new ScissorsShape();

        }
    }

    static fromMyMove(myMove: MY_MOVE): ShapeHandler {
        switch (myMove) {
            case MY_MOVE.ROCK:
                return new RockShape();
            case MY_MOVE.PAPER:
                return new PaperShape();
            case MY_MOVE.SCISSORS:
                return new ScissorsShape();

        }
    }
}

class PaperShape extends ShapeHandler {
    constructor() {
        super(SHAPE.PAPER);
    }

    loseAgainst(): SHAPE {
        return SHAPE.SCISSORS;
    }

    winAgainst(): SHAPE {
        return SHAPE.ROCK;
    }

    drawWith(): SHAPE {
        return SHAPE.PAPER;
    }
}

class RockShape extends ShapeHandler {
    constructor() {
        super(SHAPE.ROCK);
    }

    loseAgainst(): SHAPE {
        return SHAPE.PAPER;
    }

    winAgainst(): SHAPE {
        return SHAPE.SCISSORS;
    }

    drawWith(): SHAPE {
        return SHAPE.ROCK;
    }
}

class ScissorsShape extends ShapeHandler {
    constructor() {
        super(SHAPE.SCISSORS);
    }

    loseAgainst(): SHAPE {
        return SHAPE.ROCK;
    }

    winAgainst(): SHAPE {
        return SHAPE.PAPER;
    }

    drawWith(): SHAPE {
        return SHAPE.SCISSORS;
    }
}