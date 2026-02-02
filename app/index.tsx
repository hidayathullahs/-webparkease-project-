import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// --- Components ---

const FeatureCard = ({ icon, title, desc, delay }: { icon: string; title: string; desc: string; delay: number }) => (
  <Animated.View
    entering={FadeInUp.delay(delay).duration(800)}
    className="w-full md:w-[30%] bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm hover:bg-slate-800/50 transition-colors"
  >
    <View className="w-14 h-14 bg-indigo-500/10 rounded-2xl items-center justify-center mb-6 border border-indigo-500/20">
      <Ionicons name={icon as any} size={28} color="#818cf8" />
    </View>
    <Text className="text-xl font-bold text-white mb-3">{title}</Text>
    <Text className="text-slate-400 leading-relaxed">{desc}</Text>
  </Animated.View>
);

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <View className="items-center">
    <Text className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-2">{value}</Text>
    <Text className="text-slate-500 font-bold uppercase tracking-widest text-sm">{label}</Text>
  </View>
);

const FooterLink = ({ title, items }: { title: string; items: string[] }) => (
  <View>
    <Text className="text-white font-bold mb-6">{title}</Text>
    <View className="gap-4">
      {items.map((item) => (
        <Text key={item} className="text-slate-400 hover:text-teal-400 transition-colors cursor-pointer text-sm">
          {item}
        </Text>
      ))}
    </View>
  </View>
);

export default function LandingPage() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll Transparency for Navbar
  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrolled(offsetY > 50);
  };

  const roles = [
    {
      title: 'Driver',
      subtitle: 'Find Parking',
      description: 'Locate spots instantly.',
      route: '/(driver)',
      icon: 'car-sport',
      accent: '#2dd4bf', // Teal
    },
    {
      title: 'Provider',
      subtitle: 'Host & Earn',
      description: 'Monetize empty space.',
      route: '/(provider)',
      icon: 'business',
      accent: '#818cf8', // Indigo
    },
    {
      title: 'Admin',
      subtitle: 'Control Panel',
      description: 'System Management.',
      route: '/(admin)',
      icon: 'shield-checkmark',
      accent: '#38bdf8', // Sky
    },
  ];

  return (
    <View className="flex-1 bg-[#020617]">
      {/* --- Ambient Background --- */}
      <View className="absolute inset-0 overflow-hidden pointer-events-none bg-[#020617]">
        <View className="absolute -top-[20%] -left-[10%] w-[1500px] h-[1500px] bg-indigo-600/10 rounded-full blur-[150px]" />
        <View className="absolute bottom-[20%] -right-[10%] w-[1000px] h-[1000px] bg-teal-500/5 rounded-full blur-[150px]" />
        <View className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      </View>

      {/* --- Navbar --- */}
      <View className={`absolute top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 py-4' : 'py-6'}`}>
        <View className="max-w-[1400px] mx-auto px-6 w-full flex-row justify-between items-center">
          <View className="flex-row items-center gap-2">
            <View className="w-8 h-8 bg-gradient-to-br from-teal-400 to-indigo-500 rounded-lg items-center justify-center">
              <Ionicons name="layers" size={18} color="white" />
            </View>
            <Text className="text-xl font-bold text-white tracking-tight">ParkEase<Text className="text-teal-400">.</Text></Text>
          </View>

          <View className="hidden md:flex flex-row items-center gap-10">
            <Text className="text-slate-400 hover:text-white font-medium cursor-pointer transition-colors">Solutions</Text>
            <Text className="text-slate-400 hover:text-white font-medium cursor-pointer transition-colors">Locations</Text>
            <Text className="text-slate-400 hover:text-white font-medium cursor-pointer transition-colors">Enterprise</Text>
          </View>

          <View className="flex-row items-center gap-4">
            <Text className="hidden md:flex text-white font-bold cursor-pointer">Log In</Text>
            <TouchableOpacity className="bg-white px-5 py-2.5 rounded-full hover:bg-teal-50 transition-colors">
              <Text className="text-slate-900 font-bold text-sm">Get App</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* --- Hero Section --- */}
        <View className="pt-40 pb-20 px-6 max-w-[1400px] mx-auto w-full items-center text-center">
          <Animated.View entering={FadeInUp.duration(1000)} className="items-center">
            <View className="inline-flex flex-row items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 mb-8 backdrop-blur-sm">
              <View className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <Text className="text-teal-400 text-xs font-bold uppercase tracking-widest">Now Live in 50+ Cities</Text>
            </View>

            <Text className="text-5xl md:text-8xl font-black text-white leading-[1.1] tracking-tight mb-8">
              Smart Parking <br />
              <Text className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-400 to-sky-400">Reimagined</Text>
            </Text>

            <Text className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl leading-relaxed mb-12">
              The all-in-one platform for drivers, providers, and city planners.
              Real-time data, AI predictions, and seamless payments.
            </Text>

            <View className="flex-col md:flex-row items-center gap-4 w-full md:w-auto">
              <TouchableOpacity className="w-full md:w-auto bg-gradient-to-r from-teal-500 to-indigo-600 px-8 py-4 rounded-2xl shadow-lg shadow-indigo-500/25 hover:scale-105 transition-transform">
                <Text className="text-white font-bold text-lg text-center">Start Free Trial</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-full md:w-auto px-8 py-4 rounded-2xl border border-slate-700 bg-slate-800/20 hover:bg-slate-800/50 transition-colors flex-row items-center justify-center gap-2">
                <Ionicons name="play-circle" size={20} color="white" />
                <Text className="text-white font-bold text-lg">Watch Video</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>

        {/* --- Image/Demo Placeholder --- */}
        <View className="px-6 mb-32 max-w-[1400px] mx-auto w-full">
          <Animated.View entering={FadeInUp.delay(400).duration(1000)} className="w-full aspect-[16/9] md:aspect-[21/9] bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden relative shadow-2xl shadow-indigo-500/10 group">
            {/* Abstract UI Representation */}
            <View className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent" />
            <View className="absolute top-[20%] left-[10%] right-[10%] bottom-0 bg-[#0f172a] rounded-t-3xl border-t border-l border-r border-slate-700 shadow-2xl transform translate-y-10 group-hover:translate-y-6 transition-transform duration-700 p-6">
              <View className="flex-row items-center justify-between mb-8 border-b border-slate-800 pb-4">
                <View className="flex-row gap-2">
                  <View className="w-3 h-3 rounded-full bg-red-500/20" />
                  <View className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <View className="w-3 h-3 rounded-full bg-green-500/20" />
                </View>
                <Text className="text-slate-600 text-xs font-mono">dashboard • admin • view</Text>
              </View>
              <View className="flex-row gap-8">
                <View className="w-64 space-y-4">
                  <View className="h-20 bg-slate-800/50 rounded-xl" />
                  <View className="h-8 bg-slate-800/30 rounded-lg w-3/4" />
                  <View className="h-8 bg-slate-800/30 rounded-lg w-1/2" />
                </View>
                <View className="flex-1 space-y-4">
                  <View className="flex-row gap-4">
                    <View className="flex-1 h-32 bg-indigo-500/10 rounded-xl border border-indigo-500/20" />
                    <View className="flex-1 h-32 bg-teal-500/10 rounded-xl border border-teal-500/20" />
                  </View>
                  <View className="h-48 bg-slate-800/50 rounded-xl" />
                </View>
              </View>
            </View>
          </Animated.View>
        </View>

        {/* --- Stats Section --- */}
        <View className="py-20 bg-slate-900/30 border-y border-white/5">
          <View className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <StatCard value="2M+" label="Daily Drivers" />
            <StatCard value="50+" label="Smart Cities" />
            <StatCard value="99.9%" label="Uptime" />
            <StatCard value="15k" label="Connected Lots" />
          </View>
        </View>

        {/* --- Features Grid --- */}
        <View className="py-32 px-6 max-w-[1400px] mx-auto w-full">
          <View className="text-center mb-20">
            <Text className="text-teal-400 font-bold uppercase tracking-widest text-sm mb-3">Why ParkEase?</Text>
            <Text className="text-4xl md:text-5xl font-bold text-white mb-6">Everything you need to <br />manage parking.</Text>
          </View>

          <View className="flex-row flex-wrap gap-8 justify-center">
            <FeatureCard
              delay={0}
              icon="analytics"
              title="Real-time Analytics"
              desc="Track occupancy, revenue, and duration with millisecond precision dashboard updates."
            />
            <FeatureCard
              delay={200}
              icon="wallet"
              title="Seamless Payments"
              desc="Integrated digital wallet system supporting all major payment gateways and auto-billing."
            />
            <FeatureCard
              delay={400}
              icon="lock-closed"
              title="Enterprise Security"
              desc="Bank-grade encryption for all user data and transactions. SOC2 Compliant."
            />
          </View>
        </View>

        {/* --- Portal Entry (Original App Links) --- */}
        <View className="py-32 px-6 bg-gradient-to-b from-[#020617] to-indigo-950/20">
          <View className="max-w-[1200px] mx-auto w-full">
            <div className="text-center mb-16">
              <Text className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Portal</Text>
              <Text className="text-slate-400">Select your role to enter the application environment.</Text>
            </div>

            <View className="flex-row flex-wrap gap-6 justify-center">
              {roles.map((role, index) => (
                <Animated.View key={index} entering={FadeInDown.delay(index * 100)} className="w-full md:w-[30%]">
                  {/* @ts-ignore */}
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => router.push(role.route as any)}
                    onHoverIn={() => setHoveredCard(index)}
                    onHoverOut={() => setHoveredCard(null)}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 group"
                  >
                    <View className="flex-row justify-between items-start mb-8">
                      <View className="w-12 h-12 rounded-xl bg-slate-800 items-center justify-center group-hover:bg-white transition-colors">
                        <Ionicons name={role.icon as any} size={24} color={hoveredCard === index ? role.accent : 'white'} />
                      </View>
                      <Ionicons name="arrow-forward" size={20} color="#475569" className="group-hover:text-white transition-colors" />
                    </View>
                    <Text className="text-2xl font-bold text-white mb-2">{role.title}</Text>
                    <Text className="text-slate-400">{role.description}</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </View>
        </View>

        {/* --- Footer --- */}
        <View className="border-t border-slate-800 bg-[#020617] pt-20 pb-10 px-6">
          <View className="max-w-[1400px] mx-auto w-full flex-col md:flex-row justify-between gap-12 mb-20">
            <View className="max-w-xs">
              <Text className="text-2xl font-bold text-white mb-6">ParkEase.</Text>
              <Text className="text-slate-400 leading-relaxed">
                Making cities smarter, one parking spot at a time. The world's most advanced parking OS.
              </Text>
            </View>

            <View className="flex-1 flex-row flex-wrap gap-12 md:gap-24">
              <FooterLink title="Product" items={['Features', 'Integrations', 'Pricing', 'Changelog']} />
              <FooterLink title="Company" items={['About', 'Careers', 'Blog', 'Contact']} />
              <FooterLink title="Legal" items={['Privacy', 'Terms', 'Security', 'Status']} />
            </View>
          </View>

          <View className="max-w-[1400px] mx-auto w-full pt-8 border-t border-slate-900 flex-col md:flex-row justify-between items-center gap-4">
            <Text className="text-slate-600 text-sm">© 2024 ParkEase Inc. All rights reserved.</Text>
            <View className="flex-row gap-6 opacity-50">
              <Ionicons name="logo-twitter" size={20} color="white" />
              <Ionicons name="logo-github" size={20} color="white" />
              <Ionicons name="logo-linkedin" size={20} color="white" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
