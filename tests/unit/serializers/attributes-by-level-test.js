import { moduleForModel, test } from 'ember-qunit';

moduleForModel('attributes-by-level', 'Unit | Serializer | attributes by level', {
  // Specify the other units that are required for this test.
  needs: ['serializer:attributes-by-level']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
