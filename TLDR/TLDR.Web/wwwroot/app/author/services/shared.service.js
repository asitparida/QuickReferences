﻿(function () {
    "use strict";

    angular.module('QR.Web.Author')
    .service("SharedService", ["$http", "$q", "$window", SharedService]);

    function SharedService($http, $q, $window) {
        var self = this;
        self.showLoader = true;
        self.actions = [];
        var _name = 'Harold E. Foley'
        self.profile = {
            'name': _name,
            'alias': 'hfoley',
        };
        var data = {
            message: 'Hi ' + _name + ', fetching your details ...',
            dismissable: false,
            info: false,
            success: false,
            failed: false,
            inProgress: true
        };
        self.breadcrumbs = [];
        self.menuItems = [];
        self.activeTopNav = 0;
        self.loadBreadCrumbs = function (data) {
            self.breadcrumbs = data;
        }
        self.serviceApps = [
        {
            'id': 1,
            'appName': 'All',
            'appChar': 'A',
            'appUrl': '#'
        },
        {
            'id': 2,
            'appName': 'HTML5',
            'appChar': 'A',
            'appUrl': '#'
        },
        {
            'id': 3,
            'appName': 'JS',
            'appChar': 'A',
            'appUrl': '#'
        },
        {
            'id': 4,
            'appName': 'CSS',
            'appChar': 'A',
            'appUrl': '#'
        }
        ];

        self.sidebarCollapsed = false;

        return self;
    }

})();