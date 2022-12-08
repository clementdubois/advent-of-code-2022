import {MY_STRATEGY, OPPONENT_MOVE} from "./MovesToRoundStrategy";

export type InputRound = [OPPONENT_MOVE, MY_STRATEGY];

export class RPSInputParser {
    parse(input: string): InputRound[] {
        return RPSInputParser
            .parseRounds(input)
            .map(RPSInputParser.parseMoves)
    }

    private static parseRounds(input: string): string[] {
        const ROUND_SEPARATOR = "\n";
        return input.split(ROUND_SEPARATOR).filter(round => round);
    }

    private static parseMoves(input: string): InputRound {
        const MOVE_SEPARATOR = " ";
        return input.split(MOVE_SEPARATOR).filter(move => move) as InputRound;
    }
}

