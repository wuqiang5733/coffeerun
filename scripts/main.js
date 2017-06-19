(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var App = window.App;
    /**
     * The job of this module is to receive the window object for use inside the function body.
     * It also retrieves the constructors you defined as part of the window.App namespace.
     */
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;

    var myTruck = new Truck('ncc-1701', new DataStore());
    /**
     * So that you can interact with the instance of Truck, export it to the global namespace in main.js.
     */
    window.myTruck = myTruck;
    var formHandler = new FormHandler(FORM_SELECTOR);
    /**
     * You want createOrder to be called each time a submit event occurs.
     * But you cannot just pass a reference to createOrder to formHandler.addSubmitHandler.
     * This is because createOrder’s owner changes when it is invoked inside of the event handling callback.
     * With a different owner, the value of this inside the body of createOrder will not be the Truck instance,
     * thus causing an error when createOrder runs.
     * Instead, you will pass a bound reference to myTruck.createOrder to formHandler.addSubmitHandler.
     * Update formhandler.js with this change.
     * Make sure to bind the method reference so that its owner is guaranteed to be myTruck.
     *
     *     Truck.prototype.createOrder = function (order) {
     *         console.log('Adding order for ' + order.emailAddress);
     *         this.db.add(order.emailAddress, order);
     *     };
     *
     * 也就是让 createOrder 当中的 this 指向 myTruck
     */
    formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
    console.log(formHandler);
})(window);
