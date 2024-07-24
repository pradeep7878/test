import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { COLORS } from "../../constants";

export default ExpenseHistory = () => {
  const data = [
    {
      id: 1,
      image: "https://bootdey.com/img/Content/avatar/avatar1.png",
      name: "Tea",
      category: "Category",
      closingBlance: "₹ 12000",
      expense: {
        status: "in",
        amount: "₹ 2000",
      },
      comment: "Wednesday, 17 July 2024, 11:03:43",
    },
    {
      id: 2,
      image: "https://bootdey.com/img/Content/avatar/avatar6.png",
      name: "Lunch",
      category: "Category",
      closingBlance: "₹ 12000",
      expense: {
        status: "out",
        amount: "₹ 2000",
      },
      comment: "Wednesday, 17 July 2024, 11:03:43",
    },
    {
      id: 3,
      image: "https://bootdey.com/img/Content/avatar/avatar7.png",
      name: "Dinner",
      category: "Category",
      closingBlance: "₹ 12000",
      expense: {
        status: "in",
        amount: "₹ 2000",
      },
      comment: "Wednesday, 17 July 2024, 11:03:43",
    },
    {
      id: 4,
      image: "https://bootdey.com/img/Content/avatar/avatar2.png",
      name: "Petrol",
      category: "Category",
      closingBlance: "₹ 12000",
      expense: {
        status: "out",
        amount: "₹ 2000",
      },
      comment: "Wednesday, 17 July 2024, 11:03:43",
    },
    {
      id: 5,
      image: "https://bootdey.com/img/Content/avatar/avatar3.png",
      name: "Gifts",
      category: "Category",
      closingBlance: "₹ 12000",
      expense: {
        status: "out",
        amount: "₹ 2000",
      },
      comment: "Wednesday, 17 July 2024, 11:03:43",
    },
    {
      id: 6,
      image: "https://bootdey.com/img/Content/avatar/avatar4.png",
      name: "Party",
      category: "Category",
      closingBlance: "₹ 12000",
      expense: {
        status: "in",
        amount: "₹ 2000",
      },
      comment: "Wednesday, 17 July 2024, 11:03:43",
    },
    {
      id: 7,
      image: "https://bootdey.com/img/Content/avatar/avatar5.png",
      name: "Grocery",
      category: "Category",
      closingBlance: "₹ 12000",
      expense: {
        status: "in",
        amount: "₹ 2000",
      },
      comment: "Wednesday, 17 July 2024, 11:03:43",
    },
  ];

  const [comments, setComments] = useState(data);

  return (
    <FlatList
      style={styles.root}
      data={comments}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={(item) => item.id.toString()} // Ensure key is a string
      renderItem={({ item }) => {
        return (
          <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <Text style={styles.category}>{item.category}</Text>
                {/* <Text style={item.expense.status === "in" ? styles.addMoney : styles.outMoney}>{item.expense.status === "in" ? `+${item.expense.amount}` : `-${item.expense.amount}`}</Text> */}
              </View>
              <View style={styles.contentHeader}>
                <Text style={styles.name}>{item.name}</Text>
                <Text
                  style={
                    item.expense.status === "in"
                      ? styles.addMoney
                      : styles.outMoney
                  }
                >
                  {item.expense.status === "in"
                    ? `+${item.expense.amount}`
                    : `-${item.expense.amount}`}
                </Text>
              </View>
              <View style={styles.contentHeader}>
                <Text rkType="primary3 mediumLine">{item.comment}</Text>
              </View>
              <View style={styles.contentHeader}>
                <Text style={styles.closingBlancetext}>Closing Balance</Text>
                <Text rkType="primary3 mediumLine">{item.closingBlance}</Text>
              </View>
            </View>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  addMoney: {
    fontSize: 14,
    color: "green",
  },
  outMoney: {
    fontSize: 14,
    color: "red",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  category: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  closingBlancetext:{
    color:COLORS.brand
  }
});
