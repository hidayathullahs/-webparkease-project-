import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ProviderSettings() {
    return (
        <ScrollView className="flex-1 px-6 pt-24">
            <Text className="text-dark-900 font-bold text-xl mb-4">Lot Settings</Text>
            <View className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
                <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-50">
                    <Ionicons name="time-outline" size={24} color="#636E72" />
                    <Text className="ml-4 flex-1 font-bold text-dark-900">Operating Hours</Text>
                    <Ionicons name="chevron-forward" size={18} color="#B2BEC3" />
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-50">
                    <Ionicons name="cash-outline" size={24} color="#636E72" />
                    <Text className="ml-4 flex-1 font-bold text-dark-900">Pricing Rules</Text>
                    <Ionicons name="chevron-forward" size={18} color="#B2BEC3" />
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center p-4">
                    <Ionicons name="business-outline" size={24} color="#636E72" />
                    <Text className="ml-4 flex-1 font-bold text-dark-900">Business Profile</Text>
                    <Ionicons name="chevron-forward" size={18} color="#B2BEC3" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
