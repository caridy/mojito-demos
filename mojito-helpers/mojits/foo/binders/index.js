/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('fooBinderIndex', function(Y, NAME) {

/**
 * The fooBinderIndex module.
 *
 * @module fooBinderIndex
 */

    /**
     * Constructor for the fooBinderIndex class.
     *
     * @class fooBinderIndex
     * @constructor
     */
    Y.namespace('mojito.binders')[NAME] = {

        /**
         * Binder initialization method, invoked after all binders on the page
         * have been constructed.
         */
        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        /**
         * The binder method, invoked to allow the mojit to attach DOM event
         * handlers.
         *
         * @param node {Node} The DOM node to which this mojit is attached.
         */
        bind: function(node) {
            var me = this;
            node.on('click', function () {
                node.append('<span> [loading...]</span>');
                me.mojitProxy.invoke('index', {}, function(error, result){
                    if (error) {
                        console.log("**********************I am getting an error: " + error);
                    }
                    // replacing the current content
                    node.replace(Y.Node.create(result));
                });
            });
        }

    };

}, '0.0.1', {requires: ['node', 'mojito-client']});
