(function (window) {

    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) { throw new Error("No selector provided"); }
        
        this.$formElement = $(selector);
        if(this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }

        FormHandler.prototype.addSubmitHandler = function (fn) {
            alert("test");
            console.log('Setting submit handler for form');
            this.$formElement.on('submit', function(event) {
                event.preventDefault();

                var data = {};
                
                $(this).serializeArray().forEach(function(item){
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                    
                });

                console.log(data);
                
                var emailAddress = document.getElementById('emailAddress');
                
                fn(data);
                var remoteDS = new App.RemoteDataStore
                ("http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders");
                
                remoteDS.add(emailAddress, data);
                console.log("calling getall");
                var allCoffeeOrders = remoteDS.getAll();

                console.log("calling get");
                var myOrder = remoteDS.get(emailAddress);
                
                this.reset();
                this.elements[0].focus();
            });
        };


        FormHandler.prototype.addInputHandler = function (fn) {
            console.log('Setting input handler for form');
            this.$formElement.on('input', '[name="emailAddress"]', function(event){

                var emailAddress = event.target.value;

                var message = '';
                if (fn(emailAddress)) {
                    
                event.target.setCustomValidity('');
                } else {
                message = emailAddress + ' is not an authorized email address!'
                event.target.setCustomValidity(message);
                }
                
            });
        };

        FormHandler.prototype.addSubmitHandlerForPayment = function (fn) {
            console.log('Setting submit handler for form');
            this.$formElement.on('submit', function(event) {
                event.preventDefault();

                var data = {};
                var name = "";
                var title = "";
                $(this).serializeArray().forEach(function(item){
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                    if(item.name === "title"){
                        title = item.value;
                    }
                    if(item.name === "username"){
                        name = item.value;
                    }
                });
                var str = "Thank you for your payment, " + title + " " + name;
                document.getElementById("payment").innerHTML = str;

                $("#payment").modal("show");

                console.log(data);
                fn(data);
                this.reset();
                this.elements[0].focus();
            });
        };
    }
    App.FormHandler = FormHandler;
    window.App = App;

})(window);