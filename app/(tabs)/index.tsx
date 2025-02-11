import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native'; // Import the hook

type Habit = {
    name: string;
    completed: boolean;
};

export default function HomeScreen() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [lastResetDate, setLastResetDate] = useState<string>(new Date().toDateString());
    const isFocused = useIsFocused(); // Track if the screen is focused

    // Load habits and last reset date from AsyncStorage
    useEffect(() => {
        const loadData = async () => {
            try {
                const storedHabits = await AsyncStorage.getItem('@habits');
                const storedDate = await AsyncStorage.getItem('@lastResetDate');
                if (storedHabits !== null) {
                    setHabits(JSON.parse(storedHabits));
                }
                if (storedDate !== null) {
                    setLastResetDate(storedDate);
                }
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };
        if (isFocused) { // Only load data if the screen is focused
            loadData();
        }
    }, [isFocused]); // Reload when the screen comes into focus

    // Check if the date has changed and reset completion status if necessary
    useEffect(() => {
        const checkDate = async () => {
            const today = new Date().toDateString();
            if (lastResetDate !== today) {
                // Reset completion status for all habits
                const resetHabits = habits.map((habit) => ({ ...habit, completed: false }));
                setHabits(resetHabits);
                setLastResetDate(today);
                await AsyncStorage.setItem('@habits', JSON.stringify(resetHabits));
                await AsyncStorage.setItem('@lastResetDate', today);
            }
        };
        checkDate();
    }, [habits, lastResetDate]);

    // Toggle completion status of a habit
    const toggleCompletion = (index: number) => {
        const updatedHabits = [...habits];
        updatedHabits[index].completed = !updatedHabits[index].completed;
        setHabits(updatedHabits);
        AsyncStorage.setItem('@habits', JSON.stringify(updatedHabits));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Today's Habits</Text>
            {habits.map((habit, index) => (
                <Pressable
                    key={index}
                    onPress={() => toggleCompletion(index)}
                    style={styles.habitItem}
                >
                    <Text
                        style={[
                            styles.habitText,
                            habit.completed && styles.completedHabit,
                        ]}
                    >
                        {habit.name}
                    </Text>
                    {habit.completed && (
                        <FontAwesome name="check" size={18} color="green" />
                    )}
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#25292e',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "white",
    },
    habitItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    habitText: {
        fontSize: 18,
    },
    completedHabit: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
});