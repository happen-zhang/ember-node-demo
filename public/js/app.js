
window.App = Ember.Application.create();

// 设置应用的serializer
App.ApplicationSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id'
});

// 设置应用的adapter
App.ApplicationAdapter = DS.RESTAdapter.extend({
    namespace: 'api/v1'
});

// 设置应用的store
App.Store = DS.Store.extend({
    adapter: 'App.ApplicationAdapter'
});

// api接口地址
DS.RESTAdapter.reopen({
    host: 'http://localhost:3000'
});

// 路由映射
App.Router.map(function() {
    this.route('index', { path: '/' });
    this.route('about', { path: '/about' });

    // 定义locations资源
    this.resource('locations', function() {
        this.route('index', { path: '/' });
        this.route('new', { path: '/new' });
        this.route('edit', { path: '/:location_id' });
    });
});
