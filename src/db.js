"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
exports.seedDatabase = seedDatabase;
exports.database = new Map();
function seedDatabase() {
    exports.database.set('Alex', 3000.0);
    exports.database.set('Bryan', 3500.0);
    exports.database.set('Chris', 2000.0);
    exports.database.set('Dave', -100.0);
}
