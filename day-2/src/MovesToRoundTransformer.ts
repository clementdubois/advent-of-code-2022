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

interface MovesToRoundTransformerStrategy {
    transform(rounds: [OPPONENT_MOVE, MY_MOVE][]): Round[]
}

export class MovesToRoundWithBothMoveTransformerStrategy implements MovesToRoundTransformerStrategy{
    transform(rounds: [OPPONENT_MOVE, MY_MOVE][]): Round[] {
        return rounds.map(round => new Round(
            MovesToRoundWithBothMoveTransformerStrategy.transformOpponentMoveToRPS(round[0]),
            MovesToRoundWithBothMoveTransformerStrategy.transformMyMoveToRPS(round[1])
        ))
    }

    private static transformOpponentMoveToRPS(opponentMove: OPPONENT_MOVE): SHAPE {
        switch (opponentMove) {
            case OPPONENT_MOVE.ROCK:
                return SHAPE.ROCK;
            case OPPONENT_MOVE.PAPER:
                return SHAPE.PAPER;
            case OPPONENT_MOVE.SCISSORS:
                return SHAPE.SCISSORS;
        }
    }

    private static transformMyMoveToRPS(myMove: MY_MOVE): SHAPE {
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