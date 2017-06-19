(function (window) {
    'use strict';

    var App = window.App || {};
    /**
     * The reason for doing this is to make it explicit that your module is using code that is defined elsewhere.
     * This is a best practice for coordinating with team members and for future maintenance.
     */
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        // Prefixing a variable with $ is a sign that the variable refers to elements selected using jQuery.
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }
    // formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
    FormHandler.prototype.addSubmitHandler = function (fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function (event) {
            event.preventDefault();

            var data = {};
            // Inside your submit handler callback, the this object is a reference to the form element
            $(this).serializeArray().forEach(function (item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data);
            this.reset();
            this.elements[0].focus();
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
