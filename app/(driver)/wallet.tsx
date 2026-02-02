import WalletView from '@/components/driver/WalletView';
import React from 'react';
import { View } from 'react-native';

export default function WalletScreen() {
    return (
        <View className="flex-1 bg-driver-bg">
            <WalletView />
        </View>
    );
}
