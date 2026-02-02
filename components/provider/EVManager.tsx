import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function EVManager() {
    return (
        <View className="flex-1 px-6 pt-24 items-center justify-center">
            <Ionicons name="flash-outline" size={64} color="#6C5CE7" />
            <Text className="text-xl font-bold text-dark-900 mt-4">EV Management</Text>
            <Text className="text-gray-500 text-center mt-2 px-10">Monitor and manage your EV charging stations here.</Text>
            <TouchableOpacity className="mt-6 bg-indigo-600 px-8 py-3 rounded-2xl">
                <Text className="text-white font-bold">Add New Charger</Text>
            </TouchableOpacity>
        </View>
    );
}
