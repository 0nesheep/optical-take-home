"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get('/users', (req, res) => {
    const { min = '0.0', max = '4000.0', offset = '0', limit, sort } = req.query;
    const minSalary = parseFloat(min) || 0.0;
    const maxSalary = parseFloat(max) || 4000.0;
    const offsetVal = parseInt(offset) || 0;
    const limitVal = limit !== undefined ? parseInt(limit) : undefined;
    const sortTarget = (sort === null || sort === void 0 ? void 0 : sort.toUpperCase()) || '';
    // Parse database
    let userList = Array.from(db_1.database, ([name, salary]) => ({ name, salary }));
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
