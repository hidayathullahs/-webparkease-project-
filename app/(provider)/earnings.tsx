import React from 'react';
import { View } from 'react-native';
import EarningsStats from '../../components/provider/EarningsStats';

export default function EarningsScreen() {
    return (
        <View className="flex-1 bg-gray-50 p-6">
            <EarningsStats />
        </View>
    );
}
