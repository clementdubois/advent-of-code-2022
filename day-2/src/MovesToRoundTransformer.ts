import {SHAPE, ShapeHandler} from "./Shape";
import {Round} from "./Round";

export enum OPPONENT_MOVE {
    ROCK = "A",
    PAPER = "B",
    SCISSORS = 'C'
}

type MY_STRATEGY = "X" | "Y" | "Z"

export enum MY_MOVE {
    ROCK = "X",
    PAPER = "Y",
    SCISSORS = "Z",
}

export enum MY_OUTCOME {
    LOSE = "X",
    DRAW = "Y",
    WIN = "Z",
}


export abstract class MovesToRoundStrategy {
    transform(rounds: [OPPONENT_MOVE, MY_STRATEGY][]): Round[] {
        return rounds.map(round => new Round(
            this.transformOpponentMoveToShape(round[0]),
            this.transformMyOptionToShape(round)
        ))
    }
    protected abstract transformMyOptionToShape(round: [OPPONENT_MOVE, MY_STRATEGY]): SHAPE

    protected transformOpponentMoveToShape(opponentMove: OPPONENT_MOVE): SHAPE {
        const opponentShape = ShapeHandler.fromOpponentMove(opponentMove);
        return opponentShape.toShape()
    }
}

export class MovesToRoundWithBothMoveStrategy extends MovesToRoundStrategy {
    transformMyOptionToShape(round: [OPPONENT_MOVE, MY_MOVE]): SHAPE {
        const myMoveShape = ShapeHandler.fromMyMove(round[1])
        return myMoveShape.toShape()
    }
}

export class MovesToRoundOutcomeStrategy extends MovesToRoundStrategy {
    protected transformMyOptionToShape([opponentMove, myOutcome]: [OPPONENT_MOVE, MY_OUTCOME]): SHAPE {
        const opponentMoveShape = ShapeHandler.fromOpponentMove(opponentMove)
        switch (myOutcome) {
            case MY_OUTCOME.WIN:
                return opponentMoveShape.loseAgainst();
            case MY_OUTCOME.DRAW:
                return opponentMoveShape.drawWith();
            case MY_OUTCOME.LOSE:
                return opponentMoveShape.winAgainst()

        }
    }
}