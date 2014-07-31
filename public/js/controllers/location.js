
App.LocationsIndexController = Ember.ArrayController.extend({
    editCounter: function() {
        return this.filterProperty('selected', true).get('length');
    }.property('@each.selected'),

    itemsSelected: function() {
        return this.get('editCounter') > 0;
    }.property('editCounter'),

    hasLocation: function() {
        return hasLocation = this.get('content').get('length') > 0;
    }.property('content.@each'),

    actions: {
        removeItem: function(location) {
            location.on('didDelete', this, function() {
                console.log('record deleted');
            });

            location.destroyRecord();
        },

        removeSelectedLocations: function() {
            var locations = this.filterProperty('selected', true);
            if (locations.length === 0) {
                return ;
            }

            for (i = 0; i < locations.length; i++) {
                locations[i].destroyRecord();
            }
        }
    }
});

App.LocationsEditController = Ember.ObjectController.extend({
    actions: {
        updateItem: function(location) {
            location.save();
            this.get("target").transitionTo("locations");
        }
    },

    isNew: function() {
        return this.get('content').get('id');
    }.property()
});
