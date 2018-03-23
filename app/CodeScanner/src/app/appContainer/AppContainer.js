import React, { PureComponent } from "react";
import { StatusBar, View } from "react-native";
import { basicStyles } from "../../common/styles/styleSheet";
import Scanner from "../scanner";

export default class AppContainer extends PureComponent {
    render() {
        Scanner
        return <View style = { basicStyles.deviceFullView } >
            <StatusBar 
                backgroundColor = "rgba(0, 0, 0, 0.2)" 
                barStyle = "light-content"
                translucent = { true }
            /> 
            <Scanner/>
        </View>        
    }
}