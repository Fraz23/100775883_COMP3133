// index.js

const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

// input and output file paths
const INPUT_FILE = path.join(__dirname, "input_countries.csv");
const CANADA_FILE = path.join(__dirname, "canada.txt");
const USA_FILE = path.join(__dirname, "usa.txt");

// a) delete canada.txt and usa.txt if they already exist
[CANADA_FILE, USA_FILE].forEach((filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Deleted existing file: ${filePath}`);
  }
});

// arrays to store filtered rows
const canadaRows = [];
const usaRows = [];

// read CSV using stream + csv-parser
fs.createReadStream(INPUT_FILE)
  .pipe(csv())
  .on("data", (row) => {
    // Normalize country name to lower case for safer comparison
    const country = String(row.country || row.Country || "").toLowerCase();

    if (country === "canada") {
      canadaRows.push(row);
    } else if (
      country === "united states" ||
      country === "united states of america" ||
      country === "usa"
    ) {
      usaRows.push(row);
    }
  })
  .on("end", () => {
    console.log("Finished reading CSV file.");

    // b) write Canada data to canada.txt
    writeCountryFile(CANADA_FILE, canadaRows, "canada");

    // c) write United States data to usa.txt
    writeCountryFile(USA_FILE, usaRows, "united states");

    console.log("All files written.");
  })
  .on("error", (err) => {
    console.error("Error reading CSV:", err);
  });

/**
 * Write an array of row objects to a text file in CSV format:
 * country,year,population
 */
function writeCountryFile(outputPath, rows, countryName) {
  if (!rows.length) {
    console.warn(`No rows found for ${countryName}.`);
    return;
  }

  // Assume CSV has columns: country, year, population
  // Adjust keys if your CSV uses different column names
  const header = "country,year,population\n";
  const lines = rows
    .map((row) => {
      const c = row.country || row.Country;
      const y = row.year || row.Year;
      const p = row.population || row.Population;
      return `${c},${y},${p}`;
    })
    .join("\n");

  fs.writeFileSync(outputPath, header + lines + "\n", "utf8");
  console.log(`Wrote ${rows.length} rows to ${outputPath}`);
}
