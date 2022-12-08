import {SHAPE} from "./Shape";

export enum OUTCOME {
    WIN,
    LOSS,
    DRAW
}

export class Round {
    constructor(private opponentMove: SHAPE, private myMove: SHAPE) {
    }

    outcome(): OUTCOME {
        if (this.isDraw()) return OUTCOME.DRAW;
        if (this.isLoss()) return OUTCOME.LOSS;
        return OUTCOME.WIN;
    }

    public getMyMove(): SHAPE {
        return this.myMove
    }

    public getOpponentMove(): SHAPE {
        return this.opponentMove
    }

    private isDraw() {
        return this.opponentMove === this.myMove;
    }

    private isLoss() {
        return this.opponentMove === SHAPE.PAPER && this.myMove === SHAPE.ROCK
            || this.opponentMove === SHAPE.ROCK && this.myMove === SHAPE.SCISSORS
            || this.opponentMove === SHAPE.SCISSORS && this.myMove === SHAPE.PAPER;
    }
}