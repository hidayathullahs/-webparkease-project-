import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

const USERS = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Driver', status: 'active' },
    { id: '2', name: 'City Centre Mall', email: 'admin@citymall.com', role: 'Provider', status: 'active' },
    { id: '3', name: 'Jane Smith', email: 'jane@test.com', role: 'Driver', status: 'blocked' },
    { id: '4', name: 'Tech Park Co', email: 'contact@techpark.com', role: 'Provider', status: 'pending' },
    { id: '5', name: 'Robert Johnson', email: 'bob@driver.com', role: 'Driver', status: 'active' },
];

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
}

export default function UsersTable() {
    const renderUser = ({ item, index }: { item: User; index: number }) => (
        <View className={`flex-row items-center p-4 border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
            <View className="flex-[2] flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-full bg-gray-200 justify-center items-center">
                    <Text className="font-bold text-gray-500">{item.name.charAt(0)}</Text>
                </View>
                <View>
                    <Text className="font-bold text-gray-800">{item.name}</Text>
                    <Text className="text-xs text-gray-500 md:hidden">{item.email}</Text>
                </View>
            </View>
            <View className="flex-[2] hidden md:flex">
                <Text className="text-gray-600 font-medium">{item.email}</Text>
            </View>
            <View className="flex-[1]">
                <View className={`px-2 py-1 rounded-md self-start ${item.role === 'Provider' ? 'bg-indigo-50' : 'bg-teal-50'}`}>
                    <Text className={`text-[10px] font-bold uppercase ${item.role === 'Provider' ? 'text-indigo-600' : 'text-teal-600'}`}>
                        {item.role}
                    </Text>
                </View>
            </View>
            <View className="flex-[1] items-end md:items-start">
                <View className={`px-2 py-1 rounded-full flex-row items-center gap-1 ${item.status === 'active' ? 'bg-green-100' :
                    item.status === 'blocked' ? 'bg-red-100' : 'bg-orange-100'
                    }`}>
                    <View className={`w-1.5 h-1.5 rounded-full ${item.status === 'active' ? 'bg-green-500' :
                        item.status === 'blocked' ? 'bg-red-500' : 'bg-orange-500'
                        }`} />
                    <Text className={`text-[10px] font-bold capitalize ${item.status === 'active' ? 'text-green-700' :
                        item.status === 'blocked' ? 'text-red-700' : 'text-orange-700'
                        }`}>
                        {item.status}
                    </Text>
                </View>
            </View>
            <View className="flex-[0.5] items-end">
                <TouchableOpacity>
                    <Ionicons name="ellipsis-horizontal" size={16} color="#94a3b8" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Table Header */}
            <View className="flex-row items-center bg-gray-50 p-4 border-b border-gray-200">
                <Text className="flex-[2] text-xs font-bold text-gray-400 uppercase tracking-wider">User</Text>
                <Text className="flex-[2] text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:flex">Email</Text>
                <Text className="flex-[1] text-xs font-bold text-gray-400 uppercase tracking-wider">Role</Text>
                <Text className="flex-[1] text-xs font-bold text-gray-400 uppercase tracking-wider text-right md:text-left">Status</Text>
                <Text className="flex-[0.5]"></Text>
            </View>

            <FlatList
                data={USERS}
                renderItem={renderUser}
                keyExtractor={item => item.id}
            />
        </View>
    );
}
