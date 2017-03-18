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
            //I will have to check all previously applied filters, and add the current filter to them

            var element = Ember.$(event.target);
            if(this.get(trait) == true) {
                this.set(trait, false);
                element.toggleClass("active");
            }
            else {
                this.set(trait, true);
                element.toggleClass("active");
            }

            this.send("filterHeroesTest");
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
                        
            this.send("filterHeroesTest");
        }
    },
    
    init: function() {
        var that = this;
    }
});
