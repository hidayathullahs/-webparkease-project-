import React, { useState } from 'react';
import { FlatList, Platform, Switch, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export interface ParkingSlot {
    id: string;
    code: string;
    isOccupied: boolean;
    earnings: number;
    hours: number;
}

export const MOCK_PROVIDER_SLOTS: ParkingSlot[] = [
    { id: '1', code: 'A-01', isOccupied: true, earnings: 150, hours: 3 },
    { id: '2', code: 'A-02', isOccupied: false, earnings: 450, hours: 9 },
    { id: '3', code: 'B-01', isOccupied: true, earnings: 120, hours: 2.5 },
    { id: '4', code: 'B-02', isOccupied: false, earnings: 0, hours: 0 },
    { id: '5', code: 'C-01', isOccupied: false, earnings: 0, hours: 0 },
    { id: '6', code: 'C-02', isOccupied: true, earnings: 300, hours: 6 },
];

export default function SlotsManager() {
    const [isOnline, setIsOnline] = useState(true);

    const renderSlotItem = ({ item, index }: { item: ParkingSlot; index: number }) => (
        <Animated.View
            entering={FadeInDown.delay(index * 100).springify()}
            style={{ flex: 1, margin: 8, minWidth: 160 }}
        >
            <View className={`bg-white rounded-2xl p-4 shadow-sm shadow-gray-200 border border-gray-50 h-full`}>
                <View className="flex-row justify-between items-center mb-4">
                    <View className={`w-10 h-10 rounded-xl justify-center items-center ${item.isOccupied ? 'bg-red-50' : 'bg-green-50'}`}>
                        <Text className={`font-black text-sm ${item.isOccupied ? 'text-red-500' : 'text-green-500'}`}>{item.code}</Text>
                    </View>
                    <View className={`w-2 h-2 rounded-full ${item.isOccupied ? 'bg-red-500' : 'bg-green-500'}`} />
                </View>

                <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wide mb-1">{item.isOccupied ? 'Occupied' : 'Vacant'}</Text>
                {item.isOccupied ? (
                    <View>
                        <Text className="text-dark-900 font-bold text-lg">₹ {item.earnings}</Text>
                        <Text className="text-xs text-indigo-500 font-bold">{item.hours} hrs active</Text>
                    </View>
                ) : (
                    <Text className="text-gray-300 font-bold text-lg">---</Text>
                )}
            </View>
        </Animated.View>
    );

    return (
        <View className="flex-1">
            <View className="flex-row justify-between items-center mb-6 px-2">
                <Text className="text-dark-900 font-bold text-lg">Slot Status</Text>
                <View className="flex-row items-center bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                    <Text className="text-xs font-bold text-gray-500 mr-2 uppercase">{isOnline ? 'Online' : 'Offline'}</Text>
                    <Switch
                        value={isOnline}
                        onValueChange={setIsOnline}
                        trackColor={{ false: '#fab1a0', true: '#a29bfe' }}
                        thumbColor={isOnline ? '#6C5CE7' : '#f1f2f6'}
                        style={Platform.OS === 'web' ? { transform: 'scale(0.8)' } as any : { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                    />
                </View>
            </View>

            <FlatList
                data={MOCK_PROVIDER_SLOTS}
                renderItem={renderSlotItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                // Responsive grid
                numColumns={Platform.OS === 'web' && window.innerWidth > 1024 ? 4 : Platform.OS === 'web' && window.innerWidth > 768 ? 3 : 2}
                key={Platform.OS === 'web' && window.innerWidth > 1024 ? 'grid-4' : Platform.OS === 'web' && window.innerWidth > 768 ? 'grid-3' : 'grid-2'}
            />
        </View>
    );
}
