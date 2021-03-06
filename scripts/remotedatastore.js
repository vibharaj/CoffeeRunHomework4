(function (window) {
    'use strict';
    var App = window.App || {};

    function RemoteDataStore() {

        // if (!url) {
        //     throw new Error('No remote URL supplied.');
        //     }
        //     this.serverUrl = url;
    }


    RemoteDataStore.prototype.add = function(data) {
        var collection = firebase.firestore().collection('orders');
        return collection.add(data);
    };

    RemoteDataStore.prototype.getAllOrders = function(renderer) {
        var query = firebase.firestore()
            .collection('orders')
            .limit(50);
      
        console.log(query);
    };

    RemoteDataStore.prototype.getOrder = function(id) {
        return firebase.firestore().collection('orders').doc(id).get();
    };
    

    RemoteDataStore.prototype.remove = function (emailAddress) {
        $.ajax(this.serverUrl + '/' + emailAddress, {
            type: 'DELETE'
        });
    };
        
    RemoteDataStore.prototype.removeAll = function () {
        $.ajax(this.serverUrl, {
            type: 'DELETE'
        });
    };

    // RemoteDataStore.prototype.add = function (key, val) {
    //     $.post(this.serverUrl, val, function(serverResponse){
    //         console.log(serverResponse);
    //     });
    // };

    // RemoteDataStore.prototype.getAll = function () {
    //     $.get(this.serverUrl, function (serverResponse) {
    //         console.log(serverResponse);
    //     });         
    // };

    // RemoteDataStore.prototype.get = function (key) {
    //     $.get(this.serverUrl + '/' + key, function (serverResponse) {
    //         console.log(serverResponse);
    //     });         
    // };


    // RemoteDataStore.prototype.remove = function (key) {
    //     $.ajax(this.serverUrl + '/' + key, {
    //         type: 'DELETE'
    //     });
    // };
        
    // RemoteDataStore.prototype.removeAll = function (key) {
    //     $.ajax(this.serverUrl, {
    //         type: 'DELETE'
    //     });
    // };
    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
}) (window);