import DS from 'ember-data';

export default DS.JSONSerializer.extend(DS.EmbeddedRecordsMixin, {
    normalizeArrayResponse: function normalizeArrayResponse(store, primaryModelClass, payload, id, requestType){
        payload.forEach((hero)=> {
            hero.images = "https:" + hero.images.icon;
        });
        return this._super.apply(this, arguments);
    },
    attrs: {
        attributesByLevel: { embedded: 'always' }
    }
});