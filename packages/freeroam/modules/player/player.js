'use strict';

const logger = require('../utils/logger');
const database = require('../database/database');
const bcrypt = require('bcryptjs');

module.exports = {
    exists: (name) => {
        return new Promise((resolve, reject) => {
            database.user.count({ where: { username: name }})
            .then((count) => {
                if(count != 0) {
                    resolve();
                }
                reject('No account matches that username.')
            });
        });
    },
    login: (name, password) => {
        return new Promise((resolve, reject) => {
            database.user.findOne({
                raw: true,
                where: {
                    username: name
                }
            })
            .then((account) => {
                bcrypt.compare(password, account.password, (err, res) => {
                    if(res === true) {
                        resolve(account);
                    }
                    reject('Incorrect username or password.');
                })
            })
            .catch((err) => {
                reject(err);
            });
        });
    },
    register: (name, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                database.user.create({ username: name, password: hash })
                    .then((account) => {
                        resolve(account);
                    })
                    .catch((err) => {
                        reject(`Error creating new account. ${err}`)
                    });
            });
        });
    },
    save() {
      let _position = JSON.stringify({ x: this.position.x, y: this.position.y, z: this.position.z, r: this.heading });
      return database.user.update(
        { admin: this.admin, position: _position }, 
        { where: { id: this.uid }}
      );
    }
}
