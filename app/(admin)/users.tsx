import React from 'react';
import { Text, View } from 'react-native';
import UsersTable from '../../components/admin/UsersTable';

export default function UsersScreen() {
    return (
        <View className="flex-1 bg-gray-50 p-6">
            <View className="mb-6">
                <Text className="text-2xl font-bold text-gray-900">User Management</Text>
                <Text className="text-gray-500">Manage drivers, providers, and administrators</Text>
            </View>
            <UsersTable />
        </View>
    );
}
