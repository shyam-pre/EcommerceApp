import {widthPercentageToDP as _wp , heightPercentageToDP as _hp} from 'react-native-responsive-screen'

// width  and height percentage helper
export const wp = (num) => {
    return _wp(`${num}%`)
};

export const hp = (num) => {
    return _hp(`${num}%`)
};
