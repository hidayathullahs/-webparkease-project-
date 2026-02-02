import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Dispute {
    id: string;
    title: string;
    type: 'refund' | 'complaint' | 'technical' | 'payment';
    status: 'open' | 'in_progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    reportedBy: {
        name: string;
        type: 'driver' | 'provider';
        id: string;
    };
    description: string;
    amount?: number;
    location?: string;
    reportedDate: string;
    lastUpdated: string;
    assignedTo?: string;
    resolution?: string;
}

export default function DisputeManagement() {
    const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
    const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'in_progress' | 'resolved'>('all');
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [resolutionNote, setResolutionNote] = useState('');

    // Mock dispute data
    const disputes: Dispute[] = [
        {
            id: 'D001',
            title: 'Refund Request - Incorrect Charge',
            type: 'refund',
            status: 'open',
            priority: 'high',
            reportedBy: {
                name: 'Arjun Mehta',
                type: 'driver',
                id: 'DR8472'
            },
            description: 'I was charged ₹150 for 2 hours of parking, but I only parked for 1 hour. The parking provider did not update the exit time correctly.',
            amount: 75,
            location: 'City Center Plaza',
            reportedDate: '10 mins ago',
            lastUpdated: '10 mins ago'
        },
        // ... (other disputes would go here, simplified for brevity)
    ];

    const filteredDisputes = disputes.filter(dispute => {
        return filterStatus === 'all' || dispute.status === filterStatus;
    });

    const handleResolve = (dispute: Dispute) => {
        if (!resolutionNote.trim()) {
            if (Platform.OS === 'web') window.alert('Please enter a resolution note');
            else Alert.alert('Error', 'Please enter a resolution note');
            return;
        }

        const resolveAction = () => {
            console.log('Resolved:', dispute.id, 'Note:', resolutionNote);
            if (Platform.OS === 'web') window.alert('Dispute has been marked as resolved');
            else Alert.alert('Success', 'Dispute has been marked as resolved');
            setResolutionNote('');
            setShowDetailsModal(false);
        };

        if (Platform.OS === 'web') {
            if (window.confirm(`Mark dispute ${dispute.id} as resolved?`)) resolveAction();
        } else {
            Alert.alert(
                'Resolve Dispute',
                `Mark dispute ${dispute.id} as resolved?`,
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Resolve', onPress: resolveAction }
                ]
            );
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open': return 'bg-blue-50';
            case 'in_progress': return 'bg-yellow-50';
            case 'resolved': return 'bg-green-50';
            case 'closed': return 'bg-gray-50';
            default: return 'bg-gray-50';
        }
    };

    const getStatusTextColor = (status: string) => {
        switch (status) {
            case 'open': return 'text-blue-600';
            case 'in_progress': return 'text-yellow-600';
            case 'resolved': return 'text-green-600';
            case 'closed': return 'text-gray-600';
            default: return 'text-gray-600';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'bg-red-500';
            case 'high': return 'bg-orange-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-gray-400';
            default: return 'bg-gray-400';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'refund': return 'cash-outline';
            case 'complaint': return 'warning-outline';
            case 'technical': return 'bug-outline';
            case 'payment': return 'card-outline';
            default: return 'help-outline';
        }
    };

    const renderDisputeCard = (dispute: Dispute, index: number) => (
        <Animated.View
            key={dispute.id}
            entering={FadeInDown.delay(index * 100).springify()}
        >
            <TouchableOpacity
                onPress={() => {
                    setSelectedDispute(dispute);
                    setShowDetailsModal(true);
                }}
                className="bg-white rounded-2xl p-4 mb-3 shadow-sm shadow-gray-200 border border-gray-100"
            >
                <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1">
                        <View className="flex-row items-center gap-2 mb-2">
                            <View className={`w-1.5 h-6 rounded-full ${getPriorityColor(dispute.priority)}`} />
                            <View>
                                <Text className="text-dark-900 font-bold text-base">{dispute.title}</Text>
                                <Text className="text-gray-400 text-xs mt-0.5">#{dispute.id}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="flex-row gap-2 mb-3">
                    <View className={`px-3 py-1 rounded-full ${getStatusColor(dispute.status)}`}>
                        <Text className={`text-[10px] font-bold uppercase ${getStatusTextColor(dispute.status)}`}>
                            {dispute.status.replace('_', ' ')}
                        </Text>
                    </View>
                    <View className="bg-gray-50 px-3 py-1 rounded-full flex-row items-center">
                        <Ionicons name={getTypeIcon(dispute.type) as any} size={12} color="#636E72" />
                        <Text className="text-gray-600 text-[10px] font-bold uppercase ml-1">{dispute.type}</Text>
                    </View>
                </View>

                <View className="mb-3">
                    <Text className="text-gray-600 text-sm" numberOfLines={2}>
                        {dispute.description}
                    </Text>
                </View>

                <View className="flex-row items-center justify-between border-t border-gray-100 pt-3">
                    <View>
                        <Text className="text-gray-400 text-[10px] font-bold uppercase">Reported By</Text>
                        <Text className="text-dark-900 text-xs font-bold mt-0.5">{dispute.reportedBy.name}</Text>
                        <Text className="text-gray-400 text-[10px]">{dispute.reportedBy.type.toUpperCase()} • ID: {dispute.reportedBy.id}</Text>
                    </View>
                    {dispute.amount && (
                        <View className="bg-red-50 px-3 py-1.5 rounded-xl">
                            <Text className="text-red-600 text-sm font-bold">₹{dispute.amount}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <View className="flex-1">
            {/* Stats Overview */}
            <View className="flex-row gap-3 mb-4">
                <View className="flex-1 bg-blue-50 rounded-xl p-3">
                    <Text className="text-blue-600 text-2xl font-black">{disputes.filter(d => d.status === 'open').length}</Text>
                    <Text className="text-blue-700 text-[10px] font-bold uppercase mt-1">Open</Text>
                </View>
                <View className="flex-1 bg-yellow-50 rounded-xl p-3">
                    <Text className="text-yellow-600 text-2xl font-black">{disputes.filter(d => d.status === 'in_progress').length}</Text>
                    <Text className="text-yellow-700 text-[10px] font-bold uppercase mt-1">In Progress</Text>
                </View>
                <View className="flex-1 bg-green-50 rounded-xl p-3">
                    <Text className="text-green-600 text-2xl font-black">{disputes.filter(d => d.status === 'resolved').length}</Text>
                    <Text className="text-green-700 text-[10px] font-bold uppercase mt-1">Resolved</Text>
                </View>
            </View>

            {/* Filter Tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2 mb-4 h-10">
                {(['all', 'open', 'in_progress', 'resolved'] as const).map((status) => (
                    <TouchableOpacity
                        key={status}
                        onPress={() => setFilterStatus(status)}
                        className={`px-4 py-2 rounded-xl mb-2 ${filterStatus === status ? 'bg-orange-500' : 'bg-white border border-gray-200'}`}
                    >
                        <Text className={`text-xs font-bold uppercase ${filterStatus === status ? 'text-white' : 'text-gray-500'}`}>
                            {status.replace('_', ' ')}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {filteredDisputes.map((dispute, index) => renderDisputeCard(dispute, index))}
            </ScrollView>

            {/* Details Modal */}
            <Modal
                visible={showDetailsModal}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setShowDetailsModal(false)}
            >
                {selectedDispute && (
                    <View className="flex-1 bg-gray-50">
                        {/* Modal Header */}
                        <View className="bg-orange-500 px-6 pt-16 pb-6">
                            <View className="flex-row justify-between items-center mb-3">
                                <View className="flex-1">
                                    <Text className="text-orange-100 text-xs font-bold uppercase tracking-wide">Dispute #{selectedDispute.id}</Text>
                                    <Text className="text-white text-xl font-black mt-1">{selectedDispute.title}</Text>
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
                                <Text className="text-dark-900 font-bold text-lg mb-4">Dispute Details</Text>
                                <Text className="text-gray-700 text-sm leading-5 mb-4">{selectedDispute.description}</Text>
                                {selectedDispute.status !== 'resolved' && (
                                    <>
                                        <Text className="text-dark-900 font-bold text-lg mb-3">Add Resolution Note</Text>
                                        <TextInput
                                            placeholder="Enter resolution details..."
                                            value={resolutionNote}
                                            onChangeText={setResolutionNote}
                                            multiline
                                            numberOfLines={4}
                                            className="bg-gray-50 rounded-xl p-4 text-dark-900 text-sm border border-gray-200"
                                            placeholderTextColor="#B2BEC3"
                                            textAlignVertical="top"
                                        />
                                        <TouchableOpacity
                                            onPress={() => handleResolve(selectedDispute)}
                                            className="bg-green-500 py-4 rounded-xl items-center flex-row justify-center mt-4"
                                        >
                                            <Ionicons name="checkmark-circle" size={20} color="white" />
                                            <Text className="text-white font-bold text-sm uppercase tracking-wide ml-2">Mark as Resolved</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        </ScrollView>
                    </View>
                )}
            </Modal>
        </View>
    );
}
