import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, FlatList } from 'react-native'
import { icons } from "../constants";
import { useNavigation } from '@react-navigation/native';

export default ServiceCategory = () => {
    const navigation = useNavigation();

   const data = [
        {
          id:1,  
          title: "Fast tag",
          image: {
            source: icons.fastag,
          },
          screen: "Fastag",
        },
        {
          id:2,  
          title: "Insurance",
          image: {
            source: icons.insurance,
          },
          screen: "Insurance",
        },
        {
          id:3,  
          title: "Toll Calculator",
          image: {
            source: icons.toll,
          },
          screen: "TollCalculator",
        },
        {
          id:4,  
          title: "Mileage Calculator",
          image: {
            source: icons.mileage,
          },
          screen: "MileageCalculator",
        },
        {
          id:5,  
          title: "Fuel Price",
          image: {
            source: icons.fuel,
          },
          screen: "FuelPrice",
        },
        {
          id:6,  
          title: "Expense Calculator",
          image: {
            source: icons.vaughan,
          },
          screen: "VaughanInfo",
        },
        {
            id:7,
            title: "Buy & Sell",
          image: {
            source: icons.buy,
          },
          screen: "MarketPlace",
        },
        {
            id:8,
            title: "Load Available",
          image: {
            source: icons.load,
          },
          screen: "AvailableLoads",
        },
        {
          id:9,  
          title: "Driver Needs",
          image: {
            source: icons.driver,
          },
          screen: "AvailableDrivers",
        },
        {
            id:10,
            title: "Truck Availabe",
          image: {
            source: icons.truck,
          },
          screen: "AvailableTrucks",
        },
      ];



//   const data = [
//     { id: 1, title: 'Option 1', image: 'https://img.icons8.com/color/70/000000/cottage.png' },
//     {
//       id: 1,
//       title: 'Option 2',
//       image: 'https://img.icons8.com/color/70/000000/administrator-male.png',
//     },
//     { id: 2, title: 'Option 3', image: 'https://img.icons8.com/color/70/000000/filled-like.png' },
//     { id: 3, title: 'Option 4', image: 'https://img.icons8.com/color/70/000000/facebook-like.png' },
//     { id: 4, title: 'Option 5', image: 'https://img.icons8.com/color/70/000000/shutdown.png' },
//     { id: 5, title: 'Option 6', image: 'https://img.icons8.com/color/70/000000/traffic-jam.png' },
//     {
//       id: 6,
//       title: 'Option 7',
//       image: 'https://img.icons8.com/dusk/70/000000/visual-game-boy.png',
//     },
//     { id: 8, title: 'Option 8', image: 'https://img.icons8.com/flat_round/70/000000/cow.png' },
//     { id: 9, title: 'Option 9', image: 'https://img.icons8.com/color/70/000000/coworking.png' },
//     { id: 9, title: 'Option 10', image: 'https://img.icons8.com/nolan/70/000000/job.png' },
//   ]

  const [options, setOptions] = useState(data)

  const showAlert = () => {
    Alert.alert('Option selected')
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={options}
        horizontal={false}
        numColumns={2}
        keyExtractor={item => {
          return item.id
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate(item.screen)}
              
              >
              <View style={styles.cardFooter}></View>
              <Image style={styles.cardImage} source={item.image.source} />
              <View style={styles.cardHeader}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom:60
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: '#E6E6E6',
  },
  listContainer: {
    alignItems: 'center',
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 10,
    backgroundColor: 'white',
    flexBasis: '42%',
    marginHorizontal: 10,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 40,
    width: 40,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: '#696969',
  },
})