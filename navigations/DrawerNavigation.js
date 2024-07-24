import { View, Text, Image } from "react-native";
import React from "react";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { COLORS, images } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import BottomTabNavigation from "./BottomTabNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import Refer from "../screens/DrawerNavigationScreens/Refer";
import Language from "../screens/DrawerNavigationScreens/Language";
import AboutUs from "../screens/DrawerNavigationScreens/AboutUs";
import Blogs from "../screens/DrawerNavigationScreens/Blogs";
import TermsAndCondition from "../screens/DrawerNavigationScreens/TermsAndCondition";
import Logout from "../screens/Logout";

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View
              style={{
                height: 200,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.white,
              }}
            >
              <Image
                source={images.driverProfile}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 999,
                  marginBottom: 12,
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: COLORS.brand,
                  marginBottom: 6,
                }}
              >
                Pradeep Kumar
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.black,
                }}
              >
                9876543210
              </Text>
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: COLORS.white,
          width: 250,
        },
        headerStyle: {
          backgroundColor: COLORS.white,
        },
        headerShown: false,
        headerTintColor: COLORS.black,
        drawerLabelStyle: {
          color: COLORS.black,
          fontSize: 14,
          marginLeft: -10,
        },
      }}
    >
      <Drawer.Screen
        name="DrawerHome"
        options={{
          drawerLabel: "Home",
          title: "Home",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="home-outline" size={24} color={COLORS.brand} />
          ),
        }}
        component={BottomTabNavigation}
      />
      <Drawer.Screen
        name="DrawerMyPost"
        options={{
          drawerLabel: "My Posts",
          title: "MyPosts",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="mail-open-outline" size={24} color={COLORS.brand} />
          ),
        }}
        component={Refer}
      />
       <Drawer.Screen
        name="DrawerLanguage"
        options={{
          drawerLabel: "Language",
          title: "Language",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="language-sharp" size={24} color={COLORS.brand} />
          ),
        }}
        component={Language}
      />
      <Drawer.Screen
        name="DrawerAboutUs"
        options={{
          drawerLabel: "About Us",
          title: "AboutUs",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="business-outline" size={24} color={COLORS.brand} />
          ),
        }}
        component={AboutUs}
      />
      <Drawer.Screen
        name="DrawerBlogs"
        options={{
          drawerLabel: "Blogs",
          title: "Blogs",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="chatbox-ellipses-outline" size={24} color={COLORS.brand} />
          ),
        }}
        component={Blogs}
      />

      <Drawer.Screen
        name="DrawerTermsAndCondition"
        options={{
          drawerLabel: "Terms",
          title: "TermsAndCondition",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="alert-circle-outline" size={24} color={COLORS.brand} />
          ),
        }}
        component={TermsAndCondition}
      />

      <Drawer.Screen
        name="DrawerLogout"
        options={{
          drawerLabel: "Logout",
          title: "Logout",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="power-outline" size={24} color={COLORS.brand} />
          ),
        }}
        component={Logout}
      />
          
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;