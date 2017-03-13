import Ember from 'ember';

export default Ember.Route.extend({
    model: function(){
        return this.store.findAll('heroes');
    },
    afterModel:  function(model, transition){
        var controller = this.controllerFor('Heroes');

        var heroes = model.get('content');

        var testStat;

        for (var i = 0; i < heroes.length; i++) {
            heroes[i]._data.AttacksPerSecond = 1 / (heroes[i]._data.attributesByLevel[14]['BaseAttackTime'] / ((heroes[i]._data.attributesByLevel[14]['AttackSpeedRating']) / 100));

            //DPS with basic attacks only
            heroes[i]._data.DamagePerSecond = (heroes[i]._data.AttacksPerSecond * heroes[i]._data.abilities[0].modifiersByLevel[14].damage);

            //Damage from one basic attack
            heroes[i]._data.BurstDamage = heroes[i]._data.abilities[0].modifiersByLevel[14].damage;

            //If both damage and cooldown exists per ability, calculate dps and then burst damage
            if (heroes[i]._data.abilities[1].modifiersByLevel[3].damage && heroes[i]._data.abilities[1].modifiersByLevel[3].cooldown) {
                heroes[i]._data.DamagePerSecond += heroes[i]._data.abilities[1].modifiersByLevel[3].damage / heroes[i]._data.abilities[1].modifiersByLevel[3].cooldown;

                heroes[i]._data.BurstDamage += heroes[i]._data.abilities[1].modifiersByLevel[3].damage;
            }
            if (heroes[i]._data.abilities[2].modifiersByLevel[3].damage && heroes[i]._data.abilities[2].modifiersByLevel[3].cooldown) {
                heroes[i]._data.DamagePerSecond += heroes[i]._data.abilities[2].modifiersByLevel[3].damage / heroes[i]._data.abilities[2].modifiersByLevel[3].cooldown;

                heroes[i]._data.BurstDamage += heroes[i]._data.abilities[2].modifiersByLevel[3].damage;
            }
            if (heroes[i]._data.abilities[3].modifiersByLevel[3].damage && heroes[i]._data.abilities[3].modifiersByLevel[3].cooldown) {
                heroes[i]._data.DamagePerSecond += heroes[i]._data.abilities[3].modifiersByLevel[3].damage / heroes[i]._data.abilities[3].modifiersByLevel[3].cooldown;

                heroes[i]._data.BurstDamage += heroes[i]._data.abilities[3].modifiersByLevel[3].damage;
            }
            if (heroes[i]._data.abilities[4].modifiersByLevel[2].damage && heroes[i]._data.abilities[4].modifiersByLevel[2].cooldown) {
                heroes[i]._data.DamagePerSecond += heroes[i]._data.abilities[4].modifiersByLevel[2].damage / heroes[i]._data.abilities[4].modifiersByLevel[2].cooldown;

                heroes[i]._data.BurstDamage += heroes[i]._data.abilities[4].modifiersByLevel[2].damage;
            }

            //SecondsPerAttack = BAT / ((AS) / 100)
            //AttacksPerSecond = 1/(BAT / ((AS) / 100)) Use the reciprocal of seconds per attack to find attacks per second
            
            //SecondsPerAttack = BAT / ((AS + 100) / 100)
            //Since epic's data already has the 100 attack speed as a minimum for every hero, we don't have to add the 100 that the attack speed formula shows

            console.log(heroes[i]._data.name);
            console.log(heroes[i].id);
            console.log(heroes[i]._data.AttacksPerSecond);
            console.log(heroes[i]._data.DamagePerSecond);
            console.log(heroes[i]._data.BurstDamage);

            //I need an object that has multiple instances that can be accessed from a template
            
        }
        controller.set('testArray1', heroes);
    }
});
