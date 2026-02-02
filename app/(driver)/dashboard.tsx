import React from 'react';
import { View } from 'react-native';
import AvailableSlots from '../../components/driver/AvailableSlots';

export default function DriverDashboard() {
    return (
        <View className="flex-1 bg-driver-bg p-6">
            <AvailableSlots />
        </View>
    );
}
