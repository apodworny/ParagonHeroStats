import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {
        this._super(...arguments);
        var attacksPerSecond = this.get('aps');
        var maxAps = this.get('maxAps');
        var minAps = this.get('minAps');
        console.log("ASDSADSA: " + attacksPerSecond);

        var domEle = this.$('.bar-stat');
        domEle.children().css("width", (attacksPerSecond-minAps)/(maxAps-minAps)*100 + "%");

        //can use a percentage for the bar graph, whereas 100 is 0, and the highest number is 100%

        //subtract 100 from attack speed at level 15, 0 is 0%, then divide the value you get by the maximum number that a hero can have at level 15 (value/max), and that works as a percentage
        //will have to set the percentage in javascript, likely on the specific element
    }
});
