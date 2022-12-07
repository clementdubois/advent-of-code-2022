import {SHAPE} from "./RPSScoreCalculator";

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

export class StringInputToRoundParser {
    private inputMoveToRPSTransformer: MovesToRPSTransformer;

    constructor() {
        this.inputMoveToRPSTransformer = new MovesToRPSTransformer();
    }

    parse(input: string): [SHAPE, SHAPE][] {
        const moves = StringInputToRoundParser
            .parseRounds(input)
            .map(StringInputToRoundParser.parseMoves)
        return this.inputMoveToRPSTransformer.transform(moves)
    }

    private static parseRounds(input: string) {
        return input.split("\n").filter(round => round);
    }

    private static parseMoves(input: string) {
        const MOVE_SEPARATOR = " ";
        return input.split(MOVE_SEPARATOR).filter(move => move) as [OPPONENT_MOVE, MY_MOVE];
    }


}

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