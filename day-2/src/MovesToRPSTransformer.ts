import {SHAPE} from "./RPSScoreCalculator";
import {MY_MOVE, OPPONENT_MOVE} from "./RPSInputParser";

export class MovesToRPSTransformer {
    transform(rounds: [OPPONENT_MOVE, MY_MOVE][]): [SHAPE, SHAPE][] {
        return rounds.map(round => [
            MovesToRPSTransformer.transformOpponentMoveToRPS(round[0]),
            MovesToRPSTransformer.transformMyMoveToRPS(round[1])
        ])
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