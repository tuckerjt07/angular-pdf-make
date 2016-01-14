(function () {

'use strict';

angular.module('angularPdfMakeApp')
    .directive('angularPdfMake', ['$sce', function ($sce) {
        return {
            templateUrl: 'app/angularPdfMake/angularPdfMake.html',
            restrict: 'EA',
            replace: true,
            scope: {
                content: '=',
                styles: '='
            },
            templateUrl: './angularPdfMake.html',
            link: function (scope, element, attrs) {
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
}());
