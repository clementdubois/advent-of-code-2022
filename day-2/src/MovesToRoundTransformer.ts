import {Round, SHAPE} from "./RPSScoreCalculator";

export enum OPPONENT_MOVE {
    ROCK = "A",
    PAPER = "B",
    SCISSORS = 'C'
}

export enum MY_MOVE {
    ROCK = "X",
    PAPER = "Y",
    SCISSORS = "Z",
}

export abstract class MovesToRoundStrategy {
    transform(rounds: [OPPONENT_MOVE, MY_MOVE][]): Round[] {
        return rounds.map(round => new Round(
            this.transformOpponentMoveToRPS(round[0]),
            this.transformMyMoveToRPS(round[1])
        ))
    }
    protected abstract transformMyMoveToRPS(myOption: MY_MOVE): SHAPE

    protected transformOpponentMoveToRPS(opponentMove: OPPONENT_MOVE): SHAPE {
        switch (opponentMove) {
            case OPPONENT_MOVE.ROCK:
                return SHAPE.ROCK;
            case OPPONENT_MOVE.PAPER:
                return SHAPE.PAPER;
            case OPPONENT_MOVE.SCISSORS:
                return SHAPE.SCISSORS;
        }
    }
}

export class MovesToRoundWithBothMoveStrategy extends MovesToRoundStrategy {
    transformMyMoveToRPS(myMove: MY_MOVE): SHAPE {
        switch (myMove) {
            case MY_MOVE.PAPER:
                return SHAPE.PAPER;
            case MY_MOVE.SCISSORS:
                return SHAPE.SCISSORS;
            case MY_MOVE.ROCK:
                return SHAPE.ROCK;
        }
    }
}