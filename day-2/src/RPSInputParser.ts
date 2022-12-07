import {SHAPE} from "./RPSScoreCalculator";
import {MovesToRPSTransformer} from "./MovesToRPSTransformer";

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

