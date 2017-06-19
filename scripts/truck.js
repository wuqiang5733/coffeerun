(function (window) {
    'use strict';
    var App = window.App || {};

    function Truck(truckId, db) {
        this.truckId = truckId;
        this.db = db;
    }

    Truck.prototype.createOrder = function (order) {
        console.log('Adding order for ' + order.emailAddress);
        this.db.add(order.emailAddress, order);
    };

    Truck.prototype.deliverOrder = function (customerId) {
        console.log('Delivering order for ' + customerId);
        this.db.remove(customerId);
    };

    Truck.prototype.printOrders = function () {
        /**
         *  Inside of a callback function, this is not assigned to an object.
         *  You need to explicitly assign one.
         *
         *  In JavaScript,
         *  the keyword this inside of a function is automatically assigned a value when you call that function.
         *  For constructor functions and for prototype methods,
         *  the value of this is the instance object.
         *  The instance is called the owner of the function call.
         *  Using the keyword this gives you access to the properties of the owner.
         *
         *  For callback functions this is not automatically assigned to an object.
         *  You can manually specify what object should be the owner by using a function’s bind method.
         *  (Remember that JavaScript functions are actually objects
         *  and can have their own properties and methods, such as bind.)
         *  The bind method accepts an object argument and returns a new version of the function.
         *  When you call the new version,
         *  it will use the object argument passed in to bind as the value of this inside of the function’s body.
         *
         *  Outside the body of the forEach callback,
         *  the keyword this refers to the Truck instance.
         *  By adding .bind(this) immediately after the anonymous function
         *  – but inside the parentheses for the forEach call
         *  – you are passing forEach a modified version of the anonymous function.
         *  This modified version uses the Truck instance as its owner.
         */
        var customerIdArray = Object.keys(this.db.getAll());
        console.log('Truck #' + this.truckId + ' has pending orders:');
        customerIdArray.forEach(function (id) {
            console.log(this.db.get(id));
        }.bind(this));
    };

    App.Truck = Truck;
    window.App = App;
})(window);
