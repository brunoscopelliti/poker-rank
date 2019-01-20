# poker-rank

You can install [poker-rank](https://www.npmjs.com/package/poker-rank) via npm:

```
npm i poker-rank --save
```

## intro

If you are making some sort of poker game, chances are that sooner or later you want to know in a group of cards combination what is the best.

This is exactly what `poker-rank` is for.

`poker-rank` expects as input a list of cards combination. A cards combination is a list of five cards object (check [brunoscopelliti/poker-deck](https://github.com/brunoscopelliti/poker-deck)).

It sorts the input by the strength of the combination. The original index of each entry is added as `index` property on each entry.

```js
const sortByRank = require("poker-rank");

const sortedCombs = sortByRank([
  [{ rank: "A", type: "C" },
  { rank: "9", type: "H" }, { rank: "J", type: "C" }, { rank: "8", type: "C" }, { rank: "2", type: "C" }]
  [{ rank: "Q", type: "C" }, { rank: "3", type: "D" }, { rank: "3", type: "S" }, { rank: "J", type: "C" }, { rank: "4", type: "C" }],
]);

sortedCombs;

// [
//   [
//     { rank: "Q", type: "C" },
//     { rank: "3", type: "D" },
//     { rank: "3", type: "S" },
//     { rank: "J", type: "C" },
//     { rank: "4", type: "C" },
//     index: 0,
//     rank: {
//       strength: 1,
//       rank: "3",
//       kickers: [
//         "Q",
//         "J",
//         "4",
//       ]
//     }
//   ],
//   [
//     { rank: "A", type: "C" },
//     { rank: "9", type: "H" },
//     { rank: "J", type: "C" },
//     { rank: "8", type: "C" },
//     { rank: "2", type: "C" },
//     index: 0,
//     rank: {
//       strength: 0,
//       rank: "A",
//       kickers: [
//         "J", 
//         "9", 
//         "8",
//         "2",
//       ]
//     }
//   ]
// ]
```

`poker-rank` uses [brunoscopelliti/poker-has](https://github.com/brunoscopelliti/poker-has) to evaluate the strength of a combination.

`poker-has` also handles **ex-equo**. In case of ex-equo, the objects have also an `exequo` property.

