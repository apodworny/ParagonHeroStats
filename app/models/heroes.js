import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    attack: DS.attr('string'),
    traits: DS.attr(),
    scale: DS.attr('string'),
    releaseDate: DS.attr('string'),
    affinities: DS.attr(),
    difficulty: DS.attr('string'),
    images: DS.attr(),
    attributesByLevel: DS.attr(),
    abilities: DS.attr()
});
