define([], function() {
'use strict';
function getPropertyArray(arr, property) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== null && arr[i] !== undefined) {
            result.push(arr[i][property]);
        } else {
            result.push(null);
        }
    }
    console.log(result);
    return result;
}
return getPropertyArray;
});
