/*jslint anon:true, nomen:true*/

/*globals YUI*/

YUI.add('mojito-chunker-mojit', function(Y, NAME) {

    'use strict';

    /**
    The Chunker mojit is an utility mojit that can be used to
    segment the response into chunks. This can helps to
    improve performance by flushing the first byte as soon
    as the first child in the `chunks` config gets ready,
    and subsequently doing the same for each chunk.

        {
            "specs": {
                "page": {
                    "type": "mojito-chunker-mojit",
                    "config": {
                        "chunks": [
                            {
                                "type": "header",
                                "config": {}
                            },
                            {
                                "type": "content",
                                "config": {}
                            },
                            {
                                "type": "footer",
                                "config": {}
                            }
                        ]
                    }
                }
            }
        }

    In the example above, `header` child will be executed first,
    and the result of the execution will be flushed to the client
    by calling `ac.flush()` with the `data` and `meta` from the
    `header` execution. Then `content` will be executed, and
    the same principle applies. If a child mojit fails, it will be
    skipped by default, but you can control the errors by using
    `propagateFailure` appropially.

    This mojit does not have view associated, and it will just
    flush the response from each mojit in the `chunks` config.

    Every child will be executed and flushed in sync by honoring
    the order they appear in the `chunks` array from the
    configuration.

    @module mojito-chunker-mojit
    @requires mojito-config-addon, mojito-composite-addon
    **/

    /**
    Constructor for the Controller class.

    @class Controller
    @static
    @constructor
    **/
    Y.namespace('mojito.controllers')[NAME] = {

        /**
        Default action `index` responsible for implement
        the `chunk` pattern where each child will be executed
        at a time in a form of an sync queue. The response
        of each child in the queue will be flushed to the
        client side by calling `ac.flush()`.

        @method index
        @param {Object} ac The ActionContext that provides access
                to the Mojito API.
        **/
        index: function (ac) {
            this.__call(ac);
        },

        __call: function (ac) {

            var chunks = ac.config.get('chunks');

            function flushNext() {

                var child = chunks.shift(),
                    cfg;

                if (child) {

                    // Map the action to the child if the action
                    // is not specified as part of the child config.
                    child.action = child.action || ac.action;

                    // Create a config object for the composite addon
                    cfg = {
                        children: {
                            child: child
                        }
                    };

                    // Now execute the child as a composite
                    ac.composite.execute(cfg, function (data, meta) {

                        if (data && Y.Lang.isString(data.child)) {
                            // flushing child content to the client
                            ac.flush(data.child, meta);
                        } else {
                            // child failed, skipping and rolling...
                            Y.log('Child `' + child.base || child.type + '` of `' +
                                ac.instance.type + '` failed. Skip and continue ' +
                                'flusing other chunks.', 'debug', NAME);
                        }

                        flushNext();

                    });

                } else {

                    // nothing more to do here other than
                    // handing over the control to the
                    // framework.
                    ac.done('');

                }

            }

            if (!chunks || !Y.Lang.isArray(chunks)) {
                ac.error(new Error('Invalid `chunk` configuration. The `array` ' +
                    'with the `chunks` is required.'));
                return;
            }

            // to avoid changing the original array
            chunks = [].concat(chunks);

            flushNext();

        }

    };

}, '0.0.1', {requires: [
    'mojito',
    'mojito-config-addon',
    'mojito-composite-addon'
]});
