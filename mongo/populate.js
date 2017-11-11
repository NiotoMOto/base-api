'strict mode';

const Promise = require('bluebird');
const fs = require('fs');
const _ = require('lodash');
const Users = require('./schemas/user').model;
const Annonces = require('./schemas/annonce').model;
const Sports = require('./schemas/sport').model;

function populate(next) {
    Promise.all([
        Users.remove({}),
        Annonces.remove({}),
    ]).then(() => {
        return Promise.all([
            Sports.create({ key: 'COURSE_PIED', name: 'Course à pied'}),
            Sports.create({ key: 'FOOT', name: 'Football'}),
            Sports.create({ key: 'BASKET', name: 'Basket-ball'}),
            Sports.create({ key: 'VELO', name: 'Vélo'}),
        ]);
    })
    .then((sports) => {
        return Promise.all([
            Users.create({
                lastName: 'Guillemotos',
                firstName: 'Antoine',
                username: 'Nioto',
                password: 'toto',
                email: 'antoine.guillemoto@gmail.com',
                sports: _.take(sports, 1)

            }),
            Users.create({
                lastName: 'Begain',
                firstName: 'Johan',
                username: 'Arken',
                password: 'toto',
                email: 'nioto.guillemoto@gmail.com',
                sports: _.takeRight(sports, 1)
            }),
            Users.create({
                lastName: 'Cirjean',
                firstName: 'Remy',
                username: 'Arkan',
                password: 'toto',
                email: 'fwadlaire@gmail.com',
                sports: _.takeRight(sports, 3)
            }),
        ]).then(users => {
            Annonces.create({ name: 'Foot st-ouen', creator: users[0] });
            Annonces.create({ name: 'Ping-pong Poissy', creator: users[1]});
            Annonces.create({ name: 'Kayak Clohar-carnoë', creator: users[2]});
        })
    });
};

module.exports = populate;
