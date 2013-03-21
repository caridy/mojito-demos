/*jslint anon:true, nomen:true*/

/*globals YUI*/

YUI.add('mojito-composer-mojit', function(Y, NAME) {

    'use strict';

    /**
     * The Composer Mojit module.
     *
     * @module mojito-composer-mojit
     */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.namespace('mojito.controllers')[NAME] = {

        /**
         * Method corresponding to the 'index' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        index: function(ac) {
            this.__call(ac);
        },

        __call: function (ac) {
            ac.models.get('mojito_composer_mojitModelFoo').getData(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.assets.addCss('./index.css');
                ac.done({
                    status: 'Mojito is working.',
                    data: data
                });
            });
        }

    };

}, '0.0.1', {requires: ['mojito']});
