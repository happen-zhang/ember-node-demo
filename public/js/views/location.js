
// 定义视图
App.NavView = Ember.View.extend({
    tagName: 'li',
    classNameBindings: ['active'],

    didInsertElement: function () {
          var self = this;

          this._super();
          // 通知状态改变
          this.notifyPropertyChange('active');
          this.get('parentView').on('click', function () {
              self.notifyPropertyChange('active');
          });
    },

    active: function() {
      return this.get('childViews.firstObject.active');
    }.property()
});
