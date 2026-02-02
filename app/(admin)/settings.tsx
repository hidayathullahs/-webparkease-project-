import React from 'react';
import { View } from 'react-native';
import SystemSettings from '../../components/admin/SystemSettings';

export default function SettingsScreen() {
    return (
        <View className="flex-1 bg-gray-50 p-6">
            <SystemSettings />
        </View>
    );
}
