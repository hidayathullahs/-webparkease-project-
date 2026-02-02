import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SystemSettings() {
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [emailAlerts, setEmailAlerts] = useState(true);

    return (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <Text className="text-2xl font-bold text-dark-900 mb-6">System Settings</Text>

            <View className="gap-6">
                {/* General Settings */}
                <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <Text className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-50">General Configuration</Text>

                    <View className="flex-row items-center justify-between py-3">
                        <View>
                            <Text className="font-bold text-gray-700">Maintenance Mode</Text>
                            <Text className="text-xs text-gray-400">Suspend all operations for maintenance</Text>
                        </View>
                        <Switch
                            value={maintenanceMode}
                            onValueChange={setMaintenanceMode}
                            trackColor={{ false: '#e2e8f0', true: '#ef4444' }}
                            thumbColor={maintenanceMode ? '#fff' : '#fff'}
                        />
                    </View>
                </View>

                {/* Notifications */}
                <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <Text className="text-base font-bold text-gray-800 mb-4 pb-2 border-b border-gray-50">Notifications</Text>

                    <View className="flex-row items-center justify-between py-3">
                        <View>
                            <Text className="font-bold text-gray-700">Email Alerts</Text>
                            <Text className="text-xs text-gray-400">Receive emails for critical system events</Text>
                        </View>
                        <Switch
                            value={emailAlerts}
                            onValueChange={setEmailAlerts}
                            trackColor={{ false: '#e2e8f0', true: '#0d9488' }}
                            thumbColor={'#fff'}
                        />
                    </View>
                </View>

                {/* Danger Zone */}
                <View className="bg-white rounded-2xl p-6 shadow-sm border border-red-100">
                    <Text className="text-base font-bold text-red-600 mb-4 pb-2 border-b border-red-50">Danger Zone</Text>

                    <TouchableOpacity className="border border-red-200 rounded-xl p-4 items-center">
                        <Text className="font-bold text-red-500">Reset System Database</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
