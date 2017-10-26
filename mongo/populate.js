'strict mode';

const Promise = require('bluebird');
const fs = require('fs');
const _ = require('lodash');
const Users = require('./schemas/user').model;

function populate(next) {
    Promise.all([
        Users.remove({}),
    ]).then(() => {
        Promise.all([
            Users.create({ lastName: 'Guillemoto', firstName: 'Antoine', userName: 'Nioto', password: 'toto' }),
            Users.create({ lastName: 'Begain', firstName: 'Johan', userName: 'Arken', password: 'toto' }),
            Users.create({ lastName: 'Cirjean', firstName: 'Remy', userName: 'Arkan', password: 'toto' }),
        ])
    })
}

module.exports = populate;
