import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const Task = (props) => {
  const { text, completeTask, index } = props;
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{text}</Text>
      </View>
      <View style={styles.circular}>
        <Icon
          onPress={() => completeTask(index)}
          name="delete"
          color="red"
          size={30}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  circular: {
    backgroundColor: "#FFF",
    width: 30,
    height: 30,
  },
});

export default Task;
