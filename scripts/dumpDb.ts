/// <reference path="../node_modules/@beerjson/beerjson/types/ts/beerjson.d.ts" />
import { Database, OPEN_READONLY, verbose } from "sqlite3";
import { writeFile } from "fs";

const dbFile = process.argv[2];

const style_sql = `
        SELECT
            name,
            s_type,
            category,
            category_number 
            style_letter,
            style_guide,
            og_min,
            og_max,
            fg_min,
            fg_max,
            ibu_min,
            ibu_max,
            color_min,
            color_max,
            abv_min,
            abv_max,
            carb_min,
            carb_max,
            notes,
            ingredients,
            examples
        FROM
            style
`;

const db = new Database(dbFile, OPEN_READONLY, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});

db.serialize(() => {
  const styles: BeerJSON.StyleType[] = [];
  db.each(
    style_sql,
    (err, row) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      const style: BeerJSON.StyleType = {
        name: row.name,
        type: row.s_type,
        category: row.category,
        style_guide: row.style_guide,
        style_letter: row.style_letter,
        original_gravity: {
          minimum: {
            value: row.og_min,
            unit: "sg",
          },
          maximum: {
            value: row.og_max,
            unit: "sg",
          },
        },
        final_gravity: {
          minimum: {
            value: row.fg_min,
            unit: "sg",
          },
          maximum: {
            value: row.fg_max,
            unit: "sg",
          },
        },
        international_bitterness_units: {
          minimum: {
            value: row.ibu_min,
            unit: "IBUs",
          },
          maximum: {
            value: row.ibu_max,
            unit: "IBUs",
          },
        },
        color: {
          minimum: {
            value: row.color_min,
            unit: "SRM",
          },
          maximum: {
            value: row.color_max,
            unit: "SRM",
          },
        },
        alcohol_by_volume: {
          minimum: {
            value: row.abv_min,
            unit: "%",
          },
          maximum: {
            value: row.abv_max,
            unit: "%",
          },
        },
        carbonation: {
          minimum: {
            value: row.carb_min,
            unit: "vols",
          },
          maximum: {
            value: row.carb_max,
            unit: "vols",
          },
        },
      };

      styles.push(style);
    },
    () => {
      const data = JSON.stringify(styles, undefined, 1);

      writeFile("./src/json/styles.json", data, (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      });
    }
  );
});

const fermentable_sql = `
    SELECT
        name,
        ftype,
        yield,
        color,
        origin,
        supplier,
        moisture
    FROM
        fermentable
`


db.serialize(() => {
  const fermentables: BeerJSON.FermentableType[] = [];
  db.each(
    fermentable_sql,
    (err, row) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      const fermentable: BeerJSON.FermentableType = {
        name: row.name,
        producer: row.supplier,
        type: row.ftype.toLowerCase(),
        yield: {
            fine_grind: {
                unit: "%",
                value: row.yield
            },
        },
        color: {
            unit: "SRM",
            value: row.color
        },
        moisture: {
            value: row.moisture,
            unit: "%"
        }
      };

      fermentables.push(fermentable);
    },
    () => {
      const data = JSON.stringify(fermentables, undefined, 1);

      writeFile("./src/json/fermentables.json", data, (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      });
    }
  );
});
