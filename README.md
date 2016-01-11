# poker-rank

You can install poker-rank via npm:

```
npm i poker-rank --save
```

## intro

If you are making some sort of poker game, chances are that sooner or later you want to know in a group of cards combination what is the best.

This is exactly what poker-rank is for.

poker-rank expects as input a list of cards combination. A cards combination is a list of five cards object (check [brunoscopelliti/poker-deck](https://github.com/brunoscopelliti/poker-deck)).

```
const combs = [
  [{rank:'2', type:'H'}, {rank:'A', type:'H'}, {rank:'9', type:'C'}, {rank:'J', type:'D'}, {rank:'8', type:'D'}],
  [{rank:'3', type:'C'}, {rank:'3', type:'H'}, {rank:'4', type:'C'}, {rank:'J', type:'C'}, {rank:'Q', type:'S'}]
];
```

poker-rank sorts the input combination by their strength, and returns an object that describes the strength of each combination. The original index of an entry is added to the `index` property of each object.

```
const sortByRank = require('poker-rank');

const sortedCombs = sortByRank(combs);

sortedCombs;

// [
//  { index: 1, strength: 0, rank: 'A', kickers: ['J', '9', '8', '2'] },
//  { index: 0, strength: 1, rank: '3', kickers: ['Q', 'J', '4'] }
// ]
```

poker-rank uses [brunoscopelliti/poker-has](https://github.com/brunoscopelliti/poker-has) to evaluate the strength of a combination.

poker-has also handles **ex-equo**.

In case of ex-equo, the objects have also an `exequo` property.

```
const sortedCombs = sortByRank([
  [{rank:'A', type:'H'}, {rank:'3', type:'H'}, {rank:'4', type:'H'}, {rank:'5', type:'H'}, {rank:'6', type:'D'}],
  [{rank:'A', type:'D'}, {rank:'3', type:'D'}, {rank:'4', type:'D'}, {rank:'5', type:'D'}, {rank:'6', type:'C'}],
  [{rank:'A', type:'C'}, {rank:'3', type:'C'}, {rank:'4', type:'C'}, {rank:'5', type:'C'}, {rank:'6', type:'S'}],
  [{rank:'7', type:'C'}, {rank:'7', type:'C'}, {rank:'10', type:'D'}, {rank:'9', type:'D'}, {rank:'6', type:'H'}],
  [{rank:'K', type:'S'}, {rank:'Q', type:'S'}, {rank:'J', type:'S'}, {rank:'9', type:'S'}, {rank:'8', type:'S'}],
  [{rank:'K', type:'C'}, {rank:'Q', type:'C'}, {rank:'J', type:'C'}, {rank:'9', type:'C'}, {rank:'8', type:'C'}]
]);

sortedCombs;

// [
//  { strength: 16, rank: 'K', kickers: [ 'Q', 'J', '9', '8' ], index: 2, exequo: '#1' },
//  { strength: 16, rank: 'K', kickers: [ 'Q', 'J', '9', '8' ], index: 4, exequo: '#1' },
//  { strength: 1, rank: '7', kickers: [ '10', '9', '6' ], index: 1 },
//  { strength: 0, rank: 'A', kickers: [ '6', '5', '4', '3' ], index: 0, exequo: '#0' },
//  { strength: 0, rank: 'A', kickers: [ '6', '5', '4', '3' ], index: 3, exequo: '#0' },
//  { strength: 0, rank: 'A', kickers: [ '6', '5', '4', '3' ], index: 5, exequo: '#0' }
// ]
```
