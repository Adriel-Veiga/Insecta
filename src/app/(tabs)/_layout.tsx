import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2400FF",
        tabBarInactiveTintColor: "#707070",
        tabBarStyle: {
          position: "absolute",
          bottom: 24,
          marginHorizontal: 20,
          height: 45,
          borderRadius: 24,
          backgroundColor: "#D9D9D9",
          opacity: 0.9,
        },
        tabBarItemStyle: {
          paddingTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="social"
        options={{
          title: " ",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../../assets/Icons/users-alt(2).png")
                  : require("../../assets/Icons/users-alt.png")
              }
              style={{ width: 35, height: 35 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: " ",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../../assets/Icons/home(1).png")
                  : require("../../assets/Icons/home.png")
              }
              style={{ width: 30, height: 30 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../../assets/Icons/user(1).png")
                  : require("../../assets/Icons/user.png")
              }
              style={{ width: 30, height: 30 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
