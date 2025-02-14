import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants";
import HeaderWithOutBS from "../../components/HeaderWithOutBS";

const TollCalculator = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <HeaderWithOutBS title="Toll Calculator" />
      </View>
    </SafeAreaView>
  );
};

export default TollCalculator;
