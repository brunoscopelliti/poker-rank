
'use strict';

const getHandRank = require('poker-has');

const cardsRank = require('./domain/rank-cards');


function getCardRank(rank){
  return cardsRank.indexOf(rank);
}


/*
 * Sort the hands passed as input by ranking.
 *
 * @example
 * input >
 *  rank([
 *    [{ rank: '2', type: 'H'}, { rank: 'A', type: 'H'}, { rank: '9', type: 'C'}, { rank: 'J', type: 'D'}, { rank: '8', type: 'D'}],
 *    [{ rank: '3', type: 'C'}, { rank: '3', type: 'H'}, { rank: '4', type: 'C'}, { rank: 'J', type: 'C'}, { rank: 'Q', type: 'S'}],
 *    ...,
 *    [{ rank: 'A', type: 'S'}, { rank: '9', type: 'S'}, { rank: 'A', type: 'C'}, { rank: 'A', type: 'D'}, { rank: '10', type: 'H'}]
 *  ])
 *
 * < output:
 * The same list passed as input sorted by hand rankings;
 * the original index of an hand is added to the 'index' property of each entry of the least.
 *
 */
exports = module.exports = function rank(hands){

  let exequoCount = -1;

  return hands
    .map(function setIndex(hand, i) {
      let rank = getHandRank(hand);
      rank.index = i;
      return rank;
    })
    .sort(function sortByRank(a, b){

      if (a.strength != b.strength){
        return b.strength - a.strength;
      }

      let aRank = getCardRank(a.rank);
      let bRank = getCardRank(b.rank);
      if (aRank != bRank){
        return bRank - aRank;
      }

      for (let i=0; i<a.kickers.length; i++){
        let aKickerRank = getCardRank(a.kickers[i]);
        let bKickerRank = getCardRank(b.kickers[i]);
        if (aKickerRank != bKickerRank){
          return bKickerRank - aKickerRank;
        }
      }

      // ex-equo
      let label = a.exequo || b.exequo || '#' + (++exequoCount);
      a.exequo  = b.exequo = label;

    });

}
