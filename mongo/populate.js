'strict mode';

const Promise = require('bluebird');
const fs = require('fs');
const _ = require('lodash');
const Users = require('./schemas/user').model;
const Annonces = require('./schemas/annonce').model;

function populate(next) {
    Promise.all([
        Users.remove({}),
        Annonces.remove({}),
    ]).then(() => {
        Promise.all([
            Users.create({ lastName: 'Guillemotoss', firstName: 'Antoine', username: 'Nioto', password: 'toto' }),
            Users.create({ lastName: 'Begain', firstName: 'Johan', username: 'Arken', password: 'toto' }),
            Users.create({ lastName: 'Cirjean', firstName: 'Remy', username: 'Arkan', password: 'toto' }),
        ]).then(users => {
            Annonces.create({ name: 'Foot st-ouen', creator: users[0] });
            Annonces.create({ name: 'Ping-pong Poissy', creator: users[1]});
            Annonces.create({ name: 'Kayak Clohar-carnoë', creator: users[2]});
        })
    })
}

module.exports = populate;
