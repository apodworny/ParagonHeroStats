import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {
        this._super(...arguments);
        var heroData = this.get('heroData');
        var attacksPerSecond = heroData.AttacksPerSecond;
        var burstDamage = heroData.BurstDamage;
        var damagePerSecond = heroData.DamagePerSecond;
        var maxAps = this.get('maxAps');
        var minAps = this.get('minAps');
        var maxBurst = this.get('maxBurst');
        var minBurst = this.get('minBurst');
        var maxDps = this.get('maxDps');
        var minDps = this.get('minDps');

        var domEle = this.$('.bar-stat');
        domEle.children(".bar--aps").css("width", (attacksPerSecond-minAps)/(maxAps-minAps)*100 + "%");
        domEle.children(".bar--burst").css("width", (burstDamage-minBurst)/(maxBurst-minBurst)*100 + "%");
        domEle.children(".bar--dps").css("width", (damagePerSecond-minDps)/(maxDps-minDps)*100 + "%");

        //can use a percentage for the bar graph, whereas 100 is 0, and the highest number is 100%

        //subtract 100 from attack speed at level 15, 0 is 0%, then divide the value you get by the maximum number that a hero can have at level 15 (value/max), and that works as a percentage
        //will have to set the percentage in javascript, likely on the specific element
    }
});
