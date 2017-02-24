﻿(function () {
    "use strict";

    var _newFlaskContent = {
        'text': {
            "type": "text",
            "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        },
        'javascript': {
            "type": "flask",
            "lang": "js",
            "langExt": "javascript",
            "data": "function(){\nconsole.log('hello');\n}"
        },
        'markup': {
            "type": "flask",
            "lang": "htm",
            "langExt": "markup",
            "data": "<div class=\"\"></div>"
        },
        'css': {
            "type": "flask",
            "lang": "scss",
            "langExt": "css",
            "data": "@mixin respond-to($media) {\n    @content;\n        }\n    }\n}        \n                              \n.dashboard {\n   display:\"bloc\";\n}"
        },
        'scss': {
            "type": "flask",
            "lang": "scss",
            "langExt": "css",
            "data": "@mixin respond-to($media) {\n    @content;\n        }\n    }\n}        \n                              \n.dashboard {\n   display:\"bloc\";\n}"
        }
    };

    angular.module('QR.Web.Author')
    .controller('PostController', ['$uibModal', 'Notify', 'SharedService', 'SampleGet', '$timeout', function ($uibModal, notifyService, shared, SampleGet, $timeout) {
        var self = this;
        self.shared = shared;
        self.sampleGet = SampleGet;
        self.timeout = $timeout;
        self.flask = '';
        self.currentFlaskIndex = 0;
        self.flasksBeingReodered = false;
        self.mainTags = [
            { id: 'markup', name: 'html', forecolor: '#ffffff', backcolor: '#ff6d2e' },
            { id: 'javascript', name: 'js', forecolor: '#000000', backcolor: '#ffc629' },
            { id: 'css', name: 'css', forecolor: '#ffffff', backcolor: '#2facdb' },
            { id: 'scss', name: 'scss', forecolor: '#ffffff', backcolor: '#d2679e' }
        ];
        var _paneHolder = 'authoringFlaskPaneHolder';
        self.onDropComplete = function (_dropIndex, data) {
            self.swapContent(_dropIndex, data.index)
        }
        self.swapContent = function (_dropIndex, _pickIndex) {            
            var _temp = self.post.content[_pickIndex];
            self.post.content.splice(_pickIndex, 1);
            self.post.content.splice(_dropIndex, 0, _temp);            
            _.each(self.post.content, function (_content, _iter) {
                _content.index = _iter;
            });            
        }
        self.flasks = [];
        self.post = {};
        self.enableFlaskReordering = function () {
            if (!self.flasksBeingReodered) {
                self.flasksBeingReodered = true;
            }
            else {
                self.flasksBeingReodered = false;
            }
        }
        self.addFlask = function (_type) {
            var _flask = angular.copy(_newFlaskContent[_type]);
            _flask.uid = _.uniqueId('_FLASK_CONTENT_');
            _flask.index = self.currentFlaskIndex;
            self.post.content.splice(self.currentFlaskIndex, 0, _flask);
            self.currentFlaskIndex = self.post.content.length;
            self.timeout(function () {
                var _selector = '[uid="' + _flask.uid + '"]';
                var _elem = document.querySelector(_selector);
                if (_elem) {
                    var _focusElm = _elem.querySelector('textarea');
                    if (_focusElm)
                        _focusElm.focus();
                }
            }, 100);
        }

        self.setupFlask = function (_content, _iter, _flaskId) {
            var _flask = new CodeFlask();
            _flask.run('#' + _flaskId, { language: _content.langExt });
            _flask.uid = _content.uid;
            _flask.update(_content.data);
            _flask.onUpdate(function (code) {
                var html = Prism.highlight(code, Prism.languages[_content.langExt]);
                _.each(self.post.content, function (_content) {
                    if (_content.uid == _flask.uid) {
                        _content.data = html;
                        if (typeof self.post["updateFlask"] !== 'undefined' && typeof self.post["updateFlask"] === 'function') {
                            self.post["updateFlask"](html, _content.uid);
                        }
                    }
                });
            });
            self.flasks.push(_flask);
        }

        self.loadFlask = function (_id) {
            self.timeout(function () {
                _.each(self.post.content, function (_content, _iter) {
                    if (_iter == _id) {
                        var _elem = document.getElementById('_FLASK_' + _id);
                        if (_elem) {
                            var _flaskElm = _elem.querySelector('[data-flask="true"]');
                            if (_flaskElm) {
                                _flaskElm.classList.add('language-' + _content.langExt);
                                var _flaskId = '_CE_FLASK_' + _iter;
                                _flaskElm.setAttribute('id', _flaskId);
                                self.setupFlask(_content, _iter, _flaskId);
                            }
                        }
                    }
                });
            }, 33);
        }

        function _transfromResponse(_data) {
            self._originalPost = angular.copy(_data);
            _.each(_data.content, function (_content, _iter) {
                _content.uid = _.uniqueId('_FLASK_CONTENT_');
                _content.index = _iter;
            });
            return _data;
        }

        self.init = function () {

            self.sampleGet.get().then(function (data) {
                var _data = {
                    "name": "Lorem Ipsum Dolor Sit Amet",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    "tags": ["html5", "material", "js", "css"],
                    "category": "javascript",
                    "content": [
                        {
                            "type": "text",
                            "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                        },
                        {
                            "type": "flask",
                            "lang": "js",
                            "langExt": "javascript",
                            "data": "$(document).ready(function () {\r\n    var flask = new CodeFlask;\r\n    flask.run('#coder', { language: 'javascript', rtl: false });\r\n    flask.onUpdate(function (code) {\r\n        document.getElementById('display').innerHTML \r\n\t= Prism.highlight(code, Prism.languages.javascript);\r\n    });\r\n})"
                        },
                        {
                            "type": "text",
                            "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                        },
                        {
                            "type": "flask",
                            "lang": "scss",
                            "langExt": "css",
                            "data": "@mixin respond-to($media) {\r\n    @if $media == tablet {\r\n        @media only screen and (min-width:$break-tablet) and (max-width:$break-desktop - 1) {\r\n            @content;\r\n        }\r\n    }\r\n    @else if $media == mobile {\r\n        @media only screen and (max-width:$break-tablet - 1) {\r\n            @content;\r\n        }\r\n    }\r\n}        \r\n                              \r\n.dashboard {\r\n    width: 100%;    \r\n    padding: 0;\r\n    -moz-box-sizing: border-box;\r\n    -webkit-box-sizing: border-box;\r\n    box-sizing: border-box;\r\n    position: relative;\r\n    border-left: 1px solid #E6E6E6;   \r\n    &-heading {\r\n        font-weight: 100;\r\n        width: 100%;\r\n        text-align: center;\r\n        color: #d0d0d0;\r\n    }\r\n}"
                        },
                        {
                            "type": "text",
                            "data": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                        },
                        {
                            "type": "flask",
                            "lang": "htm",
                            "langExt": "markup",
                            "data": "<footer class=\"footer-bod\">\r\n    <div class=\"footer-bod-content\">\r\n        <ul class=\"pull-left\">                        \r\n            <li>\r\n                <a>Feedback</a>\r\n            </li>\r\n            <li>\r\n                <a>Contact Us</a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</footer>"
                        }
                    ]
                };
                self.post = _transfromResponse(_data);
                self.currentFlaskIndex = self.post.content.length;
            }, function (data) {
            });

        }
        self.timeout(self.init, 100);
    }]);
})();