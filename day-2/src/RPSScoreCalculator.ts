import {SHAPE} from "./entites/Shape";
import {OUTCOME, Round} from "./entites/Round";

export class RPSScoreCalculator {
    private scoreOutcomeCalculator: ScoreOutcomeCalculator;
    private scoreBonusCalculator: ScoreBonusCalculator;

    constructor() {
        this.scoreOutcomeCalculator = new ScoreOutcomeCalculator()
        this.scoreBonusCalculator = new ScoreBonusCalculator()
    }

    getTotalScore(rounds: Round[]) {
        return rounds.reduce((total, round) =>
            this.getScoreForRound(round) + total, 0
        );
    }

    private getScoreForRound(round: Round) {
        return this.scoreOutcomeCalculator.count(round) + this.scoreBonusCalculator.count(round.getMyMove());
    }
}

export class ScoreOutcomeCalculator {
    private static WIN_SCORE = 6;
    private static DRAW_SCORE = 3;
    private static LOSS_SCORE = 0;

    count(round: Round) {
        switch (round.outcome()) {
            case OUTCOME.WIN:
                return ScoreOutcomeCalculator.WIN_SCORE;
            case OUTCOME.DRAW:
                return ScoreOutcomeCalculator.DRAW_SCORE;
            case OUTCOME.LOSS :
                return ScoreOutcomeCalculator.LOSS_SCORE;
        }
    }
}

export class ScoreBonusCalculator {
    count(shape: SHAPE): number {
        switch (shape) {
            case SHAPE.ROCK:
                return 1;
            case SHAPE.PAPER:
                return 2;
            case SHAPE.SCISSORS:
                return 3;

        }
    }
}