/* eslint-env jest */

"use strict";

const rank = require("../index.js");

it("is a function", () => {
  expect(typeof rank).toBe("function");
});

const card =
  (rank, type) => ({
    rank,
    type,
  });

it("sorts all possible combinations", () => {
  const cardHighQueen = [card("2", "H"), card("4", "H"), card("J", "S"), card("Q", "D"), card("9", "C")];
  const cardHighAce = [card("A", "H"), card("4", "H"), card("J", "S"), card("Q", "D"), card("9", "C")];
  const pairOfThree = [card("3", "H"), card("4", "H"), card("3", "S"), card("Q", "D"), card("9", "C")];
  const pairOfQueen = [card("2", "H"), card("4", "H"), card("Q", "S"), card("Q", "D"), card("9", "C")];
  const doublePairOfNine = [card("3", "H"), card("9", "H"), card("3", "S"), card("9", "D"), card("A", "C")];
  const threeOfAKindOfJack = [card("J", "H"), card("9", "D"), card("J", "S"), card("J", "C"), card("5", "C")];
  const straightOfFive = [card("3", "H"), card("4", "D"), card("2", "S"), card("5", "C"), card("A", "C")];
  const straightOfNine = [card("6", "H"), card("7", "D"), card("9", "S"), card("8", "C"), card("5", "C")];
  const straightOfAce = [card("K", "H"), card("J", "D"), card("A", "S"), card("10", "C"), card("Q", "C")];
  const flushOfEight = [card("2", "D"), card("3", "D"), card("8", "D"), card("5", "D"), card("6", "D")];
  const flushOfJack = [card("3", "H"), card("4", "H"), card("2", "H"), card("5", "H"), card("J", "H")];
  const fullOfThree = [card("3", "D"), card("3", "S"), card("A", "D"), card("3", "H"), card("A", "C")];
  const fullOfSeven = [card("7", "D"), card("7", "S"), card("2", "D"), card("7", "H"), card("2", "C")];
  const pokerOfFour = [card("A", "H"), card("4", "D"), card("4", "S"), card("4", "C"), card("4", "H")];
  const pokerOfAce = [card("A", "H"), card("9", "D"), card("A", "S"), card("A", "C"), card("A", "D")];
  const straightFlushOfFive = [card("3", "D"), card("4", "D"), card("2", "D"), card("5", "D"), card("A", "D")];
  const straightFlushOfNine = [card("6", "H"), card("7", "H"), card("9", "H"), card("8", "H"), card("5", "H")];
  const royalStraightFlush = [card("K", "C"), card("J", "C"), card("A", "C"), card("10", "C"), card("Q", "C")];

  const expectedRank = [
    royalStraightFlush,
    straightFlushOfNine,
    straightFlushOfFive,
    pokerOfAce,
    pokerOfFour,
    fullOfSeven,
    fullOfThree,
    flushOfJack,
    flushOfEight,
    straightOfAce,
    straightOfNine,
    straightOfFive,
    threeOfAKindOfJack,
    doublePairOfNine,
    pairOfQueen,
    pairOfThree,
    cardHighAce,
    cardHighQueen,
  ];

  // Shuffle the competing combinations
  const competingCombinations =
    expectedRank.slice().sort(() => Math.random() - Math.random());

  const royalStraightFlushIndex = competingCombinations.indexOf(royalStraightFlush);

  const sortedRank = rank(competingCombinations);
  expect(sortedRank).toEqual(expectedRank);

  expect(sortedRank[0].index).toBe(royalStraightFlushIndex);
  expect(sortedRank[0].rank).toEqual({
    name: "Royal flush",
    kickers: [],
    rank: "A",
    strength: 9,
  });
});

it("sorts on the basis of kickers", () => {
  const cardHighAceWithQueen = [card("A", "D"), card("8", "H"), card("Q", "S"), card("J", "D"), card("9", "C")];
  const cardHighAceWithKing = [card("A", "H"), card("4", "H"), card("J", "S"), card("K", "D"), card("9", "C")];
  const pairOfQueenWithFour = [card("2", "H"), card("4", "D"), card("Q", "S"), card("Q", "D"), card("9", "C")];
  const pairOfQueenWithFive = [card("2", "D"), card("5", "H"), card("Q", "C"), card("Q", "H"), card("9", "D")];
  const flushOfKingWithNine = [card("3", "H"), card("9", "H"), card("K", "H"), card("Q", "H"), card("2", "H")];
  const flushOfKingWithJack = [card("Q", "D"), card("9", "D"), card("K", "D"), card("J", "D"), card("2", "D")];

  const expectedRank = [
    flushOfKingWithJack,
    flushOfKingWithNine,
    pairOfQueenWithFive,
    pairOfQueenWithFour,
    cardHighAceWithKing,
    cardHighAceWithQueen,
  ];

  // Shuffle the competing combinations
  const competingCombinations =
    expectedRank.slice().sort(() => Math.random() - Math.random());

  const flushOfKingWithJackIndex = competingCombinations.indexOf(flushOfKingWithJack);

  const sortedRank = rank(competingCombinations);
  expect(sortedRank).toEqual(expectedRank);

  expect(sortedRank[0].index).toBe(flushOfKingWithJackIndex);
  expect(sortedRank[0].rank).toEqual({
    name: "Flush",
    kickers: ["Q", "J", "9", "2"],
    rank: "K",
    strength: 5,
  });
});

it("considers all the elements in the kickers array", () => {
  const comb1 = [card("A", "D"), card("K", "D"), card("10", "D"), card("7", "D"), card("2", "C")];
  const comb2 = [card("K", "H"), card("10", "H"), card("A", "H"), card("7", "H"), card("3", "C")];
  const sortedRank = rank([comb1, comb2]);
  expect(sortedRank).toEqual([
    comb2,
    comb1,
  ]);
});

it("recognize ex-equo", () => {
  const pairOfQueen1 = [card("A", "H"), card("Q", "H"), card("Q", "S"), card("3", "D"), card("9", "D")];
  const pairOfQueen2 = [card("A", "D"), card("Q", "P"), card("Q", "D"), card("3", "H"), card("9", "C")];
  const sortedRank = rank([pairOfQueen1, pairOfQueen2]);
  expect(sortedRank).toEqual([
    pairOfQueen1,
    pairOfQueen2,
  ]);
  expect(sortedRank[0].exequo).toBe("#0");
  expect(sortedRank[1].exequo).toBe("#0");
});

it("recognize ex-equo / 2", () => {
  const cardHighAce = [card("A", "H"), card("4", "H"), card("J", "S"), card("Q", "D"), card("9", "C")];
  const pairOfQueen1 = [card("A", "H"), card("Q", "H"), card("Q", "S"), card("3", "D"), card("9", "D")];
  const pairOfQueen2 = [card("A", "D"), card("Q", "P"), card("Q", "D"), card("3", "H"), card("9", "C")];
  const pokerOfAce = [card("A", "H"), card("9", "D"), card("A", "S"), card("A", "C"), card("A", "D")];

  const expectedRank = [
    pokerOfAce,
    pairOfQueen1,
    pairOfQueen2,
    cardHighAce,
  ];

  const sortedRank = rank([pairOfQueen1, cardHighAce, pokerOfAce, pairOfQueen2]);
  expect(sortedRank).toEqual(expectedRank);

  expect(sortedRank[0].index).toBe(2);
  expect(sortedRank[0].rank).toEqual({
    name: "Poker",
    kickers: ["9"],
    rank: "A",
    strength: 7,
  });

  expect(
    sortedRank.filter((rank) => rank.exequo === "#0")
  ).toEqual([pairOfQueen1, pairOfQueen2]);
});

it("recognize multiple ex-equo", () => {
  const cardHighAce1 = [card("A", "H"), card("3", "H"), card("4", "H"), card("5", "H"), card("6", "D")];
  const cardHighAce2 = [card("A", "D"), card("3", "D"), card("4", "D"), card("5", "D"), card("6", "C")];
  const cardHighAce3 = [card("A", "C"), card("3", "C"), card("4", "C"), card("5", "C"), card("6", "S")];
  const pairOfSeven = [card("7", "C"), card("7", "C"), card("8", "D"), card("9", "D"), card("6", "H")];
  const flushOfKing1 = [card("K", "S"), card("Q", "S"), card("J", "S"), card("9", "S"), card("8", "S")];
  const flushOfKing2 = [card("K", "C"), card("Q", "C"), card("J", "C"), card("9", "C"), card("8", "C")];

  const expectedRank = [
    flushOfKing1,
    flushOfKing2,
    pairOfSeven,
    cardHighAce3,
    cardHighAce1,
    cardHighAce2,
  ];

  const sortedRank = rank([cardHighAce3, pairOfSeven, cardHighAce1, flushOfKing1, cardHighAce2, flushOfKing2]);
  expect(sortedRank).toEqual(expectedRank);

  expect(sortedRank[0].index).toBe(3);
  expect(sortedRank[0].rank).toEqual({
    name: "Flush",
    kickers: ["Q", "J", "9", "8"],
    rank: "K",
    strength: 5,
  });

  expect(
    sortedRank.filter((rank) => rank.exequo === "#0")
  ).toEqual([cardHighAce3, cardHighAce1, cardHighAce2]);

  expect(
    sortedRank.filter((rank) => rank.exequo === "#1")
  ).toEqual([flushOfKing1, flushOfKing2]);
});
