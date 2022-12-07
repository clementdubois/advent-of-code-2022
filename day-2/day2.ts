import fs from "fs";
import {RPSInputParser} from "./src/RPSInputParser";
import {MovesToRoundTransformer} from "./src/MovesToRoundTransformer";
import {RPSScoreCalculator} from "./src/RPSScoreCalculator";
import {RPSSolver} from "./src/RPSSolver";


export const day2 = () => {
    const rpsInputParser:RPSInputParser = new RPSInputParser();
    const movesToRPSTransformer : MovesToRoundTransformer = new MovesToRoundTransformer();
    const rpsCalculator : RPSScoreCalculator = new RPSScoreCalculator()
    const rpsSolver = new RPSSolver(rpsInputParser, movesToRPSTransformer, rpsCalculator)

    const puzzleInput1 = fs.readFileSync("./input.txt").toString()
    console.log("Day 2 - Part 1 : ", rpsSolver.solve(puzzleInput1));
}

