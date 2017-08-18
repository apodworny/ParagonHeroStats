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

    heroLevel: 20,
    cpPower: 0,
    cpAttackSpeed: 0,

    selectedHero: null,
    selectedHero2: null,

    heroHealth: 0,
    heroEnergy: 0,
    heroHealthRegen: 0,
    heroEnergyRegen: 0,
    heroBasicArmour: 0,
    heroAbilityArmour: 0,

    ability1Level: 4,
    ability2Level: 4,
    ability3Level: 4,
    ultimateLevel: 3,

    updatedStats: 0,

    //traits
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
            if(this.get(trait) === true) {
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
                level = 20;
            }
            else if(level > 20) {
                level = 20;
            }
            this.set('heroLevel', level);

            this.send("calculateStats");
        },
        cpPowerSlider(cp){
            if(isNaN(parseInt(cp))) {
                cp = 0;
            }
            else if(cp > 100) {
                cp = 100;
            }
            this.set('cpPower', Number(cp));

            this.send("calculateStats");
        },
        cpAttackSpeedSlider(cp){
            if(isNaN(parseInt(cp))) {
                cp = 0;
            }
            else if(cp > 100) {
                cp = 100;
            }
            this.set('cpAttackSpeed', Number(cp));
            this.send("calculateStats");
        },
        calculateStats() {
            var heroes = this.get("filteredHeroes");

            var heroDPS = 0;
            var heroBurst = 0;

            var heroHealth = 0;
            var heroEnergy = 0;
            var heroHealthRegen = 0;
            var heroEnergyRegen = 0;
            var heroBasicArmour = 0;
            var heroAbilityArmour = 0;

            var attackSpeed = this.get('cpAttackSpeed');
            var power = this.get('cpPower');
            var heroLevel = this.get('heroLevel') - 1;
            var ability1Level = this.get('ability1Level') - 1;
            var ability2Level = this.get('ability2Level') - 1;
            var ability3Level = this.get('ability3Level') - 1;
            var ultimateLevel = this.get('ultimateLevel') - 1;

            var abilityLevelArray = [
                ability1Level, ability2Level, ability3Level, ultimateLevel
            ];
            
            //Need to figure out how to change out all of these lines:
            //heroes[i]._data.abilities[j].modifiersByLevel[abilityLevelArray[j-1]].damage
            //only when the ability is not leveled up at all

            var selectedHero = this.get('selectedHero');
            var currentBasicDamage = selectedHero._data.abilities[0].modifiersByLevel[heroLevel].damage + (selectedHero._data.abilities[0].modifiersByLevel[heroLevel].attackratingcoefficient * power);

            //For each ability, if the ability has no levels or no attack rating coefficient, or the damage is 1, set the damage to 0, otherwise set it appropriately
            if (ability1Level < 0 || !selectedHero._data.abilities[1].modifiersByLevel[ability1Level].attackratingcoefficient || selectedHero._data.abilities[1].modifiersByLevel[ability1Level].damage <= 1) {
                var currentAbility1Damage = 0;
            }
            else {
                var currentAbility1Damage = selectedHero._data.abilities[1].modifiersByLevel[ability1Level].damage + (selectedHero._data.abilities[1].modifiersByLevel[ability1Level].attackratingcoefficient * power);
            }
            if (ability2Level < 0 || !selectedHero._data.abilities[2].modifiersByLevel[ability2Level].attackratingcoefficient || selectedHero._data.abilities[2].modifiersByLevel[ability2Level].damage <= 1) {
                var currentAbility2Damage = 0;
            }
            else {
                var currentAbility2Damage = selectedHero._data.abilities[2].modifiersByLevel[ability2Level].damage + (selectedHero._data.abilities[2].modifiersByLevel[ability2Level].attackratingcoefficient * power);
            }
            if (ability3Level < 0 || !selectedHero._data.abilities[3].modifiersByLevel[ability3Level].attackratingcoefficient || selectedHero._data.abilities[3].modifiersByLevel[ability3Level].damage <= 1) {
                var currentAbility3Damage = 0;
            }
            else {
                var currentAbility3Damage = selectedHero._data.abilities[3].modifiersByLevel[ability3Level].damage + (selectedHero._data.abilities[3].modifiersByLevel[ability3Level].attackratingcoefficient * power);
            }
            if (ultimateLevel < 0 || !selectedHero._data.abilities[4].modifiersByLevel[ultimateLevel].attackratingcoefficient || selectedHero._data.abilities[4].modifiersByLevel[ultimateLevel].damage <= 1) {
                var currentUltimateDamage = 0;
            }
            else {
                var currentUltimateDamage = selectedHero._data.abilities[4].modifiersByLevel[ultimateLevel].damage + (selectedHero._data.abilities[4].modifiersByLevel[ultimateLevel].attackratingcoefficient * power);
            }

            for (var i = 0; i < heroes.length; i++) {
                //Set Attacks per second

                var aps = 1 / (heroes[i]._data.attributesByLevel[heroLevel]['BaseAttackTime'] / ((heroes[i]._data.attributesByLevel[heroLevel]['AttackSpeedRating'] + attackSpeed) / 100));
                if(aps <= 4) {
                    Ember.set(heroes[i],'_data.AttacksPerSecond', aps.toFixed(2));
                }
                else {
                    Ember.set(heroes[i],'_data.AttacksPerSecond', (4.0).toFixed(2));
                }
                
                //DPS with basic attacks only
                heroDPS = (heroes[i]._data.AttacksPerSecond * ((heroes[i]._data.abilities[0].modifiersByLevel[heroLevel].damage) + (heroes[i]._data.abilities[0].modifiersByLevel[heroLevel].attackratingcoefficient * power)));

                //Set current basic attack and ability damages
                this.set('selectedHero._data.currentBasicDamage', Math.round(currentBasicDamage));
                this.set('selectedHero._data.currentAbility1Damage', Math.round(currentAbility1Damage));
                this.set('selectedHero._data.currentAbility2Damage', Math.round(currentAbility2Damage));
                this.set('selectedHero._data.currentAbility3Damage', Math.round(currentAbility3Damage));
                this.set('selectedHero._data.currentUltimateDamage', Math.round(currentUltimateDamage));

                //Damage from one basic attack
                heroBurst = heroes[i]._data.abilities[0].modifiersByLevel[heroLevel].damage + (heroes[i]._data.abilities[0].modifiersByLevel[heroLevel].attackratingcoefficient * power);
                //If both damage and cooldown exists per ability, calculate dps and then burst damage for first three abilities
                for(var j = 1; j < 4; j++){
                    //If the specific ability has a valid damage and cooldown
                    // if(heroes[i]._data.name.toLowerCase() === "countess"){
                    //     debugger;
                    // }

                    //If the ability is not leveled up
                    if (abilityLevelArray[j-1] < 1) {
                        //skip this ability
                    }
                    else if (heroes[i]._data.abilities[j].modifiersByLevel[abilityLevelArray[j-1]].damage && heroes[i]._data.abilities[j].modifiersByLevel[abilityLevelArray[j-1]].cooldown) {
                        //Have to account for iggy's turret duration instead of cooldown, since it's a deployable with a short cooldown that does damage
                        if(heroes[i]._data.name.toLowerCase() === "iggy & scorch" && heroes[i]._data.abilities[j].modifiersByLevel[3].hasOwnProperty("duration")) {
                            heroDPS += (heroes[i]._data.abilities[j].modifiersByLevel[abilityLevelArray[j-1]].damage + (heroes[i]._data.abilities[j].modifiersByLevel[abilityLevelArray[j-1]].attackratingcoefficient * power)) / heroes[i]._data.abilities[j].modifiersByLevel[abilityLevelArray[j-1]].duration;
                        }
                        else {
                            heroDPS += (heroes[i]._data.abilities[j].modifiersByLevel[abilityLevelArray[j-1]].damage + (heroes[i]._data.abilities[j].modifiersByLevel[abilityLevelArray[j-1]].attackratingcoefficient * power)) / heroes[i]._data.abilities[j].modifiersByLevel[abilityLevelArray[j-1]].cooldown;
                        }

                        heroBurst += heroes[i]._data.abilities[j].modifiersByLevel[abilityLevelArray[j-1]].damage + (heroes[i]._data.abilities[j].modifiersByLevel[abilityLevelArray[j-1]].attackratingcoefficient * power);
                    }
                }

                //Add dps and burst damage for ultimate
                if (heroes[i]._data.abilities[4].modifiersByLevel[2].damage && heroes[i]._data.abilities[4].modifiersByLevel[2].cooldown) {
                    //If there is an attackratingcoefficient add it, otherwise just add the damage
                    if(heroes[i]._data.abilities[4].modifiersByLevel[2].attackratingcoefficient){
                        heroDPS += (heroes[i]._data.abilities[4].modifiersByLevel[2].damage + (heroes[i]._data.abilities[4].modifiersByLevel[2].attackratingcoefficient * power)) / heroes[i]._data.abilities[4].modifiersByLevel[2].cooldown;
                        heroBurst += heroes[i]._data.abilities[4].modifiersByLevel[2].damage + (heroes[i]._data.abilities[4].modifiersByLevel[2].attackratingcoefficient * power);
                    }
                    else {
                        heroDPS += (heroes[i]._data.abilities[4].modifiersByLevel[2].damage / heroes[i]._data.abilities[4].modifiersByLevel[2].cooldown);
                        heroBurst += heroes[i]._data.abilities[4].modifiersByLevel[2].damage;
                    }                    
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

            this.set("updatedStats", (this.get("updatedStats") + 1));
        },
        removeHero() {
            var element = Ember.$(event.target);
            var heroes = this.get('filteredHeroes');
            var name = element.siblings(".basics").find(".name").find("p").text();

            for(var i = 0; i < heroes.length; i++){
                if (heroes[i]._data.name === name){
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
        },
        selectHero() {
            var element = Ember.$(event.target);
            var heroes = this.get('filteredHeroes');
            var name = element.closest(".hero").find(".name").find("p").text();

            for(var i = 0; i < heroes.length; i++){
                if (heroes[i]._data.name === name){
                    this.set('selectedHero', heroes[i]);
                }
            }
            this.send("calculateStats");
        },
        decrementAbilityLevel(ability) {
            var element = Ember.$(event.target);
            switch (ability) {
                case 1:
                    if(this.get("ability1Level") >= 1) {
                        this.set("ability1Level", this.get("ability1Level") - 1);
                        element.parent().siblings(".increment").find("button").removeClass("inactive");
                        if(this.get("ability1Level") <= 0) {
                            element.addClass("inactive");
                        }
                    }
                    break;
                case 2:
                    if(this.get("ability2Level") >= 1) {
                        this.set("ability2Level", this.get("ability2Level") - 1);
                        element.parent().siblings(".increment").find("button").removeClass("inactive");
                        if(this.get("ability2Level") <= 0) {
                            element.addClass("inactive");
                        }
                    }
                    break;
                case 3:
                    if(this.get("ability3Level") >= 1) {
                        this.set("ability3Level", this.get("ability3Level") - 1);
                        element.parent().siblings(".increment").find("button").removeClass("inactive");
                        if(this.get("ability3Level") <= 0) {
                            element.addClass("inactive");
                        }
                    }
                    break;
                case 4:
                    if(this.get("ultimateLevel") >= 1) {
                        this.set("ultimateLevel", this.get("ultimateLevel") - 1);
                        element.parent().siblings(".increment").find("button").removeClass("inactive");
                        if(this.get("ultimateLevel") <= 0) {
                            element.addClass("inactive");
                        }
                    }
                    break;
                default:
                    console.log('Problem with decrementAbilityLevel occurred');
            }
            this.send("calculateStats");
        },
        incrementAbilityLevel(ability) {
            var element = Ember.$(event.target);
            switch (ability) {
                case 1:
                    if(this.get("ability1Level") <= 3) {
                        this.set("ability1Level", this.get("ability1Level") + 1);
                        element.parent().siblings(".decrement").find("button").removeClass("inactive");
                        if(this.get("ability1Level") >= 4) {
                            element.addClass("inactive");
                        }
                    }
                    break;
                case 2:
                    if(this.get("ability2Level") <= 3) {
                        this.set("ability2Level", this.get("ability2Level") + 1);
                        element.parent().siblings(".decrement").find("button").removeClass("inactive");
                        if(this.get("ability2Level") >= 4) {
                            element.addClass("inactive");
                        }
                    }
                    break;
                case 3:
                    if(this.get("ability3Level") <= 3) {
                        this.set("ability3Level", this.get("ability3Level") + 1);
                        element.parent().siblings(".decrement").find("button").removeClass("inactive");
                        if(this.get("ability3Level") >= 4) {
                            element.addClass("inactive");
                        }
                    }
                    break;
                case 4:
                    if(this.get("ultimateLevel") <= 2) {
                        this.set("ultimateLevel", this.get("ultimateLevel") + 1);
                        element.parent().siblings(".decrement").find("button").removeClass("inactive");
                        if(this.get("ultimateLevel") >= 3) {
                            element.addClass("inactive");
                        }
                    }
                    break;
                default:
                    console.log('Problem with incrementAbilityLevel occurred');
            }
            this.send("calculateStats");
        }
    }
});
