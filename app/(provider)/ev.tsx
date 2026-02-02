import EVManager from '@/components/provider/EVManager';
import React from 'react';
import { View } from 'react-native';

export default function EVScreen() {
    return (
        <View className="flex-1 bg-provider-bg">
            <EVManager />
        </View>
    );
}
