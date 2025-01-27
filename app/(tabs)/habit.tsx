import { Text, View, StyleSheet, TextInput, Button  } from "react-native";
import React, { useState } from "react";

export default function Habit() {
    const [challenges, setChallenges] = useState([]);
    const [newChallenge, setNewChallenge] = useState('');

    const addChallenge = () => {
        if (newChallenge.trim() !== '') {
          setChallenges([...challenges, newChallenge]);
          setNewChallenge('');
        }
      };

    const removeChallenge = (index) => {
        const updatedChallenges = challenges.filter((_, i) => i !== index);
        setChallenges(updatedChallenges);
    };
      
      
  return (
    <View>
      <TextInput
        value={newChallenge}
        onChangeText={setNewChallenge}
        placeholder="Enter a new challenge"
      />
      <Button title="Add Challenge" onPress={addChallenge} />
      {challenges.map((challenge, index) => (
        <View key={index}>
          <Text>{challenge}</Text>
          <Button title="Remove" onPress={() => removeChallenge(index)} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e"
  },
  text: {
    color: "white"
  },
})