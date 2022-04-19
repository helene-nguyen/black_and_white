//!connect to DB
const client = require('../database/db');

const TABLE_NAME = "users";

const signupDatamapper = {
    //&get input names
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
    //&add user
    async addUser(userData) {

        const {
            first_name,
            last_name,
            pseudo,
            password
        } = userData;
        //! We create an object
        const sql = {
            text: ` INSERT INTO ${TABLE_NAME} (
                "first_name",
                "last_name",
                "pseudo",
                "password"
            )
            VALUES ($1, $2, $3, $4) 
            `,
            values: [
                first_name,
                last_name,
                pseudo,
                password
            ]
        }
        //! Protect DB
        const result = await client.query(sql);

        return result.rowCount;
    }
}

module.exports = signupDatamapper;