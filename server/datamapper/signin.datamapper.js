//!connect to DB
const client = require('../database/db');

const TABLE_NAME = "users";

const signinDatamapper = {
    async getAllInputNames() {

        const sql = {
            text: `SELECT 
            "first_name", 
            "last_name", 
            "pseudo", 
            "password"
            FROM ${TABLE_NAME}
            WHERE id = 1`
        };
        const result = await client.query(sql);
           
        return result.rows[0];
    },

    async addUser(userData) {

        const {
            firstName,
            lastName,
            pseudo,
            password
        } = userData;

        const sql = { //! We create an object
            text: ` INSERT INTO ${TABLE_NAME} (
                "first_name",
                "last_name",
                "pseudo",
                "password"
            )
            VALUES ($1, $2, $3, $4) //! Protect DB
            `,
            values: [
                firstName,
                lastName,
                pseudo,
                password
            ]
        }

        const result = await client.query(sql);

        return result.rowCount;
    }
}

module.exports = signinDatamapper;