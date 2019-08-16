import { Dimensions } from 'react-native'

export const width = Dimensions.get('window').width
export const height = Dimensions.get('window').height
export const colors = {
    blue: '#5ac8fa',
    red: '#ff3b30',
    gray: '#c7c7cc',
    black: '#3a3a3c',
    lightGray: '#b8b8b8'
}
export const sizeOf = Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    console.log(size)
    return size;
}
