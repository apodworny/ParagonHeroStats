import DS from 'ember-data';

export default DS.Model.extend({
    MaxEnergy: DS.attr('string'),
    BasicPenetrationRating: DS.attr('string'),
    BaseAttackTime: DS.attr('string'),
    AbilityPenetrationRating: DS.attr('string'),
    HealthRegenRate: DS.attr('string'),
    AbilityResistanceRating: DS.attr('string'),
    MaxHealth: DS.attr('string'),
    BasicResistanceRating: DS.attr('string'),
    CleaveRating: DS.attr('string'),
    AttackSpeedRating: DS.attr('string'),
    EnergyRegenRate: DS.attr('string')
});
