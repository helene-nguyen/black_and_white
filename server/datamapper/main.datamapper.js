//!connect to DB
const client = require('../database/db');

const TABLE_NAME = "navigation";

const mainDatamapper = {

    async findNavElements() {
        const sql = {
            text: `SELECT * 
            FROM ${TABLE_NAME}`
        }
        const result = await client.query(sql);

        return result.rows;
    },
    async findOneNavElement(name) {
        const sql = {
            text: `SELECT * 
            FROM ${TABLE_NAME} 
            WHERE "name" = $1`, //protect DB
            values: [name]
        };
        const result = await client.query(sql);

        return result.rows;
    }
}

module.exports = mainDatamapper;