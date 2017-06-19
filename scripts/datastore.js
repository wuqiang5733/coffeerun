(function (window) {
    'use strict';

    var App = window.App || {};

    function DataStore() {
        console.log('running the DataStore function')
        this.data = {};
    }

    /**
     * In JavaScript, all instances created by a constructor have access to a shared storehouse of properties and methods:
     * the prototype property of the constructor.
     * To create these instances, you used the new keyword when you called the constructor.
     * The new keyword not only creates your instance and returns it
     * but also creates a special link from the instance to the constructor’s prototype property.
     * This link exists for any instance created when the constructor is created with the new keyword.
     * 也就是说用 prototype 创建的任何 属性 与 方法 所有的实例都能够使用
     */
    DataStore.prototype.add = function (key, val) {
        /**
         *  You can use the keyword this inside of the function body, and it will refer to the instance.
         *  this 指代的是用 new 创建的实例
         */
        this.data[key] = val;
    };

    DataStore.prototype.get = function (key) {
        return this.data[key];
    };

    DataStore.prototype.getAll = function () {
        return this.data;
    };

    DataStore.prototype.remove = function (key) {
        delete this.data[key];
    };

    App.DataStore = DataStore;

    /**
     * Your CoffeeRun IIFEs will be passed the window object.
     * But instead of attaching their module code directly to the global namespace,
     * they will attach code to a single App property within the global namespace.
     */
    window.App = App;
})(window);


