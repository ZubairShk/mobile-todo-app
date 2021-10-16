import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import Task from "./components/Task";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState();

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("tasks", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("tasks");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return null;
    }
  };
  // useEffect(() => {
  //   const data = getData();
  //   console.log(data);
  //   if (!data?._W === null) {
  //     console.log(data);
  //     setTaskItems(data);
  //   }
  // }, []);

  const handleAddTask = () => {
    if (editing) {
      const tempArr = [...taskItems];
      tempArr[id] = task;
      setTaskItems(tempArr);
      storeData(tempArr);
      setTask(null);
      setEditing(false);
      Keyboard.dismiss();
      setId();
    } else {
      Keyboard.dismiss();
      setTaskItems([...taskItems, task]);
      const tempArr = [...taskItems, task];
      storeData(tempArr);
      setTask(null);
    }
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    storeData(itemsCopy);
  };

  const selectForEdit = (index) => {
    setEditing(true);
    let selectItem = taskItems[index];
    setId(index);
    setTask(selectItem);
  };

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Tasks</Text>
          <View style={styles.items}>
            {/* This is where the tasks will go! */}
            {taskItems?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectForEdit(index)}
                >
                  <Task text={item} index={index} completeTask={completeTask} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Type here..."}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>
              <Icon name="send" reverse="true" />
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 0,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: "80%",
    marginRight: 5,
    fontSize: 16,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    marginRight: 5,
  },
  addText: {},
});
