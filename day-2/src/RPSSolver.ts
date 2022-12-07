import {RPSInputParser} from "./RPSInputParser";
import {MovesToRoundWithBothMoveStrategy} from "./MovesToRoundTransformer";
import {RPSScoreCalculator} from "./RPSScoreCalculator";

export class RPSSolver {
    constructor(
        private rpsInputParser: RPSInputParser,
        private movesToRPSTransformer: MovesToRoundWithBothMoveStrategy,
        private rpsScoreCalculator: RPSScoreCalculator) {
    }

    solve(input: string): number {
        const parsedInput = this.rpsInputParser.parse(input);
        const rpsRounds = this.movesToRPSTransformer.transform(parsedInput);
        return this.rpsScoreCalculator.getTotalScore(rpsRounds)
    }
}