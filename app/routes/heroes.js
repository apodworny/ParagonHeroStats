import Ember from 'ember';

export default Ember.Route.extend({
    model: function(){
        return this.store.findAll('heroes');
    },
    afterModel:  function(model, transition){
        var controller = this.controllerFor('Heroes');

        var heroes = model.get('content');

        var filteredHeroes = [];

        var highestAPS = 0;
        var lowestAPS = 9999;

        var highestBurstDamage = 0;
        var lowestBurstDamage = 9999;

        var highestDamagePerSecond = 0;
        var lowestDamagePerSecond = 9999;

        for (var i = 0; i < heroes.length; i++) {
            //Get Attacks per second
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

            //Determine highest aps hero
            if (heroes[i]._data.AttacksPerSecond >= highestAPS) {
                highestAPS = heroes[i]._data.AttacksPerSecond;
            }
            //Determine lowest aps hero
            if (heroes[i]._data.AttacksPerSecond <= lowestAPS) {
                lowestAPS = heroes[i]._data.AttacksPerSecond;
            }
            //Determine highest burst damage hero
            if (heroes[i]._data.BurstDamage >= highestBurstDamage) {
                highestBurstDamage = heroes[i]._data.BurstDamage;
            }
            //Determine lowest burst damage hero
            if (heroes[i]._data.BurstDamage <= lowestBurstDamage) {
                lowestBurstDamage = heroes[i]._data.BurstDamage;
            }
            //Determine highest DPS hero
            if (heroes[i]._data.DamagePerSecond >= highestDamagePerSecond) {
                highestDamagePerSecond = heroes[i]._data.DamagePerSecond;
            }
            //Determine lowest DPS hero
            if (heroes[i]._data.DamagePerSecond <= lowestDamagePerSecond) {
                lowestDamagePerSecond = heroes[i]._data.DamagePerSecond;
            }
        }

        controller.set('maxAps', highestAPS);
        controller.set('minAps', lowestAPS);
        controller.set('maxBurst', highestBurstDamage);
        controller.set('minBurst', lowestBurstDamage);
        controller.set('maxDps', highestDamagePerSecond);
        controller.set('minDps', lowestDamagePerSecond);
        controller.set('unfilteredHeroes', heroes);

        //Unfiltered for the first call
        controller.set("filteredHeroes", heroes);

    },
    actions: {
        filterHeroesTest(){
            var controller = this.controllerFor('Heroes');
            var filteredHeroes = [];
            for (var i = 0; i < controller.get("unfilteredHeroes").length; i++) {
                for(var j = 0; j < controller.get("unfilteredHeroes")[i]._data.traits.length; j++) {
                    if(controller.get('unfilteredHeroes')[i]._data.traits[j].toLowerCase() == "assassin" && controller.get("assassin") == true){
                        filteredHeroes.push(controller.get('unfilteredHeroes')[i]);
                        break;
                    }
                    if(controller.get('unfilteredHeroes')[i]._data.traits[j].toLowerCase() == "attacker" && controller.get("attacker") == true){
                        filteredHeroes.push(controller.get('unfilteredHeroes')[i]);
                        break;
                    }
                    if(controller.get('unfilteredHeroes')[i]._data.traits[j].toLowerCase() == "burst" && controller.get("burst") == true){
                        filteredHeroes.push(controller.get('unfilteredHeroes')[i]);
                        break;
                    }
                    if(controller.get('unfilteredHeroes')[i]._data.traits[j].toLowerCase() == "controller" && controller.get("controller") == true){
                        filteredHeroes.push(controller.get('unfilteredHeroes')[i]);
                        break;
                    }
                    if(controller.get('unfilteredHeroes')[i]._data.traits[j].toLowerCase() == "durable" && controller.get("durable") == true){
                        filteredHeroes.push(controller.get('unfilteredHeroes')[i]);
                        break;
                    }
                    if(controller.get('unfilteredHeroes')[i]._data.traits[j].toLowerCase() == "elusive" && controller.get("elusive") == true){
                        filteredHeroes.push(controller.get('unfilteredHeroes')[i]);
                        break;
                    }
                    if(controller.get('unfilteredHeroes')[i]._data.traits[j].toLowerCase() == "ganker" && controller.get("ganker") == true){
                        filteredHeroes.push(controller.get('unfilteredHeroes')[i]);
                        break;
                    }
                    if(controller.get('unfilteredHeroes')[i]._data.traits[j].toLowerCase() == "guardian" && controller.get("guardian") == true){
                        filteredHeroes.push(controller.get('unfilteredHeroes')[i]);
                        break;
                    }
                    if(controller.get('unfilteredHeroes')[i]._data.traits[j].toLowerCase() == "initiator" && controller.get("initiator") == true){
                        filteredHeroes.push(controller.get('unfilteredHeroes')[i]);
                        break;
                    }
                    if(controller.get('unfilteredHeroes')[i]._data.traits[j].toLowerCase() == "marauder" && controller.get("marauder") == true){
                        filteredHeroes.push(controller.get('unfilteredHeroes')[i]);
                        break;
                    }
                    if(controller.get('unfilteredHeroes')[i]._data.traits[j].toLowerCase() == "sieger" && controller.get("sieger") == true){
                        filteredHeroes.push(controller.get('unfilteredHeroes')[i]);
                        break;
                    }
                    if(controller.get('unfilteredHeroes')[i]._data.traits[j].toLowerCase() == "wild" && controller.get("wild") == true){
                        filteredHeroes.push(controller.get('unfilteredHeroes')[i]);
                        break;
                    }
                    if(controller.get('unfilteredHeroes')[i]._data.traits[j].toLowerCase() == "zoner" && controller.get("zoner") == true){
                        filteredHeroes.push(controller.get('unfilteredHeroes')[i]);
                        break;
                    }
                }
            }
            
            controller.set("filteredHeroes", filteredHeroes);
        }
    }
});
