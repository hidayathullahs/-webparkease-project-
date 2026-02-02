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

interface Provider {
    id: string;
    name: string;
    ownerName: string;
    email: string;
    phone: string;
    location: string;
    address: string;
    slots: number;
    evChargers: number;
    pricePerHour: number;
    status: 'pending' | 'approved' | 'rejected' | 'suspended';
    appliedDate: string;
    documents: {
        businessLicense: boolean;
        taxId: boolean;
        propertyProof: boolean;
    };
    rating?: number;
    totalBookings?: number;
    revenue?: number;
}

export default function ProviderManagement() {
    const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
    const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Mock Dynamic state for providers
    const [providers, setProviders] = useState<Provider[]>([
        {
            id: '1',
            name: 'City Center Plaza',
            ownerName: 'Rajesh Kumar',
            email: 'rajesh@cityplaza.com',
            phone: '+91 98765 43210',
            location: 'Downtown District',
            address: '123 Main Street, Sector 15, New Delhi',
            slots: 150,
            evChargers: 10,
            pricePerHour: 50,
            status: 'pending',
            appliedDate: '2 hrs ago',
            documents: {
                businessLicense: true,
                taxId: true,
                propertyProof: true
            }
        },
        // ... more mock data
    ]);

    const filteredProviders = providers.filter(provider => {
        const matchesStatus = filterStatus === 'all' || provider.status === filterStatus;
        const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            provider.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            provider.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-green-50';
            case 'pending': return 'bg-yellow-50';
            case 'rejected': return 'bg-red-50';
            case 'suspended': return 'bg-orange-50';
            default: return 'bg-gray-50';
        }
    };

    const getStatusTextColor = (status: string) => {
        switch (status) {
            case 'approved': return 'text-green-600';
            case 'pending': return 'text-yellow-600';
            case 'rejected': return 'text-red-600';
            case 'suspended': return 'text-orange-600';
            default: return 'text-gray-600';
        }
    };

    const renderProviderCard = (provider: Provider, index: number) => (
        <Animated.View
            key={provider.id}
            entering={FadeInDown.delay(index * 100).springify()}
        >
            <TouchableOpacity
                onPress={() => {
                    setSelectedProvider(provider);
                    setShowDetailsModal(true);
                }}
                className="bg-white rounded-2xl p-4 mb-3 shadow-sm shadow-gray-200 border border-gray-100"
            >
                <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1">
                        <Text className="text-dark-900 font-bold text-base">{provider.name}</Text>
                        <Text className="text-gray-500 text-sm mt-1">{provider.ownerName}</Text>
                        <View className="flex-row items-center gap-1 mt-1">
                            <Ionicons name="location" size={12} color="#636E72" />
                            <Text className="text-gray-400 text-xs">{provider.location}</Text>
                        </View>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${getStatusColor(provider.status)}`}>
                        <Text className={`text-[10px] font-bold uppercase ${getStatusTextColor(provider.status)}`}>
                            {provider.status}
                        </Text>
                    </View>
                </View>

                <View className="flex-row gap-2 mb-3">
                    <View className="bg-indigo-50 px-2 py-1 rounded-lg flex-row items-center">
                        <Ionicons name="car" size={12} color="#6C5CE7" />
                        <Text className="text-indigo-600 text-[10px] font-bold ml-1">{provider.slots} slots</Text>
                    </View>
                    <View className="bg-blue-50 px-2 py-1 rounded-lg">
                        <Text className="text-blue-600 text-[10px] font-bold">₹{provider.pricePerHour}/hr</Text>
                    </View>
                </View>

                <Text className="text-gray-300 text-[10px] mt-2">{provider.appliedDate}</Text>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <View className="flex-1">
            {/* Stats Overview */}
            <View className="flex-row gap-3 mb-4">
                <View className="flex-1 bg-yellow-50 rounded-xl p-3">
                    <Text className="text-yellow-600 text-2xl font-black">{providers.filter(d => d.status === 'pending').length}</Text>
                    <Text className="text-yellow-700 text-[10px] font-bold uppercase mt-1">Pending</Text>
                </View>
                <View className="flex-1 bg-green-50 rounded-xl p-3">
                    <Text className="text-green-600 text-2xl font-black">{providers.filter(d => d.status === 'approved').length}</Text>
                    <Text className="text-green-700 text-[10px] font-bold uppercase mt-1">Approved</Text>
                </View>
            </View>

            {/* Search Bar */}
            <View className="bg-white rounded-2xl px-4 py-3 flex-row items-center mb-4 border border-gray-200">
                <Ionicons name="search" size={20} color="#636E72" />
                <TextInput
                    placeholder="Search providers..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    className="flex-1 ml-2 text-dark-900 outline-none"
                    placeholderTextColor="#B2BEC3"
                />
            </View>

            {/* Filter Tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2 mb-4 h-10">
                {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
                    <TouchableOpacity
                        key={status}
                        onPress={() => setFilterStatus(status)}
                        className={`px-4 py-2 rounded-xl mb-2 ${filterStatus === status ? 'bg-slate-600' : 'bg-white border border-gray-200'}`}
                    >
                        <Text className={`text-xs font-bold uppercase ${filterStatus === status ? 'text-white' : 'text-gray-500'}`}>
                            {status}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {filteredProviders.map((provider, index) => renderProviderCard(provider, index))}
            </ScrollView>

            <Modal
                visible={showDetailsModal}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setShowDetailsModal(false)}
            >
                {selectedProvider && (
                    <View className="flex-1 bg-gray-50">
                        <View className="bg-slate-600 px-6 pt-16 pb-6">
                            <View className="flex-row justify-between items-center">
                                <View className="flex-1">
                                    <Text className="text-white text-2xl font-black">{selectedProvider.name}</Text>
                                    <Text className="text-gray-300 text-sm mt-1">{selectedProvider.ownerName}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => setShowDetailsModal(false)}
                                    className="w-10 h-10 bg-white/20 rounded-full justify-center items-center"
                                >
                                    <Ionicons name="close" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView className="flex-1 px-6 pt-6">
                            <View className="bg-white rounded-2xl p-5 mb-4 border border-gray-100">
                                <Text className="text-dark-900 font-bold text-lg mb-4">Contact Information</Text>
                                <View className="gap-3">
                                    <View className="flex-row items-center">
                                        <Ionicons name="mail" size={20} color="#636E72" />
                                        <Text className="text-gray-600 text-sm ml-3">{selectedProvider.email}</Text>
                                    </View>
                                    <View className="flex-row items-center">
                                        <Ionicons name="call" size={20} color="#636E72" />
                                        <Text className="text-gray-600 text-sm ml-3">{selectedProvider.phone}</Text>
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
