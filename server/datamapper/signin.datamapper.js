//!connect to DB
const client = require('../database/db');

const TABLE_NAME = "users";

const signinDatamapper = {
    async getAllInputNames(index) {

        const sql = {
            text: `SELECT * 
            FROM ${TABLE_NAME}`
        };
        const result = await client.query(sql);
        console.log(result.fields[index].name);
        //TODO Try to have the array with only column names

        return result.fields;
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