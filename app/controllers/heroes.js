import Ember from 'ember';

export default Ember.Controller.extend({
    init: function() {
        var that = this;

        var heroAttackSpeeds = [{
            name: '',
            attackSpeed: ''
        }];

        

        Ember.run.next(function(){
            var heroes = that.get('model').forEach(function(hero, index, self) {
                //var index = this.indexOf(hero);
                heroAttackSpeeds[index].name = hero.get('name');
                console.log(heroAttackSpeeds[index].name);
                console.log(hero.get('name'));

                /*hero.get('attributesByLevel').forEach(function(stat){
                    heroAttackSpeeds[this.indexOf(hero)].attackSpeed = stat['AttackSpeedRating'];
                    console.log(heroAttackSpeeds[this.indexOf(hero)]);
                });*/
            });
        });
    }
});
