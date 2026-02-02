import ProviderSettings from '@/components/provider/ProviderSettings';
import React from 'react';
import { View } from 'react-native';

export default function SettingsScreen() {
    return (
        <View className="flex-1 bg-provider-bg">
            <ProviderSettings />
        </View>
    );
}
