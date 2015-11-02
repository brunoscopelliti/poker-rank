
const tape = require('tape');
const rank = require('../index.js');



tape('poker-rank:', function(t) { t.end(); });

tape('check interface', function(t) {
  t.equal(typeof rank, 'function', 'rank is a function');
  t.end();
});

tape('rank all combinations', function(t) {

  const rank_A = Object.freeze([
    {rank:'A', type:'H'},
    {rank:'4', type:'H'},
    {rank:'J', type:'S'},
    {rank:'Q', type:'D'},
    {rank:'9', type:'C'}
  ]);

  const pair_of_Q = Object.freeze([
    {rank:'2', type:'H'},
    {rank:'4', type:'H'},
    {rank:'Q', type:'S'},
    {rank:'Q', type:'D'},
    {rank:'9', type:'C'}
  ]);

  const pair_of_3 = Object.freeze([
    {rank:'3', type:'H'},
    {rank:'4', type:'H'},
    {rank:'3', type:'S'},
    {rank:'Q', type:'D'},
    {rank:'9', type:'C'}
  ]);

  const doublePair_of_9 = Object.freeze([
    {rank:'3', type:'H'},
    {rank:'9', type:'H'},
    {rank:'3', type:'S'},
    {rank:'9', type:'D'},
    {rank:'A', type:'C'}
  ]);

  const threeOfAKind_of_J = Object.freeze([
    {rank:'J', type:'H'},
    {rank:'9', type:'D'},
    {rank:'J', type:'S'},
    {rank:'J', type:'C'},
    {rank:'5', type:'C'}
  ]);

  const stright_of_9 = Object.freeze([
    {rank:'6', type:'H'},
    {rank:'7', type:'D'},
    {rank:'9', type:'S'},
    {rank:'8', type:'C'},
    {rank:'5', type:'C'}
  ]);

  const stright_of_A_top = Object.freeze([
    {rank:'K', type:'H'},
    {rank:'J', type:'D'},
    {rank:'A', type:'S'},
    {rank:'10', type:'C'},
    {rank:'Q', type:'C'}
  ]);

  const stright_of_A_bottom = Object.freeze([
    {rank:'3', type:'H'},
    {rank:'4', type:'D'},
    {rank:'2', type:'S'},
    {rank:'5', type:'C'},
    {rank:'A', type:'C'}
  ]);

  const flush_of_J = Object.freeze([
    {rank:'3', type:'H'},
    {rank:'4', type:'H'},
    {rank:'2', type:'H'},
    {rank:'5', type:'H'},
    {rank:'J', type:'H'}
  ]);

  const flush_of_8 = Object.freeze([
    {rank:'2', type:'D'},
    {rank:'3', type:'D'},
    {rank:'8', type:'D'},
    {rank:'5', type:'D'},
    {rank:'6', type:'D'}
  ]);

  const full_of_7 = Object.freeze([
    {rank:'7', type:'D'},
    {rank:'7', type:'S'},
    {rank:'2', type:'D'},
    {rank:'7', type:'H'},
    {rank:'2', type:'C'}
  ]);

  const full_of_3 = Object.freeze([
    {rank:'3', type:'D'},
    {rank:'3', type:'S'},
    {rank:'A', type:'D'},
    {rank:'3', type:'H'},
    {rank:'A', type:'C'}
  ]);

  const poker_of_A = Object.freeze([
    {rank:'A', type:'H'},
    {rank:'9', type:'D'},
    {rank:'A', type:'S'},
    {rank:'A', type:'C'},
    {rank:'A', type:'D'}
  ]);

  const strightFlush_of_9 = Object.freeze([
    {rank:'6', type:'H'},
    {rank:'7', type:'H'},
    {rank:'9', type:'H'},
    {rank:'8', type:'H'},
    {rank:'5', type:'H'}
  ]);

  const strightFlush_of_A_bottom = Object.freeze([
    {rank:'3', type:'D'},
    {rank:'4', type:'D'},
    {rank:'2', type:'D'},
    {rank:'5', type:'D'},
    {rank:'A', type:'D'}
  ]);

  const royalStrightFlush = Object.freeze([
    {rank:'K', type:'C'},
    {rank:'J', type:'C'},
    {rank:'A', type:'C'},
    {rank:'10', type:'C'},
    {rank:'Q', type:'C'}
  ]);

  const expectedOrder = [8, 0, 10, 6, 2, 7, 15, 11, 3, 13, 12, 4, 9, 14, 5, 1];

  const hands = [
    strightFlush_of_9,
    rank_A,
    full_of_7,
    stright_of_A_top,
    threeOfAKind_of_J,
    pair_of_3,
    poker_of_A,
    full_of_3,
    royalStrightFlush,
    doublePair_of_9,
    strightFlush_of_A_bottom,
    flush_of_8,
    stright_of_A_bottom,
    stright_of_9,
    pair_of_Q,
    flush_of_J
  ];

  t.deepEqual(rank(hands).map(rank => rank.index), expectedOrder);

  t.end();

});

tape('rank on kickers', function(t) {

  const rank_A = Object.freeze([
    {rank:'A', type:'H'},
    {rank:'4', type:'H'},
    {rank:'J', type:'S'},
    {rank:'Q', type:'D'},
    {rank:'9', type:'C'}
  ]);

  const pair_of_Q = Object.freeze([
    {rank:'2', type:'H'},
    {rank:'4', type:'H'},
    {rank:'Q', type:'S'},
    {rank:'Q', type:'D'},
    {rank:'9', type:'C'}
  ]);

  const pair_of_Q_bis = Object.freeze([
    {rank:'2', type:'D'},
    {rank:'5', type:'H'},
    {rank:'Q', type:'C'},
    {rank:'Q', type:'H'},
    {rank:'9', type:'D'}
  ]);

  const pair_of_3 = Object.freeze([
    {rank:'3', type:'H'},
    {rank:'4', type:'H'},
    {rank:'3', type:'S'},
    {rank:'Q', type:'D'},
    {rank:'9', type:'C'}
  ]);

  const doublePair_of_9 = Object.freeze([
    {rank:'3', type:'H'},
    {rank:'9', type:'H'},
    {rank:'3', type:'S'},
    {rank:'9', type:'D'},
    {rank:'A', type:'C'}
  ]);

  const threeOfAKind_of_J = Object.freeze([
    {rank:'J', type:'H'},
    {rank:'9', type:'D'},
    {rank:'J', type:'S'},
    {rank:'J', type:'C'},
    {rank:'5', type:'C'}
  ]);

  const royalStrightFlush = Object.freeze([
    {rank:'K', type:'C'},
    {rank:'J', type:'C'},
    {rank:'A', type:'C'},
    {rank:'10', type:'C'},
    {rank:'Q', type:'C'}
  ]);

  const expectedOrder = [4, 2, 5, 6, 0, 3, 1];

  const hands = [
    pair_of_Q,
    rank_A,
    threeOfAKind_of_J,
    pair_of_3,
    royalStrightFlush,
    doublePair_of_9,
    pair_of_Q_bis
  ];

  t.deepEqual(rank(hands).map(rank => rank.index), expectedOrder);

  t.end();

});

tape('rank with ex-equo', function(t) {

  const rank_A = Object.freeze([
    {rank:'A', type:'H'},
    {rank:'4', type:'H'},
    {rank:'J', type:'S'},
    {rank:'Q', type:'D'},
    {rank:'9', type:'C'}
  ]);

  const pair_of_Q = Object.freeze([
    {rank:'2', type:'H'},
    {rank:'4', type:'H'},
    {rank:'Q', type:'S'},
    {rank:'Q', type:'D'},
    {rank:'9', type:'C'}
  ]);

  const pair_of_Q_bis = Object.freeze([
    {rank:'2', type:'D'},
    {rank:'5', type:'H'},
    {rank:'Q', type:'C'},
    {rank:'Q', type:'H'},
    {rank:'9', type:'D'}
  ]);

  const doublePair_of_9 = Object.freeze([
    {rank:'3', type:'H'},
    {rank:'9', type:'H'},
    {rank:'3', type:'S'},
    {rank:'9', type:'D'},
    {rank:'A', type:'C'}
  ]);

  const doublePair_of_9_exequo = Object.freeze([
    {rank:'3', type:'C'},
    {rank:'9', type:'S'},
    {rank:'3', type:'D'},
    {rank:'9', type:'C'},
    {rank:'A', type:'D'}
  ]);

  const expectedOrder = [0, 4, 1, 3, 2];

  const hands = [
    doublePair_of_9, pair_of_Q_bis, rank_A, pair_of_Q, doublePair_of_9_exequo
  ];

  const sortedHands = rank(hands);

  t.deepEqual(sortedHands.map(rank => rank.index), expectedOrder);

  const exequoHands = sortedHands.filter(rank => typeof rank.exequo != 'undefined')

  t.equal(exequoHands.length, 2);
  t.equal(exequoHands[0].exequo, '#0');
  t.equal(exequoHands[1].exequo, '#0');

  t.end();

});

tape('rank with more ex-equo', function(t) {

  const rank_A_1 = Object.freeze([
    {rank:'A', type:'H'},
    {rank:'3', type:'H'},
    {rank:'4', type:'H'},
    {rank:'5', type:'H'},
    {rank:'6', type:'D'}
  ]);

  const rank_A_2 = Object.freeze([
    {rank:'A', type:'D'},
    {rank:'3', type:'D'},
    {rank:'4', type:'D'},
    {rank:'5', type:'D'},
    {rank:'6', type:'C'}
  ]);

  const rank_A_3 = Object.freeze([
    {rank:'A', type:'C'},
    {rank:'3', type:'C'},
    {rank:'4', type:'C'},
    {rank:'5', type:'C'},
    {rank:'6', type:'S'}
  ]);

  const pair_of_7 = Object.freeze([
    {rank:'7', type:'C'},
    {rank:'7', type:'C'},
    {rank:'10', type:'D'},
    {rank:'9', type:'D'},
    {rank:'6', type:'H'}
  ]);

  const flush_of_K_1 = Object.freeze([
    {rank:'K', type:'S'},
    {rank:'Q', type:'S'},
    {rank:'J', type:'S'},
    {rank:'9', type:'S'},
    {rank:'8', type:'S'}
  ]);

  const flush_of_K_2 = Object.freeze([
    {rank:'K', type:'C'},
    {rank:'Q', type:'C'},
    {rank:'J', type:'C'},
    {rank:'9', type:'C'},
    {rank:'8', type:'C'}
  ]);


  const expectedOrder = [2, 4, 1, 0, 3, 5];

  const hands = [
    rank_A_3, pair_of_7, flush_of_K_2, rank_A_1, flush_of_K_1, rank_A_2
  ];

  const sortedHands = rank(hands);

  t.deepEqual(sortedHands.map(rank => rank.index), expectedOrder);

  t.equal(sortedHands.filter(rank => rank.exequo == '#0').length, 3);
  t.equal(sortedHands.filter(rank => rank.exequo == '#1').length, 2);

  t.end();

});
