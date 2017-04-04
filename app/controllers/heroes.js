import Ember from 'ember';

export default Ember.Controller.extend({
    unfilteredHeroes: null,
    filteredHeroes: null,
    maxAps: null,
    minAps: null,
    maxBurst: null,
    minBurst: null,
    maxDps: null,
    minDps: null,

    model: null,

    heroLevel: 15,
    cpPower: 0,
    cpAttackSpeed: 0,

    selectedHero: null,

    heroHealth: 0,
    heroEnergy: 0,
    heroHealthRegen: 0,
    heroEnergyRegen: 0,
    heroBasicArmour: 0,
    heroAbilityArmour: 0,

    updatedStats: 0,

    assassin: false,
    attacker: false,
    burst: false,
    controller: false,
    durable: false,
    elusive: false,
    ganker: false,
    guardian: false,
    initiator: false,
    marauder: false,
    sieger: false,
    wild: false,
    zoner: false,

    actions: {
        toggleFilter(trait, event) {
            var element = Ember.$(event.target);
            if(this.get(trait) == true) {
                this.set(trait, false);
                element.toggleClass("active");
            }
            else {
                this.set(trait, true);
                element.toggleClass("active");
            }

            this.send("filterHeroes");
        },
        heroLevelSlider(level){
            if(isNaN(parseInt(level))) {
                level = 15;
            }
            else if(level > 15) {
                level = 15;
            }
            this.set('heroLevel', level)

            this.send("calculateStats");
        },
        cpPowerSlider(cp){
            if(isNaN(parseInt(cp))) {
                cp = 0;
            }
            else if(cp > 66) {
                cp = 66;
            }
            this.set('cpPower', cp)

            this.send("calculateStats");
        },
        cpAttackSpeedSlider(cp){
            if(isNaN(parseInt(cp))) {
                cp = 0;
            }
            else if(cp > 66) {
                cp = 66;
            }
            this.set('cpAttackSpeed', cp)
            
            this.send("calculateStats");
        },
        calculateStats() {
            var heroes = this.get("filteredHeroes");
            
            var valueOfAttackSpeedPerCP = 5.5;
            var valueOfPowerPerCP = 6;

            var heroDPS = 0;
            var heroBurst = 0;

            var heroHealth = 0;
            var heroEnergy = 0;
            var heroHealthRegen = 0;
            var heroEnergyRegen = 0;
            var heroBasicArmour = 0;
            var heroAbilityArmour = 0;

            var attackSpeed = this.get('cpAttackSpeed') * valueOfAttackSpeedPerCP;
            var power = this.get('cpPower') * valueOfPowerPerCP;
            var heroLevel = this.get('heroLevel') - 1;

            for (var i = 0; i < heroes.length; i++) {
                //Set Attacks per second
                var aps = 1 / (heroes[i]._data.attributesByLevel[heroLevel]['BaseAttackTime'] / ((heroes[i]._data.attributesByLevel[heroLevel]['AttackSpeedRating'] + attackSpeed) / 100))
                if(aps <= 2.5) {
                    Ember.set(heroes[i],'_data.AttacksPerSecond', aps.toFixed(2));
                }
                else {
                    Ember.set(heroes[i],'_data.AttacksPerSecond', (2.50).toFixed(2));
                }
                
                //DPS with basic attacks only
                heroDPS = (heroes[i]._data.AttacksPerSecond * ((heroes[i]._data.abilities[0].modifiersByLevel[heroLevel].damage) + (heroes[i]._data.abilities[0].modifiersByLevel[heroLevel].attackratingcoefficient * power)));
                //Damage from one basic attack
                heroBurst = heroes[i]._data.abilities[0].modifiersByLevel[heroLevel].damage + (heroes[i]._data.abilities[0].modifiersByLevel[heroLevel].attackratingcoefficient * power);
                
                //If both damage and cooldown exists per ability, calculate dps and then burst damage for first three abilities
                for(var j = 1; j < 4; j++){
                    if (heroes[i]._data.abilities[j].modifiersByLevel[3].damage && heroes[i]._data.abilities[j].modifiersByLevel[3].cooldown) {
                        //Have to account for iggy's turret duration instead of cooldown, since it's a deployable with a short cooldown that does damage
                        if(heroes[i]._data.name.toLowerCase() == "iggy & scorch" && heroes[i]._data.abilities[j].modifiersByLevel[3].hasOwnProperty("duration")) {
                            heroDPS += (heroes[i]._data.abilities[j].modifiersByLevel[3].damage + (heroes[i]._data.abilities[j].modifiersByLevel[3].attackratingcoefficient * power)) / heroes[i]._data.abilities[j].modifiersByLevel[3].duration;
                        }
                        else {
                            heroDPS += (heroes[i]._data.abilities[j].modifiersByLevel[3].damage + (heroes[i]._data.abilities[j].modifiersByLevel[3].attackratingcoefficient * power)) / heroes[i]._data.abilities[j].modifiersByLevel[3].cooldown;
                        }

                        heroBurst += heroes[i]._data.abilities[j].modifiersByLevel[3].damage + (heroes[i]._data.abilities[j].modifiersByLevel[3].attackratingcoefficient * power);
                    }
                }

                //Add dps and burst damage for ultimate
                if (heroes[i]._data.abilities[4].modifiersByLevel[2].damage && heroes[i]._data.abilities[4].modifiersByLevel[2].cooldown) {
                    heroDPS += (heroes[i]._data.abilities[4].modifiersByLevel[2].damage + (heroes[i]._data.abilities[4].modifiersByLevel[2].attackratingcoefficient * power)) / heroes[i]._data.abilities[4].modifiersByLevel[2].cooldown;

                    heroBurst += heroes[i]._data.abilities[4].modifiersByLevel[2].damage + (heroes[i]._data.abilities[4].modifiersByLevel[2].attackratingcoefficient * power);
                }

                //Rounding for formatting purposes
                Ember.set(heroes[i],'_data.DamagePerSecond', Math.round(heroDPS));
                Ember.set(heroes[i],'_data.BurstDamage', Math.round(heroBurst));


                heroHealth = heroes[i]._data.attributesByLevel[heroLevel].MaxHealth;
                heroEnergy = heroes[i]._data.attributesByLevel[heroLevel].MaxEnergy;
                heroHealthRegen = heroes[i]._data.attributesByLevel[heroLevel].HealthRegenRate;
                heroEnergyRegen = heroes[i]._data.attributesByLevel[heroLevel].EnergyRegenRate;
                heroBasicArmour = heroes[i]._data.attributesByLevel[heroLevel].BasicResistanceRating;
                heroAbilityArmour = heroes[i]._data.attributesByLevel[heroLevel].AbilityResistanceRating;

                Ember.set(heroes[i],'_data.CurrentHealth', heroHealth);
                Ember.set(heroes[i],'_data.CurrentEnergy', heroEnergy);
                Ember.set(heroes[i],'_data.CurrentHealthRegen', heroHealthRegen);
                Ember.set(heroes[i],'_data.CurrentEnergyRegen', heroEnergyRegen);
                Ember.set(heroes[i],'_data.CurrentBasicArmour', heroBasicArmour);
                Ember.set(heroes[i],'_data.CurrentAbilityArmour', heroAbilityArmour);
            }
            this.set("updatedStats", (this.get("updatedStats") + 1))
        },
        removeHero() {
            var element = Ember.$(event.target);
            var heroes = this.get('filteredHeroes');
            var heroesNew;
            var name = element.siblings(".basics").find(".name").find("p").text();

            for(var i = 0; i < heroes.length; i++){
                if (heroes[i]._data.name == name){
                    Ember.set(heroes[i],'_data.Active', false);
                }
            }
        },
        resetFilters() {
            Ember.$(".filter__trait").removeClass("active");
            this.set("assassin", false);
            this.set("attacker", false);
            this.set("burst", false);
            this.set("controller", false);
            this.set("durable", false);
            this.set("elusive", false);
            this.set("ganker", false);
            this.set("guardian", false);
            this.set("initiator", false);
            this.set("marauder", false);
            this.set("sieger", false);
            this.set("wild", false);
            this.set("zoner", false);
                        
            this.send("filterHeroes");
        },
        resetHeroes() {
            var heroes = this.get("unfilteredHeroes");
            for (var i = 0; i < heroes.length; i++) {
                Ember.set(heroes[i],'_data.Active', true);
            }
        }
    }
});
