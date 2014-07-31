
// 创建模型
App.Location = DS.Model.extend({
    latitude: DS.attr('string'),
    longitude: DS.attr('string'),
    accuracy: DS.attr('string')
});
