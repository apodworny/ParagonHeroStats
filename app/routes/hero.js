import Ember from 'ember';

export default Ember.Route.extend({
    model: function(){
        //return this.store.findAll('hero');
        return this.store.findRecord('hero', '966e34d87f81ec512e0bb5be93b87bbf');
    }
});
