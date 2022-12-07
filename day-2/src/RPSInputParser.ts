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

export type InputRound = [OPPONENT_MOVE, MY_MOVE];

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

