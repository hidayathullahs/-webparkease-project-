export interface UserStat {
    label: string;
    value: string;
    icon: string;
    color: string;
    bg: string;
}

export interface ActivityLog {
    id: string;
    title: string;
    desc: string;
    time: string;
    status: 'success' | 'warning' | 'info' | 'pending';
}

export interface ChartData {
    available: number;
    occupied: number;
    total: number;
}

export interface DurationData {
    label: string;
    count: number;
    color: string;
}

export interface ParkingSlot {
    id: string;
    label: string;
    status: 'available' | 'occupied' | 'reserved';
}
