import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export interface ParkingSlot {
    id: string;
    name: string;
    location: string;
    price: number;
    available: boolean;
    distance: string;
    rating: number;
}

export const MOCK_SLOTS: ParkingSlot[] = [
    { id: '1', name: 'City Center Hub', location: 'Downtown, Block A', price: 50, available: true, distance: '0.5 km', rating: 4.8 },
    { id: '2', name: 'Grand Mall Plaza', location: 'Shopping District', price: 40, available: true, distance: '1.2 km', rating: 4.5 },
    { id: '3', name: 'Airport Premium', location: 'Terminal 3', price: 100, available: false, distance: '5.0 km', rating: 4.9 },
    { id: '4', name: 'Seaside Parking', location: 'Coastal Road', price: 60, available: true, distance: '3.5 km', rating: 4.2 },
    { id: '5', name: 'Tech Park Zone', location: 'IT Corridor', price: 45, available: true, distance: '2.1 km', rating: 4.6 },
    { id: '6', name: 'Metro Station Lot', location: 'Station Road', price: 30, available: true, distance: '0.8 km', rating: 4.3 },
];

export default function AvailableSlots() {
    const handleBook = (slot: ParkingSlot) => {
        if (!slot.available) return;
        if (Platform.OS === 'web') {
            window.alert(`Booking confirmed: ${slot.name}`);
        } else {
            Alert.alert('Booking confirmed', `You booked ${slot.name}`);
        }
    };

    const renderSlotItem = ({ item, index }: { item: ParkingSlot; index: number }) => (
        <Animated.View entering={FadeInDown.delay(index * 100).springify()} style={{ flex: 1, margin: 8 }}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => item.available && handleBook(item)}
                className={`bg-white rounded-3xl p-5 shadow-sm shadow-gray-200 border border-gray-50 ${!item.available ? 'opacity-60' : ''} h-full`}
            >
                <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1 mr-2">
                        <Text className="text-lg font-bold text-dark-900" numberOfLines={1}>{item.name}</Text>
                        <View className="flex-row items-center gap-1 mt-1">
                            <Ionicons name="location" size={12} color="#636E72" />
                            <Text className="text-xs text-gray-500 font-medium" numberOfLines={1}>{item.location}</Text>
                        </View>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${item.available ? 'bg-teal-50' : 'bg-red-50'}`}>
                        <Text className={`text-[10px] font-bold uppercase ${item.available ? 'text-teal-600' : 'text-red-500'}`}>
                            {item.available ? '● Available' : '● Full'}
                        </Text>
                    </View>
                </View>

                <View className="flex-row items-center justify-between mt-auto pt-3 border-t border-gray-50">
                    <View className="flex-row items-center gap-2">
                        <View className="flex-row items-center bg-gray-50 px-2 py-1 rounded-lg">
                            <Ionicons name="time-outline" size={14} color="#636E72" />
                            <Text className="text-xs text-gray-600 ml-1 font-medium">{item.distance}</Text>
                        </View>
                        <View className="flex-row items-center bg-yellow-50 px-2 py-1 rounded-lg">
                            <Ionicons name="star" size={14} color="#FDCB6E" />
                            <Text className="text-xs text-yellow-700 ml-1 font-bold">{item.rating}</Text>
                        </View>
                    </View>
                    <Text className="text-xl font-bold text-teal-600">₹{item.price}<Text className="text-xs text-gray-400 font-normal">/hr</Text></Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <View className="flex-1">
            <View className="flex-row justify-between items-center mb-6 px-2">
                <Text className="text-dark-900 font-bold text-xl">Nearby Spots</Text>
                <TouchableOpacity className="flex-row items-center bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                    <Ionicons name="filter" size={16} color="#4b5563" />
                    <Text className="ml-2 text-xs font-bold text-gray-600 uppercase">Filter</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={MOCK_SLOTS}
                renderItem={renderSlotItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                // Web specific props for grid layout
                numColumns={Platform.OS === 'web' && window.innerWidth > 768 ? 2 : 1}
                key={Platform.OS === 'web' && window.innerWidth > 768 ? 'grid' : 'list'}
                columnWrapperStyle={Platform.OS === 'web' && window.innerWidth > 768 ? { justifyContent: 'space-between' } : undefined}
            />
        </View>
    );
}

// Helper for Platform check since we didn't import Platform
import { Platform } from 'react-native';
