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

    heroLevel: 15,
    cpPower: 0,
    cpAttackSpeed: 0,

    heroHealth: 0,
    heroEnergy: 0,
    heroHealthRegen: 0,
    heroEnergyRegen: 0,
    heroBasicArmour: 0,

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
        clearAll() {
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

            var attackSpeed = this.get('cpAttackSpeed') * valueOfAttackSpeedPerCP;
            var power = this.get('cpPower') * valueOfPowerPerCP;
            var heroLevel = this.get('heroLevel');

            for (var i = 0; i < heroes.length; i++) {
                //Set Attacks per second
                var aps = 1 / (heroes[i]._data.attributesByLevel[14]['BaseAttackTime'] / ((heroes[i]._data.attributesByLevel[14]['AttackSpeedRating'] + attackSpeed) / 100))
                if(aps <= 2.5) {
                    Ember.set(heroes[i],'_data.AttacksPerSecond', aps.toFixed(2));
                }
                else {
                    Ember.set(heroes[i],'_data.AttacksPerSecond', (2.50).toFixed(2));
                }
                
                //DPS with basic attacks only
                heroDPS = (heroes[i]._data.AttacksPerSecond * ((heroes[i]._data.abilities[0].modifiersByLevel[14].damage) + (heroes[i]._data.abilities[0].modifiersByLevel[14].attackratingcoefficient * power)));
                //Damage from one basic attack
                heroBurst = heroes[i]._data.abilities[0].modifiersByLevel[14].damage + (heroes[i]._data.abilities[0].modifiersByLevel[14].attackratingcoefficient * power);
                
                //If both damage and cooldown exists per ability, calculate dps and then burst damage
                if (heroes[i]._data.abilities[1].modifiersByLevel[3].damage && heroes[i]._data.abilities[1].modifiersByLevel[3].cooldown) {
                    heroDPS += heroes[i]._data.abilities[1].modifiersByLevel[3].damage / heroes[i]._data.abilities[1].modifiersByLevel[3].cooldown;

                    heroBurst += heroes[i]._data.abilities[1].modifiersByLevel[3].damage + (heroes[i]._data.abilities[1].modifiersByLevel[3].attackratingcoefficient * power);
                }
                if (heroes[i]._data.abilities[2].modifiersByLevel[3].damage && heroes[i]._data.abilities[2].modifiersByLevel[3].cooldown) {
                    heroDPS += heroes[i]._data.abilities[2].modifiersByLevel[3].damage / heroes[i]._data.abilities[2].modifiersByLevel[3].cooldown;

                    heroBurst += heroes[i]._data.abilities[2].modifiersByLevel[3].damage + (heroes[i]._data.abilities[2].modifiersByLevel[3].attackratingcoefficient * power);
                }
                if (heroes[i]._data.abilities[3].modifiersByLevel[3].damage && heroes[i]._data.abilities[3].modifiersByLevel[3].cooldown) {
                    heroDPS += heroes[i]._data.abilities[3].modifiersByLevel[3].damage / heroes[i]._data.abilities[3].modifiersByLevel[3].cooldown;

                    heroBurst += heroes[i]._data.abilities[3].modifiersByLevel[3].damage + (heroes[i]._data.abilities[3].modifiersByLevel[3].attackratingcoefficient * power);
                }
                if (heroes[i]._data.abilities[4].modifiersByLevel[2].damage && heroes[i]._data.abilities[4].modifiersByLevel[2].cooldown) {
                    heroDPS += heroes[i]._data.abilities[4].modifiersByLevel[2].damage / heroes[i]._data.abilities[4].modifiersByLevel[2].cooldown;

                    heroBurst += heroes[i]._data.abilities[4].modifiersByLevel[2].damage + (heroes[i]._data.abilities[4].modifiersByLevel[2].attackratingcoefficient * power);
                }

                //Rounding for formatting purposes
                Ember.set(heroes[i],'_data.DamagePerSecond', Math.round(heroDPS));
                Ember.set(heroes[i],'_data.BurstDamage', Math.round(heroBurst));


                heroHealth = heroes[i]._data.attributesByLevel[heroLevel-1].MaxHealth;
                heroEnergy = heroes[i]._data.attributesByLevel[heroLevel-1].MaxEnergy;
                heroHealthRegen = heroes[i]._data.attributesByLevel[heroLevel-1].HealthRegenRate;
                heroEnergyRegen = heroes[i]._data.attributesByLevel[heroLevel-1].EnergyRegenRate;
                heroBasicArmour = heroes[i]._data.attributesByLevel[heroLevel-1].BasicResistanceRating;

                Ember.set(heroes[i],'_data.CurrentHealth', heroHealth);
                Ember.set(heroes[i],'_data.CurrentEnergy', heroEnergy);
                Ember.set(heroes[i],'_data.CurrentHealthRegen', heroHealthRegen);
                Ember.set(heroes[i],'_data.CurrentEnergyRegen', heroEnergyRegen);
                Ember.set(heroes[i],'_data.CurrentBasicArmour', heroBasicArmour);
                
            }

            this.set("updatedStats", (this.get("updatedStats") + 1))
        }
    }
});
