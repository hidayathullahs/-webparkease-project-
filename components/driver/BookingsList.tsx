import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Platform, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Booking {
    id: string;
    slotName: string;
    location: string;
    date: string;
    time: string;
    price: number;
    status: 'active' | 'completed' | 'cancelled';
}

const MOCK_BOOKINGS: Booking[] = [
    { id: '1', slotName: 'City Center Hub', location: 'Downtown, Block A', date: 'Today', time: '14:00 - 16:00', price: 100, status: 'active' },
    { id: '2', slotName: 'Grand Mall Plaza', location: 'Shopping District', date: 'Yesterday', time: '10:00 - 12:00', price: 80, status: 'completed' },
    { id: '3', slotName: 'Seaside Parking', location: 'Coastal Road', date: '21 Jan', time: '09:00 - 18:00', price: 540, status: 'completed' },
    { id: '4', slotName: 'Airport Premium', location: 'Terminal 3', date: '15 Jan', time: '05:00 - 06:00', price: 100, status: 'cancelled' },
];

export default function BookingsList() {
    const renderBookingItem = ({ item, index }: { item: Booking; index: number }) => (
        <Animated.View entering={FadeInDown.delay(index * 100).springify()} style={{ flex: 1, margin: 8 }}>
            <View className="bg-white rounded-3xl p-5 shadow-sm shadow-gray-200 border border-gray-50 h-full">
                <View className="flex-row justify-between items-start mb-4">
                    <View>
                        <Text className="text-lg font-bold text-dark-900">{item.slotName}</Text>
                        <Text className="text-xs text-gray-500 font-medium mt-1">{item.location}</Text>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${item.status === 'active' ? 'bg-green-50' :
                            item.status === 'completed' ? 'bg-blue-50' : 'bg-red-50'
                        }`}>
                        <Text className={`text-[10px] font-bold uppercase ${item.status === 'active' ? 'text-green-600' :
                                item.status === 'completed' ? 'text-blue-600' : 'text-red-500'
                            }`}>
                            {item.status}
                        </Text>
                    </View>
                </View>

                <View className="space-y-3">
                    <View className="flex-row items-center gap-3">
                        <Ionicons name="calendar-outline" size={16} color="#64748b" />
                        <Text className="text-sm text-gray-600 font-medium">{item.date}</Text>
                    </View>
                    <View className="flex-row items-center gap-3">
                        <Ionicons name="time-outline" size={16} color="#64748b" />
                        <Text className="text-sm text-gray-600 font-medium">{item.time}</Text>
                    </View>
                </View>

                <View className="mt-4 pt-4 border-t border-gray-50 flex-row justify-between items-center">
                    <Text className="text-sm font-bold text-gray-500">Total Paid</Text>
                    <Text className="text-xl font-bold text-teal-600">₹{item.price}</Text>
                </View>
            </View>
        </Animated.View>
    );

    return (
        <View className="flex-1">
            <View className="flex-row justify-between items-center mb-6 px-2">
                <Text className="text-dark-900 font-bold text-xl">My Bookings</Text>
                <TouchableOpacity className="flex-row items-center bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                    <Ionicons name="calendar" size={16} color="#4b5563" />
                    <Text className="ml-2 text-xs font-bold text-gray-600 uppercase">This Month</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={MOCK_BOOKINGS}
                renderItem={renderBookingItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                numColumns={Platform.OS === 'web' && window.innerWidth > 768 ? 2 : 1}
                key={Platform.OS === 'web' && window.innerWidth > 768 ? 'grid' : 'list'}
                columnWrapperStyle={Platform.OS === 'web' && window.innerWidth > 768 ? { justifyContent: 'space-between' } : undefined}
            />
        </View>
    );
}
