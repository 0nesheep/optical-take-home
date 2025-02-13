"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.urlencoded({ extended: true }));
const database = new Map();
function seedDatabase() {
    database.set('Alex', 3000.0);
    database.set('Bryan', 3500.0);
    database.set('Chris', 2000.0);
    database.set('Dave', -100.0);
}
app.get('/users', (req, res) => {
    const { min = '0.0', max = '4000.0', offset = '0', limit, sort } = req.query;
    const minSalary = parseFloat(min) || 0.0;
    const maxSalary = parseFloat(max) || 4000.0;
    const offsetVal = parseInt(offset) || 0;
    const limitVal = limit !== undefined ? parseInt(limit) : undefined;
    const sortTarget = (sort === null || sort === void 0 ? void 0 : sort.toUpperCase()) || '';
    // Parse database
    let userList = Array.from(database, ([name, salary]) => ({ name, salary }));
    let filteredUsers = userList.filter((user) => user.salary >= minSalary && user.salary <= maxSalary);
    if (sortTarget === 'NAME') {
        filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if (sortTarget === 'SALARY') {
        filteredUsers.sort((a, b) => a.salary - b.salary);
    }
    else if (sortTarget !== '') {
        return res
            .status(400)
            .json({ error: `Invalid sort parameter ${sortTarget}` });
    }
    if (offsetVal > 0) {
        filteredUsers = filteredUsers.slice(offsetVal);
    }
    if (limitVal !== undefined && limitVal >= 0) {
        filteredUsers = filteredUsers.slice(0, limitVal);
    }
    return res.status(200).json({
        results: filteredUsers,
    });
});
app.post('/upload', (req, res) => {
    const data = req.body.file;
    if (!data) {
        return res
            .status(400)
            .json({ error: 'No data found, please provide a valid csv file' });
    }
    const dataEntries = data.trim().split(/\r?\n/);
    // First line is the header and will be ignored
    dataEntries.shift();
    console.log(dataEntries);
    return res.status(200).json({ success: 1 });
});
app.listen(port, () => {
    seedDatabase();
    console.log(`Server is now on http://localhost:${port}`);
});
