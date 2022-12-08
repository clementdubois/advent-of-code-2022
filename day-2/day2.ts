import fs from "fs";
import {RPSInputParser} from "./src/RPSInputParser";
import {
    MovesToRoundOutcomeStrategy,
    MovesToRoundStrategy,
    MovesToRoundWithBothMoveStrategy
} from "./src/MovesToRoundStrategy";
import {RPSScoreCalculator} from "./src/RPSScoreCalculator";
import {RPSSolver} from "./src/RPSSolver";


export const day2 = () => {
    const rpsInputParser = new RPSInputParser();
    const movesToRPSTransformer  = new MovesToRoundWithBothMoveStrategy();
    const rpsCalculator = new RPSScoreCalculator()
    const rpsSolver = new RPSSolver(rpsInputParser, movesToRPSTransformer, rpsCalculator)

    const puzzleInput1 = fs.readFileSync(__dirname + "/input.txt").toString()
    console.log("Day 2 - Part 1 : ", rpsSolver.solve(puzzleInput1));

    const movesToRPSTransformer2 = new MovesToRoundOutcomeStrategy();
    const rpsSolver2 = new RPSSolver(rpsInputParser, movesToRPSTransformer2, rpsCalculator)
    console.log("Day 2 - Part 2 : ", rpsSolver2.solve(puzzleInput1));

}

