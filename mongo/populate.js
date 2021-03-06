'strict mode';

const Promise = require('bluebird');
const fs = require('fs');
const _ = require('lodash');
const Users = require('./schemas/user').model;
const Annonces = require('./schemas/annonce').model;
const Sports = require('./schemas/sport').model;

let sports = [];
function populate(next) {
    Promise.all([
        Users.remove({}),
        Annonces.remove({}),
        Sports.remove({})
    ]).then(() => {
        return Promise.all([
            Sports.create({ key: 'COURSE_PIED', name: 'Course à pied'}),
            Sports.create({ key: 'FOOT', name: 'Football'}),
            Sports.create({ key: 'URBANFOOT', name: 'Urban foot'}),
            Sports.create({ key: 'BASKET', name: 'Basket-ball'}),
            Sports.create({ key: 'VELO', name: 'Vélo'}),
        ]);
    })
    .then((s) => {
        sports = s;
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
                lastName: 'Wadlaire Ferrons',
                firstName: 'Pierre',
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
            return Promise.all([
                Annonces.create({ name: 'Foot st-ouen', creator: users[0], sport: sports[1]._id }),
                Annonces.create({ name: 'Foot Paris 8eme', creator: users[1], sport: sports[1] }),
                Annonces.create({ name: 'Foot Lorient', creator: users[1], sport: sports[1] }),
                Annonces.create({ name: 'Course a pied Poissy', creator: users[0], sport: sports[0] }),
                Annonces.create({ name: 'Course a pied Plaisir', creator: users[0], sport: sports[0] }),
                Annonces.create({ name: 'Course a pied Nice', creator: users[2], sport: sports[0] }),
                Annonces.create({ name: 'Course a pied Montargis', creator: users[2], sport: sports[0] }),
                Annonces.create({ name: 'Basket-ball Poissy', creator: users[1], sport: sports[3] }),
                Annonces.create({ name: 'Urban foot Clohar-carnoë', creator: users[1], sport: sports[2] }),
            ]);
        })
    });
};

module.exports = populate;
