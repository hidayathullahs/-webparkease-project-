import { ActivityLog, ChartData, DurationData, ParkingSlot, UserStat } from './types';

// Mock Data Service - Replace with API calls in production

export const AdminService = {
    getOverviewStats: async (): Promise<UserStat[]> => {
        // Simulate API delay
        return [
            { label: 'Total Users', value: '1,204', icon: 'people', color: '#6366f1', bg: '#e0e7ff' }, // Indigo
            { label: 'Active Providers', value: '85', icon: 'business', color: '#0ea5e9', bg: '#e0f2fe' }, // Sky
            { label: 'Monthly Revenue', value: '₹12.5L', icon: 'wallet', color: '#14b8a6', bg: '#ccfbf1' }, // Teal
        ];
    },

    getRecentActivity: async (): Promise<ActivityLog[]> => {
        return [
            { id: '1', title: 'New Provider Registration', desc: 'City Mall Parking applied', time: '10 min ago', status: 'pending' },
            { id: '2', title: 'Payment Report Generated', desc: 'February 2026', time: '2 hrs ago', status: 'success' },
            { id: '3', title: 'User Complaint #402', desc: 'Refund request initiated', time: '5 hrs ago', status: 'warning' },
            { id: '4', title: 'System Update', desc: 'v1.2.0 deployed successfully', time: '1 day ago', status: 'info' },
        ];
    },

    getOccupancyData: async (): Promise<ChartData> => {
        return { available: 45, occupied: 105, total: 150 };
    },

    getDurationData: async (): Promise<DurationData[]> => {
        return [
            { label: '< 1h', count: 45, color: '#14b8a6' }, // Teal
            { label: '1-3h', count: 85, color: '#0ea5e9' }, // Sky
            { label: '3-6h', count: 32, color: '#6366f1' }, // Indigo
            { label: '> 6h', count: 18, color: '#f43f5e' }, // Rose
        ];
    },

    getParkingSlots: async (): Promise<ParkingSlot[]> => {
        return Array.from({ length: 16 }, (_, i) => ({
            id: `A-${i + 1}`,
            label: `A-${i + 1}`,
            status: i % 3 === 0 ? 'available' : i % 3 === 1 ? 'occupied' : 'reserved'
        })) as ParkingSlot[];
    }
};
