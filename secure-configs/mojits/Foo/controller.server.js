/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('Foo', function(Y, NAME) {

/**
 * The Foo module.
 *
 * @module Foo
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.namespace('mojito.controllers')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        /**
         * Method corresponding to the 'index' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        index: function(ac) {
            var public1 = this.config.public1,
                global = (this.config.global ? ac.app.config[this.config.global] : {}),
                computed = Y.merge(this.config, global),
                business = ac.app.config.business,
                secret1 = computed.secret1,
                secret3 = ac.config.getDefinition('secret3');

            ac.models.FooModelFoo.getData(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.assets.addCss('./index.css');
                ac.done({
                    status: 'Mojito is working.',
                    data: data,
                    business: JSON.stringify(business),
                    public1: public1,
                    secret1: secret1,
                    secret3: secret3
                });
            });
        }

    };

}, '0.0.1', {requires: ['mojito', 'FooModelFoo']});
