export enum SHAPE {
    ROCK,
    PAPER,
    SCISSORS,
}

export enum OUTCOME {
    WIN,
    LOSS,
    DRAW
}

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

export class Round {
    constructor(private opponentMove: SHAPE, private myMove: SHAPE) {
    }

    outcome(): OUTCOME {
        if (this.isDraw()) return OUTCOME.DRAW;
        if (this.isLoss()) return OUTCOME.LOSS;
        return OUTCOME.WIN;
    }

    public getMyMove(): SHAPE {
        return this.myMove
    }

    private isDraw() {
        return this.opponentMove === this.myMove;
    }

    private isLoss() {
        return this.opponentMove === SHAPE.PAPER && this.myMove === SHAPE.ROCK
            || this.opponentMove === SHAPE.ROCK && this.myMove === SHAPE.SCISSORS
            || this.opponentMove === SHAPE.SCISSORS && this.myMove === SHAPE.PAPER;
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