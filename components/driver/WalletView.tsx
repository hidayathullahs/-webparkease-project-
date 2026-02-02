import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export default function WalletView() {
    const transactions = [
        { id: 1, type: 'Top-up', date: 'Oct 11, 2023', amount: 500 },
        { id: 2, type: 'Top-up', date: 'Oct 12, 2023', amount: 500 },
        { id: 3, type: 'Top-up', date: 'Oct 13, 2023', amount: 500 },
    ];

    return (
        <View className="flex-1 px-6 pt-6">
            <Text className="text-dark-900 font-bold text-xl mb-4">Wallet Transactions</Text>
            <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                {transactions.map((tx) => (
                    <View key={tx.id} className="flex-row justify-between items-center py-4 border-b border-gray-50">
                        <View className="flex-row items-center">
                            <View className="w-10 h-10 bg-teal-50 rounded-full justify-center items-center mr-3">
                                <Ionicons name="arrow-up" size={20} color="#00B894" />
                            </View>
                            <View>
                                <Text className="font-bold text-dark-900">Wallet {tx.type}</Text>
                                <Text className="text-gray-400 text-xs">{tx.date}</Text>
                            </View>
                        </View>
                        <Text className="text-teal-600 font-bold">+₹{tx.amount}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
