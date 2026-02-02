import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function EarningsStats() {
    return (
        <View className="flex-1">
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-2xl font-bold text-gray-900">Earnings Report</Text>
                <View className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                    <Text className="text-sm font-bold text-gray-700">This Month</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="flex-row flex-wrap gap-4 mb-8">
                    {/* Total Revenue Card */}
                    <View className="bg-indigo-600 rounded-3xl p-6 flex-1 min-w-[300px] shadow-lg shadow-indigo-200">
                        <View className="flex-row justify-between items-start mb-4">
                            <View className="bg-white/20 p-3 rounded-2xl">
                                <Ionicons name="wallet" size={24} color="white" />
                            </View>
                            <Text className="text-indigo-200 text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">Total</Text>
                        </View>
                        <Text className="text-white/80 text-sm font-medium mb-1">Total Revenue</Text>
                        <Text className="text-white text-4xl font-black">₹ 14,500</Text>
                        <View className="flex-row items-center mt-4">
                            <Ionicons name="trending-up" size={16} color="#6fdcbf" />
                            <Text className="text-teal-300 ml-2 font-bold">+15% from last month</Text>
                        </View>
                    </View>

                    {/* Today's Revenue Card */}
                    <View className="bg-white rounded-3xl p-6 flex-1 min-w-[300px] shadow-sm border border-gray-100">
                        <View className="flex-row justify-between items-start mb-4">
                            <View className="bg-indigo-50 p-3 rounded-2xl">
                                <Ionicons name="today" size={24} color="#6C5CE7" />
                            </View>
                            <Text className="text-indigo-600 text-xs font-bold uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">Today</Text>
                        </View>
                        <Text className="text-gray-400 text-sm font-medium mb-1">Today's Revenue</Text>
                        <Text className="text-gray-900 text-4xl font-black">₹ 2,400</Text>
                        <View className="flex-row items-center mt-4">
                            <Ionicons name="time-outline" size={16} color="#b2bec3" />
                            <Text className="text-gray-400 ml-2 font-bold">Updated 5 min ago</Text>
                        </View>
                    </View>
                </View>

                <Text className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</Text>
                <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-20">
                    {[1, 2, 3, 4].map((i) => (
                        <View key={i} className="flex-row items-center justify-between py-4 border-b border-gray-50 last:border-b-0">
                            <View className="flex-row items-center">
                                <View className="w-12 h-12 rounded-2xl bg-gray-50 justify-center items-center">
                                    <Ionicons name="car" size={20} color="#64748b" />
                                </View>
                                <View className="ml-4">
                                    <Text className="font-bold text-gray-800 text-base">Parking Fee - Slot A-{i}</Text>
                                    <Text className="text-xs text-gray-400 font-medium">Today, {10 + i}:00 AM • 2 hrs</Text>
                                </View>
                            </View>
                            <Text className="font-black text-base text-gray-900">+ ₹120</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
