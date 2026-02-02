import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function BookingsManager() {
    return (
        <View className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <View className="items-center justify-center py-12">
                <View className="w-20 h-20 bg-indigo-50 rounded-full justify-center items-center mb-6">
                    <Ionicons name="calendar" size={32} color="#6C5CE7" />
                </View>
                <Text className="text-2xl font-bold text-gray-900 mb-2">Booking Management</Text>
                <Text className="text-gray-500 text-center max-w-sm mb-8">
                    View upcoming bookings, manage check-ins, and handle cancellations from here.
                </Text>

                <TouchableOpacity className="bg-indigo-600 px-8 py-3 rounded-xl shadow-lg shadow-indigo-200">
                    <Text className="text-white font-bold">View Calendar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
