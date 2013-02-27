/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('foo', function(Y, NAME) {

/**
 * The foo module.
 *
 * @module foo
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
            ac.helpers.set('foo', function () {
                return 1;
            });
            ac.done({
                bar: 2,
                /* this is to test the #with build it helper */
                baz: {
                    xyz: 3
                }
            });
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-helpers-addon']});
