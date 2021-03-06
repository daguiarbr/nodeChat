(function() {
    "use strict";

    var module = angular.module('chat', []);

    module.controller('index', ['$scope', '$location',
        function($scope, $location) {
            var chat = io.connect('http://localhost:3010/', {
                query: 'appId=' + getParameterByName('i')
            });

            chat.on('connect', function() {
                chat.emit('getStatus');
            });

            chat.on('updateStatus', function(data) {
                $scope.status = data;
                $scope.$apply();
            });
        }
    ]);

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
})();