import {RPSInputParser} from "../src/RPSInputParser";
import {MovesToRoundTransformer} from "../src/MovesToRoundTransformer";
import {RPSScoreCalculator} from "../src/RPSScoreCalculator";

class RPSSolver {
    constructor(
        private rpsInputParser: RPSInputParser,
        private movesToRPSTransformer: MovesToRoundTransformer,
        private rpsScoreCalculator: RPSScoreCalculator) {
    }

    solve(input: string): number {
        const parsedInput = this.rpsInputParser.parse(input);
        const rpsRounds = this.movesToRPSTransformer.transform(parsedInput);
        return this.rpsScoreCalculator.getTotalScore(rpsRounds)
    }
}

describe("RPSSolver", () => {
    let rpsSolver : RPSSolver;
    beforeEach(() => {
        const rpsInputParser:RPSInputParser = new RPSInputParser();
        const movesToRPSTransformer : MovesToRoundTransformer = new MovesToRoundTransformer();
        const rpsCalculator : RPSScoreCalculator = new RPSScoreCalculator()
        rpsSolver = new RPSSolver(rpsInputParser, movesToRPSTransformer, rpsCalculator)
    })
    test("Doit renvoyer 0 si rien dans l'input", () => {
        const input = "";

        const result = rpsSolver.solve(input);

        expect(result).toEqual(0)
    })

    test("Doit renvoyer 8 si A Y", () => {
        const input = "A Y";

        const result = rpsSolver.solve(input);

        expect(result).toEqual(8)
    })
})