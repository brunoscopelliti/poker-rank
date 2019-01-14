"use strict";

const getHandRank = require("poker-has");

const cardsRank = require("./domain/rank-cards");

const getCardRank =
  (rank) => cardsRank.indexOf(rank);

/**
 * Sort the hands passed as input by ranking.
 * The module brunoscopelliti/poker-has is used to compute the strenght of a combination.
 * The original index of a combination is added as `index` property on each entry.
 * @name rank
 * @param {Card[][]} competingCombinations
 * @return {Card[][]}
 */
function rank (competingCombinations) {
  let exequoCount = -1;

  return competingCombinations
    .map((cards, i) => {
      /**
       * @name rank
       * @type CombinationStrength
       */
      const rank = getHandRank(cards);
      cards.index = i;
      cards.rank = rank;
      return cards;
    })
    .sort(function sortByRank (comb1, comb2) {
      const rank1 = comb1.rank;
      const rank2 = comb2.rank;
      if (rank1.strength !== rank2.strength) {
        // different point, eg. pair vs poker
        return rank2.strength - rank1.strength;
      }

      const val1 = getCardRank(rank1.rank);
      const val2 = getCardRank(rank2.rank);

      if (val1 !== val2) {
        // different point rank, eg. pair of 3 vs pair of 7
        return val2 - val1;
      }

      for (let i = 0; i < rank1.kickers.length; i++) {
        const kicker1 = getCardRank(rank1.kickers[i]);
        const kicker2 = getCardRank(rank2.kickers[i]);

        if (kicker1 !== kicker2) {
          // different kickers, eg. pair of 3 (with J, 4, 2) vs pair of 3 (with J, 7, 2)
          return kicker2 - kicker1;
        }
      }

      // ex-equo, eg. both are flush, etc.
      const label = comb1.exequo || comb2.exequo || "#" + (++exequoCount);
      comb1.exequo = comb2.exequo = label;
    });
}

module.exports = rank;

/**
 * @typedef {Object} Card
 * @property {string} type
 * @property {string} rank
 */

/**
 * @typedef {Object} CombinationStrength
 * @property {number} strength
 * @property {string} rank
 * @property {string[]} kickers
 */
