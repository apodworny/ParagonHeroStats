import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    normalizeArrayResponse: function normalizeArrayResponse(store, primaryModelClass, payload, id, requestType){
        payload.forEach((hero)=> {
            delete hero.attack;
            delete hero.traits;
            delete hero.scale;
            delete hero.releaseDate;
            delete hero.affinities;
            delete hero.difficulty;
            delete hero.stats;
            delete hero.images;
            delete hero.attributesByLevel;
            delete hero.abilities;
        });
        return this._super.apply(this, arguments);
        
    }
});