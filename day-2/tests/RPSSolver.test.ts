import {RPSInputParser} from "../src/RPSInputParser";
import {MovesToRoundTransformer} from "../src/MovesToRoundTransformer";
import {RPSScoreCalculator} from "../src/RPSScoreCalculator";
import {RPSSolver} from "../src/RPSSolver";

describe("RPSSolver", () => {
    let rpsSolver : RPSSolver;
    beforeEach(() => {
        const rpsInputParser:RPSInputParser = new RPSInputParser();
        const movesToRPSTransformer : MovesToRoundTransformer = new MovesToRoundTransformer();
        const rpsCalculator : RPSScoreCalculator = new RPSScoreCalculator()
        rpsSolver = new RPSSolver(rpsInputParser, movesToRPSTransformer, rpsCalculator)
    })
    test("Should return 0 if no input", () => {
        const input = "";

        const result = rpsSolver.solve(input);

        expect(result).toEqual(0)
    })

    test("Should return 8 for win with paper", () => {
        const input = "A Y";

        const result = rpsSolver.solve(input);

        expect(result).toEqual(8)
    })

    test("Should return 1 for loss with rock", () => {
        const input = "B X";

        const result = rpsSolver.solve(input);

        expect(result).toEqual(1)
    })

    test("Should return 6 for draw with scissors", () => {
        const input = "C Z";

        const result = rpsSolver.solve(input);

        expect(result).toEqual(6)
    })

    test("Should return 15 for total score of these three rounds", () => {
        const input = "A Y\nB X\nC Z";

        const result = rpsSolver.solve(input);

        expect(result).toEqual(15)
    })
})