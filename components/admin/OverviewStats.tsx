import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

import { AdminService } from '../../services/admin.service';
import { ActivityLog, ChartData, DurationData, ParkingSlot, UserStat } from '../../services/types';
import OccupancyDonutChart from './OccupancyDonutChart';
import ParkingDurationChart from './ParkingDurationChart';
import ParkingSlotGrid from './ParkingSlotGrid';

export default function OverviewStats() {
    const [stats, setStats] = useState<UserStat[]>([]);
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [occupancy, setOccupancy] = useState<ChartData | null>(null);
    const [duration, setDuration] = useState<DurationData[]>([]);
    const [slots, setSlots] = useState<ParkingSlot[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [statData, actData, occData, durData, slotData] = await Promise.all([
                    AdminService.getOverviewStats(),
                    AdminService.getRecentActivity(),
                    AdminService.getOccupancyData(),
                    AdminService.getDurationData(),
                    AdminService.getParkingSlots()
                ]);
                setStats(statData);
                setActivities(actData);
                setOccupancy(occData);
                setDuration(durData);
                setSlots(slotData);
            } catch (error) {
                console.error('Failed to load dashboard data', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-gray-400 animate-pulse">Loading Dashboard...</Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 p-2 md:p-6" showsVerticalScrollIndicator={false}>
            {/* Header for Web */}
            {Platform.OS === 'web' && (
                <View className="mb-8 hidden md:flex">
                    <Text className="text-3xl font-black text-slate-800 tracking-tight">System Overview</Text>
                    <Text className="text-slate-500 font-medium">Welcome back, Administrator</Text>
                </View>
            )}

            {/* Stats Grid */}
            <Text className="text-slate-800 font-bold text-lg mb-4">Key Metrics</Text>
            <View className="flex-row gap-4 mb-8 flex-wrap">
                <View className="flex-1 gap-4 min-w-[300px]">
                    {stats.slice(0, 2).map((stat, idx) => (
                        <View key={idx} className="bg-white p-6 rounded-3xl shadow-sm shadow-slate-200 border border-slate-100 flex-row justify-between items-center hover:shadow-md transition-shadow cursor-default">
                            <View>
                                <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-wide">{stat.label}</Text>
                                <Text className="text-3xl font-black text-slate-800 mt-1 tracking-tight">{stat.value}</Text>
                            </View>
                            <View className="w-12 h-12 rounded-2xl justify-center items-center backdrop-blur-sm" style={{ backgroundColor: stat.bg }}>
                                <Ionicons name={stat.icon as any} size={24} color={stat.color} />
                            </View>
                        </View>
                    ))}
                </View>

                <View className="flex-1 gap-4 min-w-[300px]">
                    <View className="bg-white p-6 rounded-3xl shadow-sm shadow-slate-200 border border-slate-100 flex-row justify-between items-center hover:shadow-md transition-shadow">
                        <View>
                            <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-wide">{stats[2]?.label}</Text>
                            <Text className="text-3xl font-black text-slate-800 mt-1 tracking-tight">{stats[2]?.value}</Text>
                        </View>
                        <View className="w-12 h-12 rounded-2xl justify-center items-center backdrop-blur-sm" style={{ backgroundColor: stats[2]?.bg }}>
                            <Ionicons name={stats[2]?.icon as any} size={24} color={stats[2]?.color} />
                        </View>
                    </View>

                    <View className="flex-1 bg-slate-900 rounded-3xl p-6 shadow-lg shadow-slate-300 flex-row justify-between items-center overflow-hidden relative">
                        <View className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl" />
                        <View className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl" />

                        <View>
                            <View className="flex-row items-center gap-2 mb-2">
                                <View className="w-8 h-8 bg-white/10 rounded-xl justify-center items-center backdrop-blur-md border border-white/10">
                                    <Ionicons name="trending-up" size={16} color="white" />
                                </View>
                                <Text className="text-white text-lg font-bold">Growth</Text>
                            </View>
                            <Text className="text-slate-400 text-xs font-mono">+18.5% vs last month</Text>
                        </View>
                        <TouchableOpacity className="bg-white/10 py-2.5 px-4 rounded-xl items-center border border-white/10 hover:bg-white/20 transition-colors">
                            <Text className="text-white font-bold text-[10px] uppercase tracking-wide">View Analytics</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Charts Section */}
            <View className="flex-row gap-6 mb-8 flex-wrap">
                <View className="flex-1 min-w-[300px] bg-white p-6 rounded-3xl shadow-sm shadow-slate-200 border border-slate-100">
                    <Text className="text-slate-800 font-bold mb-4">Occupancy Rate</Text>
                    {occupancy && <OccupancyDonutChart data={occupancy} />}
                </View>
                <View className="flex-1 min-w-[300px] bg-white p-6 rounded-3xl shadow-sm shadow-slate-200 border border-slate-100">
                    <Text className="text-slate-800 font-bold mb-4">Duration Analytics</Text>
                    <ParkingDurationChart data={duration} />
                </View>
            </View>

            {/* Slot Grid Preview */}
            <View className="mb-8 bg-white p-6 rounded-3xl shadow-sm shadow-slate-200 border border-slate-100">
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-slate-800 font-bold">Live Status Monitor</Text>
                    <View className="flex-row gap-4">
                        <View className="flex-row items-center gap-1.5"><View className="w-2 h-2 rounded-full bg-teal-500" /><Text className="text-xs text-slate-500">Available</Text></View>
                        <View className="flex-row items-center gap-1.5"><View className="w-2 h-2 rounded-full bg-slate-200" /><Text className="text-xs text-slate-500">Occupied</Text></View>
                        <View className="flex-row items-center gap-1.5"><View className="w-2 h-2 rounded-full bg-indigo-500" /><Text className="text-xs text-slate-500">Reserved</Text></View>
                    </View>
                </View>
                <ParkingSlotGrid slots={slots} columns={8} />
            </View>

            {/* Recent Activity */}
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-slate-800 font-bold text-lg">Activity Log</Text>
                <TouchableOpacity>
                    <Text className="text-indigo-500 font-bold text-xs uppercase tracking-wide hover:underline cursor-pointer">View All History</Text>
                </TouchableOpacity>
            </View>

            <View className="gap-3 pb-10">
                {activities.map((item, index) => (
                    <Animated.View key={item.id} entering={FadeInRight.delay(index * 100).springify()}>
                        <View className="bg-white p-4 rounded-2xl shadow-sm shadow-slate-100 border border-slate-100 flex-row items-center hover:bg-slate-50 transition-colors">
                            <View className={`w-1 h-8 rounded-full mr-4 ${item.status === 'success' ? 'bg-teal-500' :
                                item.status === 'warning' ? 'bg-amber-500' :
                                    item.status === 'info' ? 'bg-sky-500' : 'bg-indigo-500'
                                }`} />
                            <View className="flex-1">
                                <Text className="text-slate-800 font-bold text-sm">{item.title}</Text>
                                <Text className="text-slate-400 text-xs mt-0.5">{item.desc}</Text>
                            </View>
                            <View className="items-end">
                                <Text className="text-slate-400 text-[10px] font-bold uppercase">{item.time}</Text>
                                <View className={`px-2 py-0.5 rounded-full mt-1 ${item.status === 'pending' ? 'bg-indigo-50' : 'bg-transparent'}`}>
                                    <Text className={`text-[9px] font-bold uppercase ${item.status === 'pending' ? 'text-indigo-500' : 'text-transparent'}`}>{item.status}</Text>
                                </View>
                            </View>
                        </View>
                    </Animated.View>
                ))}
            </View>
        </ScrollView>
    );
}
