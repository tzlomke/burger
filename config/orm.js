var connection = require("./connection.js");

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
};

function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        var value = ob[key];

        if (Object.hasOwnProperty.call(ob, key)) {
            if(typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }

            arr.push(key + "=" + value);
        }
    }

    return arr.toString();
};

var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        })
    },

    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table +
            " (" + cols.toString() + ") " + "VALUES " +
            " (" + printQuestionMarks(vals.length) + ") ";

            console.log(queryString);

            connection.query(queryString, vals, function(err, result) {
                if (err) {
                    throw err;
                }

                cb(result);
            });
    },

    updateOne: function(table, objColVales, condition, cb) {
        var queryString = "Update" + table +
            " SET " + objToSql(objColVales) + 
            " WHERE " + condition;

        console.log(queryString);

        connection.query(queryString, function(err, results) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};

module.exports = orm;