import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Driver {
    id: string;
    name: string;
    email: string;
    phone: string;
    vehicleNumber: string;
    vehicleType: string;
    status: 'active' | 'inactive' | 'suspended';
    joinedDate: string;
    totalBookings: number;
    activeBooking?: {
        location: string;
        slot: string;
        timeRemaining: string;
        amount: number;
    };
    walletBalance: number;
    rating: number;
    lastActive: string;
}

export default function DriverManagement() {
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Mock Dynamic state for drivers (Simplified)
    const [drivers, setDrivers] = useState<Driver[]>([
        {
            id: '1',
            name: 'Arjun Mehta',
            email: 'arjun@example.com',
            phone: '+91 98765 43210',
            vehicleNumber: 'MH 02 AB 1234',
            vehicleType: 'Sedan',
            status: 'active',
            joinedDate: '15 Jan 2026',
            totalBookings: 124,
            walletBalance: 1250,
            rating: 4.8,
            lastActive: '5 mins ago'
        },
        // ... more mock data
    ]);

    const filteredDrivers = drivers.filter(driver => {
        const matchesStatus = filterStatus === 'all' || driver.status === filterStatus;
        const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            driver.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            driver.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-50';
            case 'inactive': return 'bg-gray-50';
            case 'suspended': return 'bg-red-50';
            default: return 'bg-gray-50';
        }
    };

    const getStatusTextColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-green-600';
            case 'inactive': return 'text-gray-600';
            case 'suspended': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    const renderDriverCard = (driver: Driver, index: number) => (
        <Animated.View
            key={driver.id}
            entering={FadeInDown.delay(index * 100).springify()}
        >
            <TouchableOpacity
                onPress={() => {
                    setSelectedDriver(driver);
                    setShowDetailsModal(true);
                }}
                className="bg-white rounded-2xl p-4 mb-3 shadow-sm shadow-gray-200 border border-gray-100"
            >
                <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1">
                        <View className="flex-row items-center gap-2">
                            <Text className="text-dark-900 font-bold text-base">{driver.name}</Text>
                            {driver.status === 'active' && (
                                <View className="w-2 h-2 bg-green-500 rounded-full" />
                            )}
                        </View>
                        <Text className="text-gray-500 text-sm mt-1">{driver.vehicleNumber}</Text>
                        <View className="flex-row items-center gap-1 mt-1">
                            <Ionicons name="car" size={12} color="#636E72" />
                            <Text className="text-gray-400 text-xs">{driver.vehicleType}</Text>
                        </View>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${getStatusColor(driver.status)}`}>
                        <Text className={`text-[10px] font-bold uppercase ${getStatusTextColor(driver.status)}`}>
                            {driver.status}
                        </Text>
                    </View>
                </View>

                {driver.activeBooking && (
                    <View className="bg-teal-50 rounded-xl p-3 mb-3 border border-teal-100">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="time" size={14} color="#00B894" />
                            <Text className="text-teal-700 text-xs font-bold ml-1 uppercase">Active Booking</Text>
                        </View>
                        <Text className="text-dark-900 text-sm font-bold">{driver.activeBooking.location}</Text>
                    </View>
                )}

                <View className="flex-row items-center justify-between border-t border-gray-100 pt-3">
                    <View className="flex-row items-center gap-3">
                        <View className="flex-row items-center">
                            <Ionicons name="star" size={14} color="#FDCB6E" />
                            <Text className="text-dark-900 text-sm font-bold ml-1">{driver.rating}</Text>
                        </View>
                        <Text className="text-gray-400 text-xs">{driver.totalBookings} trips</Text>
                    </View>
                    <Text className="text-teal-600 text-sm font-bold">₹{driver.walletBalance}</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <View className="flex-1">
            {/* Stats Overview */}
            <View className="flex-row gap-3 mb-4">
                <View className="flex-1 bg-green-50 rounded-xl p-3">
                    <Text className="text-green-600 text-2xl font-black">{drivers.filter(d => d.status === 'active').length}</Text>
                    <Text className="text-green-700 text-[10px] font-bold uppercase mt-1">Active</Text>
                </View>
                <View className="flex-1 bg-gray-50 rounded-xl p-3">
                    <Text className="text-gray-600 text-2xl font-black">{drivers.filter(d => d.status === 'inactive').length}</Text>
                    <Text className="text-gray-700 text-[10px] font-bold uppercase mt-1">Inactive</Text>
                </View>
            </View>

            {/* Search Bar */}
            <View className="bg-white rounded-2xl px-4 py-3 flex-row items-center mb-4 border border-gray-200">
                <Ionicons name="search" size={20} color="#636E72" />
                <TextInput
                    placeholder="Search drivers..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    className="flex-1 ml-2 text-dark-900 outline-none"
                    placeholderTextColor="#B2BEC3"
                />
            </View>

            {/* Filter Tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2 mb-4 h-10">
                {(['all', 'active', 'inactive', 'suspended'] as const).map((status) => (
                    <TouchableOpacity
                        key={status}
                        onPress={() => setFilterStatus(status)}
                        className={`px-4 py-2 rounded-xl mb-2 ${filterStatus === status ? 'bg-teal-600' : 'bg-white border border-gray-200'}`}
                    >
                        <Text className={`text-xs font-bold uppercase ${filterStatus === status ? 'text-white' : 'text-gray-500'}`}>
                            {status}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {filteredDrivers.map((driver, index) => renderDriverCard(driver, index))}
            </ScrollView>

            {/* Details Modal */}
            <Modal
                visible={showDetailsModal}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setShowDetailsModal(false)}
            >
                {selectedDriver && (
                    <View className="flex-1 bg-gray-50">
                        {/* Modal Header */}
                        <View className="bg-teal-600 px-6 pt-16 pb-6">
                            <View className="flex-row justify-between items-center">
                                <View className="flex-1">
                                    <Text className="text-white text-2xl font-black">{selectedDriver.name}</Text>
                                    <Text className="text-teal-100 text-sm mt-1">{selectedDriver.vehicleNumber}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => setShowDetailsModal(false)}
                                    className="w-10 h-10 bg-white/20 rounded-full justify-center items-center"
                                >
                                    <Ionicons name="close" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
                            <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm shadow-gray-200 border border-gray-100">
                                <Text className="text-dark-900 font-bold text-lg mb-4">Driver Details</Text>
                                <View className="gap-3">
                                    <View className="flex-row items-center">
                                        <Ionicons name="mail" size={20} color="#636E72" />
                                        <Text className="text-gray-600 text-sm ml-3">{selectedDriver.email}</Text>
                                    </View>
                                    <View className="flex-row items-center">
                                        <Ionicons name="call" size={20} color="#636E72" />
                                        <Text className="text-gray-600 text-sm ml-3">{selectedDriver.phone}</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                )}
            </Modal>
        </View>
    );
}
