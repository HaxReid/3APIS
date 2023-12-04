import fs from 'fs';
import { parse } from 'csv-parse';

export async function importDataForCollection(filePath, Model) {
  try {
    const data = await readFile(filePath, 'utf-8');
    const records = await parseCSV(data);

    if (!records || records.length === 0) {
      console.log(`No records to import from ${filePath}.`);
      return;
    }

    for (const record of records) {
      await Model.create(record);
      console.log(`${Model.modelName} imported successfully`);
    }

    console.log(`CSV parsing and import finished for ${Model.modelName}`);
  } catch (error) {
    console.error(`Error reading, parsing, or importing CSV for ${Model.modelName}:`, error);
  }
}

function readFile(filePath, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function parseCSV(data) {
  return new Promise((resolve, reject) => {
    parse(data, { columns: true, skip_empty_lines: true }, (err, records) => {
      if (err) reject(err);
      else resolve(records);
    });
  });
}
