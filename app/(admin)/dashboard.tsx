import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import OverviewStats from '../../components/admin/OverviewStats';

export default function AdminDashboardScreen() {
    const router = useRouter();

    const renderHeader = () => (
        <LinearGradient
            colors={['#2D3436', '#636E72']} // Slate Gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="pt-16 pb-6 px-6 md:hidden"
        >
            <View className="flex-row justify-between items-center mb-6">
                <View>
                    <Text className="text-gray-300 font-bold text-lg uppercase tracking-widest">Administrator</Text>
                    <Text className="text-white text-3xl font-black">System Overview</Text>
                </View>
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white/10 rounded-full justify-center items-center backdrop-blur-md border border-white/10">
                    <Ionicons name="notifications-outline" size={22} color="white" />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );

    return (
        <View className="flex-1 bg-admin-bg">
            <StatusBar barStyle="light-content" />
            {renderHeader()}

            <View className={`flex-1 ${Platform.OS === 'web' ? 'p-6' : '-mt-4 bg-gray-50 rounded-t-[30px] px-6 pt-8'}`}>
                <OverviewStats />
            </View>
        </View>
    );
}
