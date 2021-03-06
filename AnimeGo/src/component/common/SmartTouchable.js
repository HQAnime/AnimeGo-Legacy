import React, { Component } from 'react';
import { TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native';

class SmartTouchable extends Component {
  render() {
    const { onPress, onLongPress, children, round } = this.props;
    if (Platform.OS == 'android' && Platform.Version > 19) {
      return (
        <TouchableNativeFeedback onPress={onPress} onLongPress={onLongPress} background={round ? TouchableNativeFeedback.SelectableBackgroundBorderless() : TouchableNativeFeedback.SelectableBackground()}>
          {children}
        </TouchableNativeFeedback>
      )
    } else {
      return (
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
          {children}
        </TouchableOpacity>
      )
    }
  }
}

export {SmartTouchable};