import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
    user: {
        name: string;
        email: string;
    };
}

export default function ProfileView({ user }: Props) {
    return (
        <View className="flex-1 px-6 pt-6">
            <View className="items-center mb-8">
                <View className="w-24 h-24 bg-teal-100 rounded-full justify-center items-center mb-4">
                    <Ionicons name="person" size={48} color="#00B894" />
                </View>
                <Text className="text-2xl font-bold text-dark-900">{user.name}</Text>
                <Text className="text-gray-500 font-medium">{user.email}</Text>
            </View>
            <View className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
                <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-50">
                    <View className="w-10 h-10 bg-gray-50 rounded-xl justify-center items-center mr-4">
                        <Ionicons name="car-outline" size={22} color="#636E72" />
                    </View>
                    <Text className="flex-1 font-bold text-dark-900">Vehicle Details</Text>
                    <Ionicons name="chevron-forward" size={18} color="#B2BEC3" />
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-50">
                    <View className="w-10 h-10 bg-gray-50 rounded-xl justify-center items-center mr-4">
                        <Ionicons name="notifications-outline" size={22} color="#636E72" />
                    </View>
                    <Text className="flex-1 font-bold text-dark-900">Notification Settings</Text>
                    <Ionicons name="chevron-forward" size={18} color="#B2BEC3" />
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center p-4">
                    <View className="w-10 h-10 bg-gray-50 rounded-xl justify-center items-center mr-4">
                        <Ionicons name="shield-checkmark-outline" size={22} color="#636E72" />
                    </View>
                    <Text className="flex-1 font-bold text-dark-900">Privacy & Security</Text>
                    <Ionicons name="chevron-forward" size={18} color="#B2BEC3" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
