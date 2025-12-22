import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={35} name={focused ? "house.fill": "house"} color={focused ? "#000" : "#687076"} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={35} name={focused ? "safari.fill":"safari"} color={focused ? "#000" : "#687076"} />,
        }}
      />
      <Tabs.Screen
        name="ebook"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={35} name={focused ? "text.book.closed.fill" : "text.book.closed"} color={focused ? "#000" : "#687076"} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={35} name={focused ? "person.fill" : "person"} color={focused ? "#000" : "#687076"} />,
        }}
      />
    </Tabs>
  );
}
