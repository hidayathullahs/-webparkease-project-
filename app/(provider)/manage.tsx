import React from 'react';
import { View } from 'react-native';
import BookingsManager from '../../components/provider/BookingsManager';

export default function ManageScreen() {
    return (
        <View className="flex-1 bg-gray-50 p-6">
            <BookingsManager />
        </View>
    );
}
