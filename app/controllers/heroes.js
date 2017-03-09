import Ember from 'ember';

export default Ember.Controller.extend({
    init: function() {
        var that = this;
        
        Ember.run.next(function(){
            var heroes = that.get('model').forEach(function(hero) {

                console.log(hero.get('name'));
                hero.get('attributesByLevel').forEach(function(stat){
                    console.log(stat['AttackSpeedRating']);
                });
            });
        });
    }
});
