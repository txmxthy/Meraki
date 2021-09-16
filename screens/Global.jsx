import React from 'react';
import { Text, View } from 'react-native'

export default function Global(){
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Global!</Text>
        </View>
      );
}