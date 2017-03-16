import Ember from 'ember';

export default Ember.Controller.extend({
    testArray1: null,
    maxAps: null,
    minAps: null,
    maxBurst: null,
    minBurst: null,
    maxDps: null,
    minDps: null,

    assassin: true,
    attacker: true,
    burst: true,
    controller: true,
    durable: true,
    elusive: true,
    ganker: true,
    guardian: true,
    initiator: true,
    marauder: true,
    sieger: true,
    wild: true,
    zoner: true,

    actions: {
        toggleFilterAssassin(event) {
            var element = Ember.$(event.target);
            element.css("backgroundColor", "#171717");
            element.css("color", "#666");
            element.css("border", "none");
            if(this.get("assassin") == true) {
                this.set("assassin", false);
                console.log("assassin is now " + this.get("assassin"));
            }
            else {
                this.set("assassin", true);
                console.log("assassin is now " + this.get("assassin"));
            }
        },
        clearAll() {
            Ember.$(".filter__trait").css("backgroundColor", "#171717");
            Ember.$(".filter__trait").css("color", "#666");
            Ember.$(".filter__trait").css("border", "none");
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
        }
    },
    
    init: function() {
        var that = this;
        //get name where id = 051b478dd9b58f6f31c5e580996724df (countess)
    }
});
