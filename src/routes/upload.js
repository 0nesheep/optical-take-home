"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
exports.uploadRouter = (0, express_1.Router)();
exports.uploadRouter.post('/upload', (req, res) => {
    const data = req.body.file;
    if (!data) {
        return res
            .status(400)
            .json({ error: 'No data found, please provide a valid csv file' });
    }
    const dataEntries = data.trim().split(/\r?\n/);
    // First line is the header and will be ignored
    dataEntries.shift();
    const validEntries = new Map();
    for (let i = 0; i < dataEntries.length; i++) {
        const entry = dataEntries[i].trim();
        const cols = entry === null || entry === void 0 ? void 0 : entry.split(',');
        if (cols.length !== 2) {
            // Invalid CSV row with abnormal columns, terminate
            return res.status(400).json({
                error: `Row ${i + 2} has an invalid number of columns.`,
            });
        }
        const [name, rawSalary] = cols.map((column) => column.trim());
        if (!name) {
            // Invalid CSV row with invalid names, terminate
            return res.status(400).json({
                error: `Row ${i + 2} has an empty name field`,
            });
        }
        const parsedSalary = parseFloat(rawSalary);
        if (isNaN(parsedSalary)) {
            // Invalid CSV row with invalid salary amount, terminate
            return res.status(400).json({
                error: `Row ${i + 2} has an invalid salary field`,
            });
        }
        if (parsedSalary < 0) {
            continue;
        }
        validEntries.set(name, parsedSalary);
    }
    // Only add valid entries if no fatal errors found
    validEntries.forEach((salary, name) => {
        db_1.database.set(name, salary);
    });
    return res.status(200).json({ success: 1 });
});
