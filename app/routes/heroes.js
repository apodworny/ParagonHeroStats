import Ember from 'ember';

export default Ember.Route.extend({
    model: function(){
        return this.store.findAll('heroes');
    },
    afterModel:  function(model, transition){
        var controller = this.controllerFor('Heroes');

        controller.set('model', model);

        var heroes = model.get('content');

        var filteredHeroes = [];

        var heroDPS = 0;
        var heroBurst = 0;


        var highestAPS = 0;
        var lowestAPS = 9999;

        var highestBurstDamage = 0;
        var lowestBurstDamage = 9999;

        var highestDamagePerSecond = 0;
        var lowestDamagePerSecond = 9999;

        for (var i = 0; i < heroes.length; i++) {
            heroBurst = 0;
            //Get Attacks per second
            heroes[i]._data.AttacksPerSecond = (1 / (heroes[i]._data.attributesByLevel[14]['BaseAttackTime'] / ((heroes[i]._data.attributesByLevel[14]['AttackSpeedRating']) / 100))).toFixed(2);

            //DPS with basic attacks only
            heroDPS = (heroes[i]._data.AttacksPerSecond * heroes[i]._data.abilities[0].modifiersByLevel[14].damage);

            //Damage from one basic attack
            heroBurst = heroes[i]._data.abilities[0].modifiersByLevel[14].damage;
            //If both damage and cooldown exists per ability, calculate dps and then burst damage for first three abilities
            for(var j = 1; j < 4; j++){
                if (heroes[i]._data.abilities[j].modifiersByLevel[3].damage && heroes[i]._data.abilities[j].modifiersByLevel[3].cooldown) {
                //Have to account for iggy's turret duration instead of cooldown, since it's a deployable with a short cooldown that does damage
                    if(heroes[i]._data.name.toLowerCase() === "iggy & scorch" && heroes[i]._data.abilities[j].modifiersByLevel[3].hasOwnProperty("duration")) {
                        heroDPS += (heroes[i]._data.abilities[j].modifiersByLevel[3].damage) / heroes[i]._data.abilities[j].modifiersByLevel[3].duration;
                    }
                    else {
                        heroDPS += (heroes[i]._data.abilities[j].modifiersByLevel[3].damage) / heroes[i]._data.abilities[j].modifiersByLevel[3].cooldown;
                    }
                    

                    heroBurst += heroes[i]._data.abilities[j].modifiersByLevel[3].damage;
                }
            }

            //Add dps and burst damage for ultimate
            if (heroes[i]._data.abilities[4].modifiersByLevel[2].damage && heroes[i]._data.abilities[4].modifiersByLevel[2].cooldown) {
                heroDPS += (heroes[i]._data.abilities[4].modifiersByLevel[2].damage) / heroes[i]._data.abilities[4].modifiersByLevel[2].cooldown;

                heroBurst += heroes[i]._data.abilities[4].modifiersByLevel[2].damage;
            }

            //Rounding for formatting purposes, and set the value
            Ember.set(heroes[i],'_data.DamagePerSecond', Math.round(heroDPS));
            Ember.set(heroes[i],'_data.BurstDamage', Math.round(heroBurst));

            Ember.set(heroes[i],'_data.CurrentHealth', heroes[i]._data.attributesByLevel[14].MaxHealth);
            Ember.set(heroes[i],'_data.CurrentEnergy', heroes[i]._data.attributesByLevel[14].MaxEnergy);
            Ember.set(heroes[i],'_data.CurrentHealthRegen', heroes[i]._data.attributesByLevel[14].HealthRegenRate);
            Ember.set(heroes[i],'_data.CurrentEnergyRegen', heroes[i]._data.attributesByLevel[14].EnergyRegenRate);
            Ember.set(heroes[i],'_data.CurrentBasicArmour', heroes[i]._data.attributesByLevel[14].BasicResistanceRating);
            Ember.set(heroes[i],'_data.CurrentAbilityArmour', heroes[i]._data.attributesByLevel[14].AbilityResistanceRating);

            Ember.set(heroes[i],'_data.Active', true);



            //SecondsPerAttack = BAT / ((AS) / 100)
            //AttacksPerSecond = 1/(BAT / ((AS) / 100)) Use the reciprocal of seconds per attack to find attacks per second
            
            //SecondsPerAttack = BAT / ((AS + 100) / 100)
            //Since epic's data already has the 100 attack speed as a minimum for every hero, we don't have to add the 100 that the attack speed formula shows

            //Determine highest aps hero
            /*if (heroes[i]._data.AttacksPerSecond >= highestAPS) {
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
            }*/

            

        }

        highestAPS = 2.5;
        lowestAPS = 0.5;
        highestDamagePerSecond = 800;
        lowestDamagePerSecond = 0;
        highestBurstDamage = 3000;
        lowestBurstDamage = 0;

        controller.set('maxAps', highestAPS);
        controller.set('minAps', lowestAPS);
        controller.set('maxBurst', highestBurstDamage);
        controller.set('minBurst', lowestBurstDamage);
        controller.set('maxDps', highestDamagePerSecond);
        controller.set('minDps', lowestDamagePerSecond);
        controller.set('unfilteredHeroes', heroes);

        controller.set('unfilteredHeroes', heroes);

        //Unfiltered for the first call
        controller.set("filteredHeroes", heroes);

        Ember.set(heroes[0], '_data.currentBasicDamage', heroes[0]._data.abilities[0].modifiersByLevel[14].damage);
        Ember.set(heroes[0], '_data.currentAbility1Damage', heroes[0]._data.abilities[1].modifiersByLevel[3].damage);
        Ember.set(heroes[0], '_data.currentAbility2Damage', heroes[0]._data.abilities[2].modifiersByLevel[3].damage);
        Ember.set(heroes[0], '_data.currentAbility3Damage', heroes[0]._data.abilities[3].modifiersByLevel[3].damage);
        Ember.set(heroes[0], '_data.currentUltimateDamage', heroes[0]._data.abilities[1].modifiersByLevel[2].damage);

        //Default selected hero
        controller.set('selectedHero', heroes[0]);

    },
    actions: {
        filterHeroes(){
            var controller = this.controllerFor('Heroes');
            var filteredHeroes = [];
            var currentFilteredTraits = [];
            var currentHeroTraits = [];

            if(controller.get("assassin") === true){
                currentFilteredTraits.push("Assassin");
            }
            if(controller.get("attacker") === true){
                currentFilteredTraits.push("Attacker");
            }
            if(controller.get("burst") === true){
                currentFilteredTraits.push("Burst");
            }
            if(controller.get("controller") === true){
                currentFilteredTraits.push("Controller");
            }
            if(controller.get("durable") === true){
                currentFilteredTraits.push("Durable");
            }
            if(controller.get("elusive") === true){
                currentFilteredTraits.push("Elusive");
            }
            if(controller.get("ganker") === true){
                currentFilteredTraits.push("Ganker");
            }
            if(controller.get("guardian") === true){
                currentFilteredTraits.push("Guardian");
            }
            if(controller.get("initiator") === true){
                currentFilteredTraits.push("Initiator");
            }
            if(controller.get("marauder") === true){
                currentFilteredTraits.push("Marauder");
            }
            if(controller.get("sieger") === true){
                currentFilteredTraits.push("Sieger");
            }
            if(controller.get("wild") === true){
                currentFilteredTraits.push("Wild");
            }
            if(controller.get("zoner") === true){
                currentFilteredTraits.push("Zoner");
            }

            function superbag(sup, sub) {
                sup.sort();
                sub.sort();
                var i, j;
                for (i=0,j=0; i<sup.length && j<sub.length;) {
                    if (sup[i] < sub[j]) {
                        ++i;
                    } else if (sup[i] === sub[j]) {
                        ++i; ++j;
                    } else {
                        // sub[j] not in sup, so sub not subbag
                        return false;
                    }
                }
                // make sure there are no elements left in sub
                return j === sub.length;
            }


            for (var i = 0; i < controller.get("unfilteredHeroes").length; i++) {
                //need an array that contains all filtered traits
                currentHeroTraits = controller.get("unfilteredHeroes")[i]._data.traits;

                if(superbag(currentHeroTraits, currentFilteredTraits)){
                    filteredHeroes.push(controller.get('unfilteredHeroes')[i]);
                }
            }
            controller.set("filteredHeroes", filteredHeroes);
        }
    }
});
