import { Alert } from 'react-native';

export function showAlert(title, msg, _callback=null, comp=null){
    Alert.alert(
          title,
          msg,
        [
            { text: "OK", onPress: () => callme(_callback,comp) }
        ],
        { cancelable: false }
    );
}

export function showTwoButtonAlert(title, msg, _callback=null, _callback2=null, comp=null){
    Alert.alert(
          title,
          msg,
        [
            { text: "Yes", onPress: () => callme(_callback,comp) },
            { text: "No", onPress: () => callme(_callback2,comp) }
        ],
        { cancelable: false }
    );
}

function callme(_callback,comp) {
    if(comp == null){
        return
    }else{
        _callback(comp)
    }
}