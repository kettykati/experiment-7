// index.js
const { of, interval, concat, merge, zip } = require("rxjs");
const {
  map,
  filter,
  mergeMap,
  take,
  reduce,
  toArray,
} = require("rxjs/operators");

// Function to print headers
function header(title) {
  console.log("\n=== " + title + " ===");
}

// MAP
header("MAP");
of(1, 2, 3, 4, 5)
  .pipe(map((n) => n * 2))
  .subscribe(
    (v) => console.log(v),
    null,
    () => console.log("MAP completed")
  );

// FILTER
header("FILTER");
of(1, 2, 3, 4, 5, 6)
  .pipe(filter((n) => n % 2 === 0))
  .subscribe(
    (v) => console.log(v),
    null,
    () => console.log("FILTER completed")
  );

// FLATMAP / MERGEMAP
header("FLATMAP");
of("A", "B", "C")
  .pipe(mergeMap((letter) => of(letter + "1", letter + "2")))
  .subscribe(
    (v) => console.log(v),
    null,
    () => console.log("FLATMAP completed")
  );

// REDUCE
header("REDUCE");
of(1, 2, 3, 4, 5)
  .pipe(reduce((acc, val) => acc + val, 0))
  .subscribe((sum) => console.log("Sum:", sum));

// MERGE
header("MERGE");
const a = interval(150).pipe(
  take(4),
  map((i) => "A" + (i + 1))
);
const b = interval(100).pipe(
  take(4),
  map((i) => "B" + (i + 1))
);
merge(a, b)
  .pipe(toArray())
  .subscribe(
    (arr) => console.log("Merged:", arr),
    null,
    () => console.log("MERGE completed")
  );

// ZIP
header("ZIP");
const names = of("Latte", "Cappuccino", "Espresso");
const prices = of(120, 150, 100);
zip(names, prices, (n, p) => `${n} - ₹${p}`)
  .pipe(toArray())
  .subscribe(
    (arr) => console.log("Zipped:", arr),
    null,
    () => console.log("ZIP completed")
  );

// CONCAT
header("CONCAT");
concat(of("Hot Coffee", "Americano"), of("Cold Coffee", "Iced Latte"))
  .pipe(toArray())
  .subscribe(
    (arr) => console.log("Concat:", arr),
    null,
    () => console.log("CONCAT completed")
  );
