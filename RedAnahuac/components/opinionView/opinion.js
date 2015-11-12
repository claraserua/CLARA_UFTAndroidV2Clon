'use strict';

app.opinionView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_aboutView
// END_CUSTOM_CODE_aboutView
(function(parent) {
    var opinionViewModel = kendo.observable({
        openLink: function(url) {
            window.open(url, '_system');
            if (window.event) {
                window.event.preventDefault && window.event.preventDefault();
                window.event.returnValue = false;
            }
        }
    });

    parent.set('opinionViewModel', opinionViewModel);
})(app.opinionView);

// START_CUSTOM_CODE_aboutViewModel
// END_CUSTOM_CODE_aboutViewModel