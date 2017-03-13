import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('heroes-bar-stat', 'Integration | Component | heroes bar stat', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{heroes-bar-stat}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#heroes-bar-stat}}
      template block text
    {{/heroes-bar-stat}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
