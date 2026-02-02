import ProfileView from '@/components/driver/ProfileView';
import React from 'react';
import { View } from 'react-native';

export default function ProfileScreen() {
    const mockUser = {
        name: "Alex Driver",
        email: "alex.driver@gmail.com"
    };

    return (
        <View className="flex-1 bg-driver-bg">
            <ProfileView user={mockUser} />
        </View>
    );
}
