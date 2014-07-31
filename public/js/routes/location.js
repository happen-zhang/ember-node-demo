
App.LocationsIndexRoute = Ember.Route.extend({
    // 建立controller
    setupController: function(controller) {
        // 大小要注意，find('Location')会认为返回的必须是{ Locations: [...] }
        var locations = this.get('store').find('location');
        controller.set('content', locations);
    },

    renderTemplate: function() {
        this.render('locations.index', { into: 'application' });
    }
});

App.LocationsNewRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        // 创建一个location
        var location = this.store.createRecord('location', {});
        this.controllerFor('locations.edit').setProperties({
            isNew: true,
            content: location
        });
    },

    renderTemplate: function() {
        this.render('locations.edit', { into: 'application' });
    }
});

App.LocationsEditRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        this.controllerFor('locations.edit').setProperties({
            isNew: false,
            content: model
        });
    },

    renderTemplate: function() {
        this.render('locations.edit', { into: 'application' });
    }
});
