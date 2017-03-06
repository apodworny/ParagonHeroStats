import DS from 'ember-data';

var ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'https://developer-paragon.epicgames.com',
    namespace: 'v1',
    headers: {
        'X-Epic-ApiKey': 'fffcb8995c85473c9b7b33a2991a123c'
    },
    pathForType: function(hero){
        return "heroes/complete";
    }
    /*host: 'https://jsonplaceholder.typicode.com',
    pathForType: function () {
        return 'posts';
    }*/
});

export default ApplicationAdapter;