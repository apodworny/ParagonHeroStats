import Ember from 'ember';

export default Ember.Component.extend({
    didReceiveAttrs() {
        this._super(...arguments);
        const attacksPerSecond = this.get('aps');
        console.log("ASDSADSA: " + attacksPerSecond);


        //can use a percentage for the bar graph, whereas 100 is 0, and the highest number is 100%

        //subtract 100 from attack speed at level 15, 0 is 0%, then divide the value you get by the maximum number that a hero can have at level 15 (value/max), and that works as a percentage
        //will have to set the percentage in javascript, likely on the specific element
    }
});
