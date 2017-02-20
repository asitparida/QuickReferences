'use strict';
window._extensionsAssets = Object.create(null);
window._extensionsAssets['templates/extensions/codeviewer.directive.tmpl.html'] = '<div class="codeview">\n    <div class="codeview-container">\n        <div class="codeview-container-view">\n            <div class="codeview-container-actions">\n                <div class="pull-left">\n                    <div class="codeview-container-actions-logo">\n                        <img src="/dist/images/css3.png" ng-show="codeViewer.post.category == \'css\'" />\n                        <img src="/dist/images/js.png" ng-show="codeViewer.post.category == \'javascript\'" />\n                        <img src="/dist/images/html5.png" ng-show="codeViewer.post.category == \'markup\'" />\n                        <img src="/dist/images/scss.png" ng-show="codeViewer.post.category == \'scss\'" />\n                    </div>\n                    <div class="codeview-container-actions-title" ng-bind="codeViewer.post.name">Lorem Ipsum Dolor Sit Amet</div>\n                </div>\n                <div class="pull-right">\n                    <div class="codeview-container-actions-action">\n                        <i class="ms-Icon ms-Icon--Share" aria-hidden="true"></i>\n                    </div>\n                    <div class="codeview-container-actions-action">\n                        <i class="ms-Icon ms-Icon--Like" aria-hidden="true"></i>\n                    </div>\n                </div>\n                <div class="clearfix"></div>\n            </div>\n            <div class="codeview-container-flasks">\n                <div class="codeview-container-flasks-item" ng-repeat="mod in codeViewer.post.content" id="{{codeViewer.codeViewerId + \'_MOD_\' + $index}}">\n                    <p ng-if="mod.type == \'text\'" ng-bind="mod.data"></p>\n                    <pre ng-if="mod.type == \'flask\'" ng-init="codeViewer.loadViewer($index)" class="language-{{mod.langExt}}">\n                        <code></code>\n                    </pre>\n                </div>                \n            </div>\n            <div class="codeview-container-actions">\n                <md-content class="md-padding" layout="column">\n                    <md-chips ng-model="codeViewer.post.tags" readonly="true" md-removable="false"></md-chips>\n                </md-content>\n                <div class="clearfix"></div>\n            </div>\n        </div>\n    </div>\n</div>';
window._extensionsAssets['templates/extensions/snippetloader.directive.tmpl.html'] = '<div class="snippetview-preview">\n    <div class="codeview snippetview">\n        <div class="codeview-container">\n            <div class="codeview-container-view">\n                <div class="codeview-container-actions">\n                    <div class="pull-left">\n                        <div class="codeview-container-actions-logo">\n                            <div class="snippetview-preview-actions-logo">\n                                <div class="snippetview-loader"></div>\n                            </div>\n                        </div>\n                        <div class="codeview-container-actions-title">\n                            <div class="snippetview-loader"></div>\n                        </div>\n                    </div>\n                    <div class="clearfix"></div>\n                </div>\n                <div class="snippetview-container">\n                    <div class="snippetview-preview-text">\n                        <div class="snippetview-loader"></div>\n                        <div class="snippetview-loader"></div>\n                        <div class="snippetview-loader"></div>\n                    </div>\n                    <div class="snippetview-container-overlay"></div>\n                </div>\n                <div class="codeview-container-actions">\n                </div>\n            </div>\n        </div>\n    </div>\n</div>';
window._extensionsAssets['templates/extensions/snippetview.directive.tmpl.html'] = '<div class="codeview snippetview">\n    <div class="codeview-container">\n        <div class="codeview-container-view">\n            <div class="codeview-container-actions">\n                <div class="pull-left">\n                    <div class="codeview-container-actions-logo"><img /></div>\n                    <div class="codeview-container-actions-title" ng-bind="::snippetViewer.post.name">Lorem Ipsum Dolor Sit Amet</div>\n                </div>\n                <div class="pull-right">\n                    <div class="codeview-container-actions-action">\n                        <i class="ms-Icon ms-Icon--Share" aria-hidden="true"></i>\n                    </div>\n                    <div class="codeview-container-actions-action">\n                        <i class="ms-Icon ms-Icon--Like" aria-hidden="true"></i>\n                    </div>\n                </div>\n                <div class="clearfix"></div>\n            </div>\n            <div class="snippetview-container">\n                <p class="snippetview" ng-bind="::snippetViewer.post.description"></p>\n                <div class="codeview-container-flasks snippetview" ng-init="snippetViewer.loadSnippet()">\n                    <div class="codeview-container-flasks-item" ng-repeat="mod in ::snippetViewer.previewContent" id="{{::snippetViewer.snippetViewerId + \'_MOD_\' + $index}}">\n                        <pre ng-if="::mod.type == \'flask\'" class="snippetview language-{{::mod.langExt}}" ng-init="snippetViewer.loadViewer($index)">\n                        <code></code>\n                    </pre>\n                    </div>\n                </div>\n                <div class="snippetview-container-overlay"></div>\n            </div>\n            <div class="codeview-container-actions md-chips-container">                \n            </div>\n        </div>\n    </div>\n</div>';
