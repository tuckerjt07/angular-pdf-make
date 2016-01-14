/*global angular, pdfMake */
angular.module('angular.pdf.make', [])
    .directive('angularPdfMake', ['$sce', '$templateCache', function ($sce, $templateCache) {
        'use strict';
        $templateCache.put('angularPdfMake.html', '<div style="height: 100vh; text-align: center;"> <iframe ng-src="" name="test" style="width: 55%; height: 100%; background-color: transparent;" title="Test" frameborder="0"> </iframe> </div>');
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                content: '=',
                styles: '='
            },
            templateUrl: 'angularPdfMake.html',
            link: function (scope, element) {
                var callback;
                callback = function (dataUrl) {
                    element.find('iframe')[0].src = $sce.trustAsResourceUrl(dataUrl);
                    scope.$apply();
                };
                pdfMake.createPdf().getDataUrl(callback, null, {
                    content: scope.content,
                    styles: scope.styles
                });
            }
        };
    }]);
