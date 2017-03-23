import DS from 'ember-data';

export default DS.JSONSerializer.extend(DS.EmbeddedRecordsMixin, {
    normalizeArrayResponse: function normalizeArrayResponse(store, primaryModelClass, payload, id, requestType){
        payload.forEach((hero)=> {
            hero.images = "images/" + hero.images.icon.substring(45);
        });
        return this._super.apply(this, arguments);
    },
    attrs: {
        attributesByLevel: { embedded: 'always' }
    }
});