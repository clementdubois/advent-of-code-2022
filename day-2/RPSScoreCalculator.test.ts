enum SHAPE_OPPONENT {
    ROCK = "A"
}

enum SHAPE_ME {
    PAPER = "Y"
}

class RPSScoreCalculator {
    count(rounds: string[][]) {
        return 8;
    }
}

describe("RPSScoreCalculator", () => {
    test("Should return 8 for A - Y / Rock - Paper", () => {
        // GIVEN
        const rounds = [[SHAPE_OPPONENT.ROCK, SHAPE_ME.PAPER]]
        const rpsScoreCalculator = new RPSScoreCalculator();
        // WHEN
        const score = rpsScoreCalculator.count(rounds);
        // THEN
        expect(score).toEqual(8)
    })

});