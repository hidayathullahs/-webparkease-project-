import React from 'react';
import { View } from 'react-native';
import BookingsList from '../../components/driver/BookingsList';

export default function BookingsScreen() {
    return (
        <View className="flex-1 bg-gray-50 p-6">
            <BookingsList />
        </View>
    );
}
