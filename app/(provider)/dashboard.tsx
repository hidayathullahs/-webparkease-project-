import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';
import SlotsManager from '../../components/provider/SlotsManager';

export default function ProviderDashboard() {
    const renderHeader = () => (
        <LinearGradient
            colors={['#6C5CE7', '#a29bfe']} // Indigo Gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="pt-16 pb-12 px-6 rounded-b-[40px] shadow-xl shadow-indigo-200 md:rounded-3xl md:mx-6 md:mt-6 md:pt-12 md:pb-12"
        >
            <View className="flex-row justify-between items-start mb-8">
                <View>
                    <Text className="text-indigo-100 font-bold tracking-widest text-[10px] uppercase mb-1">Provider Console</Text>
                    <Text className="text-white text-3xl font-black">My Parking Lot</Text>
                </View>
            </View>

            <View className="bg-white rounded-3xl p-6 shadow-lg shadow-indigo-100 flex-row justify-between items-center -mb-20 border border-gray-50 mx-auto w-full md:-mb-16">
                <View className="flex-1 border-r border-gray-100 pr-4">
                    <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">Total Revenue</Text>
                    <Text className="text-3xl font-black text-dark-900">₹ 4,500</Text>
                    <View className="flex-row items-center mt-1">
                        <Ionicons name="trending-up" size={14} color="#00B894" />
                        <Text className="text-teal-500 text-xs font-bold ml-1">+12% this week</Text>
                    </View>
                </View>
                <View className="pl-4 items-center">
                    <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">Occupancy</Text>
                    <View className="w-16 h-16 rounded-full border-4 border-indigo-100 justify-center items-center">
                        <Text className="text-indigo-600 font-black text-lg">75%</Text>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );

    return (
        <View className="flex-1 bg-provider-bg">
            {renderHeader()}
            <View className="flex-1 px-6 pt-24 pb-6 md:pt-20">
                <SlotsManager />
            </View>
        </View>
    );
}
