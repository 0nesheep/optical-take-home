"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const mockUsers = [
    { name: 'Alex', salary: 3000.0 },
    { name: 'Bryan', salary: 3500.0 },
    { name: 'Chris', salary: 2000.0 },
    { name: 'Dave', salary: -100.0 },
];
app.get('/users', (req, res) => {
    const { min = '0.0', max = '4000.0', offset = '0', limit, sort } = req.query;
    const minSalary = parseFloat(min) || 0.0;
    const maxSalary = parseFloat(max) || 4000.0;
    const offsetVal = parseInt(offset) || 0;
    const limitVal = limit !== undefined ? parseInt(limit) : undefined;
    const sortTarget = (sort === null || sort === void 0 ? void 0 : sort.toUpperCase()) || '';
    let filteredUsers = mockUsers.filter((user) => user.salary >= minSalary && user.salary <= maxSalary);
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
    return res.status(200).json({
        results: filteredUsers,
    });
});
app.listen(port, () => {
    console.log(`Server is now on http://localhost:${port}`);
});
