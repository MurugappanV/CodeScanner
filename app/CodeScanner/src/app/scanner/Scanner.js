import React, { PureComponent } from "react";
import { View, Text, TouchableHighlight, ScrollView, Linking, Clipboard } from "react-native";
import { basicStyles, basicCompStyles } from "../../common/styles/styleSheet";
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class Scanner extends PureComponent {
    constructor() {
        super()
        this.onScanFinished = this.onScanFinished.bind(this);
        this.tryAnother = this.tryAnother.bind(this);
        this.copyToClipBoard = this.copyToClipBoard.bind(this);
        this.state = { code: null, copied: false };
    }

    onScanFinished = (data) => {
        this.setState({code : data});
        Linking.openURL(data.data).catch(err => {});
    }

    tryAnother = () => {
        this.setState({code : null, copied: false});
    }

    copyToClipBoard = () => {
        Clipboard.setString(this.state.code.data);
        this.setState({code : null, copied: true});
    }

    renderScanner = () => {
        return <View style={[basicStyles.deviceFullView, basicCompStyles.darkerBlueBG]}>
            <QRCodeScanner cameraStyle={basicStyles.deviceFullView} onRead={code => {this.onScanFinished(code)}}/>
            <View style={basicStyles.absoluteTopFullDeviceWidth}>
                <View style={basicStyles.innerView}>
                    <Text style={basicStyles.titleTextLight}>Welcome to Scanner</Text>
                    <Text style={[basicStyles.mediumTextLight, {paddingTop: 20, textAlign: 'center'}]}>Make sure the QRcode/Barcode is clearly visible to rear camera</Text>
                </View>
            </View> 
            <View style={basicStyles.absoluteBottomFullDeviceWidth}>
                <Text style={basicStyles.mediumTextLight}>Please wait, code will be automaticlly debucted</Text>
            </View> 
            
        </View>
    }

    renderItem = () => {
        if(this.state.code) {
            return <View style={[basicStyles.absoluteFullDeviceView, basicCompStyles.darkerBlueBG]}>
                <View style={basicStyles.fullSizeView}>
                    <View style={[basicCompStyles.padding10, basicCompStyles.flexColumnCC, {borderBottomWidth : 1, borderBottomColor : "#bd9ff2"}]}>
                        <Text style={basicStyles.headerBoldTextDark}>Scanned code</Text>
                    </View>
                    <View style={[basicCompStyles.padding10, basicCompStyles.fullSize]}>
                        <ScrollView style={basicCompStyles.fullSize}>
                            <TouchableHighlight onPress={this.copyToClipBoard}>
                                <Text style={basicStyles.mediumTextDark}>{this.state.code.data}</Text>
                            </TouchableHighlight>
                        </ScrollView>
                        {this.renderCopied()}
                    </View>
                    <TouchableHighlight style={basicStyles.curvedView} onPress={this.tryAnother}>
                        <Text style={basicStyles.mediumTextLight}>Try another</Text>
                    </TouchableHighlight>
                </View>
            </View>
        } else {
            return this.renderScanner();
        }
    }

    renderCopied = () => {
        if(this.state.copied) {
            <Text style={[basicStyles.smallTextRed, {padding: 5}]}>Copied to Clipboard!</Text>
        }
    }

    render() {
        return this.renderItem();
    }
}