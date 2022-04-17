//!connect to DB
const client = require('../database/db');

const TABLE_NAME = "navigation";

const mainDatamapper = {

    async findNavElements() {
        const result = await client.query(`SELECT * FROM ${TABLE_NAME}`);

        return result.rows;
    },
    async findOneNavElement(name) {
        const sql = {
            text: `SELECT * FROM ${TABLE_NAME} WHERE "name" = ${name}`
        };

        const result = await client.query(sql);

        return result.rows;
    }
}

module.exports = mainDatamapper;