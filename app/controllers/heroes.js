import Ember from 'ember';

export default Ember.Controller.extend({

    init: function() {
        var that = this;

        var heroes = {};

        var dpsArray = [27][27];

        var burstArray = {};

        const HeroClass = Ember.Object.extend({
            
        });

        


        Ember.run.next(function(){
            heroes = that.get('model').get('content');

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
                

                //dpsArray[(heroes[i].id).toString()]['Name'] = heroes[i]._data.name;

                //dpsArray[heroes[i].id]['DamagePerSecond'] = heroes[i]._data.DamagePerSecond;

                //dpsArray[heroes[i].id]['BurstDamage'] = heroes[i]._data.BurstDamage;

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
        });

        //get name where id = 051b478dd9b58f6f31c5e580996724df (countess)
    }
});
