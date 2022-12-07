import {Round, SHAPE} from "./RPSScoreCalculator";

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
            this.transformOpponentMoveToRPS(round[0]),
            this.transformMyMoveToRPS(round)
        ))
    }

    protected abstract transformMyMoveToRPS(round: [OPPONENT_MOVE, MY_STRATEGY]): SHAPE

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
    transformMyMoveToRPS(round: [OPPONENT_MOVE, MY_MOVE]): SHAPE {
        const myMove = round[1]
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

export class MovesToRoundOutcomeStrategy extends MovesToRoundStrategy {
    protected transformMyMoveToRPS([opponentMove, myOutcome]: [OPPONENT_MOVE, MY_OUTCOME]): SHAPE {
        switch (myOutcome) {
            case MY_OUTCOME.WIN:
                return MovesToRoundOutcomeStrategy.playToWin(opponentMove);
            case MY_OUTCOME.DRAW:
                return MovesToRoundOutcomeStrategy.playToDraw(opponentMove);
            case MY_OUTCOME.LOSE:
                return MovesToRoundOutcomeStrategy.playToLose(opponentMove);

        }
    }

    private static playToLose(opponentMove: OPPONENT_MOVE): SHAPE {
        switch (opponentMove) {
            case OPPONENT_MOVE.ROCK:
                return SHAPE.SCISSORS;
            case OPPONENT_MOVE.PAPER:
                return SHAPE.ROCK;
            case OPPONENT_MOVE.SCISSORS:
                return SHAPE.PAPER;
        }
    }

    private static playToDraw(opponentMove: OPPONENT_MOVE): SHAPE {
        switch (opponentMove) {
            case OPPONENT_MOVE.ROCK:
                return SHAPE.ROCK;
            case OPPONENT_MOVE.PAPER:
                return SHAPE.PAPER;
            case OPPONENT_MOVE.SCISSORS:
                return SHAPE.SCISSORS;
        }
    }

    private static playToWin(opponentMove: OPPONENT_MOVE): SHAPE {
        switch (opponentMove) {
            case OPPONENT_MOVE.ROCK:
                return SHAPE.PAPER;
            case OPPONENT_MOVE.PAPER:
                return SHAPE.SCISSORS;
            case OPPONENT_MOVE.SCISSORS:
                return SHAPE.ROCK;
        }
    }
}