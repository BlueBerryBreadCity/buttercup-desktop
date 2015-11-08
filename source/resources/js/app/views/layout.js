"use strict";

// Import Deps
import _ from 'underscore';
import Backbone from 'backbone';
import Tpl from 'tpl/layout.html!text';
import SidebarView from 'app/views/sidebar';
import EntriesView from 'app/views/entries';
import EntryView from 'app/views/entry';

// Export View
export default Backbone.View.extend({
    el: '.window',

    initialize: function () {
        // Instances
        this.template = _.template(Tpl);
        this.sidebar = new SidebarView;
        this.entries = new EntriesView;
        this.entry   = new EntryView;

        Buttercup.Events.on('groupSelected', this.entries.setGroup, this.entries);
        Buttercup.Events.on('groupLoaded', this.updateItemCount, this);
        Buttercup.Events.on('entrySelected', this.loadEntry, this);

        // Render
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.params));
        this.$('.pane-group').append(this.sidebar.render().el);
        this.$('.pane-group').append(this.entries.render().el);
        this.$('.pane-group').append(this.entry.render().el);
    },

    updateItemCount: function (collection) {
        this.$('.toolbar-footer h1').text(`${collection.length} entries`);
    },

    loadEntry: function (model) {
        this.entry.destroy();
        this.entry = new EntryView({
            model: model
        });
        this.$('.pane-group').append(this.entry.render().el);
    }
});