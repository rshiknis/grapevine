import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { getDatabase, ref, set } from 'firebase/database'; // Import Firebase Realtime Database functions
import { auth } from './firebase/config'; // Import Firebase auth instance

export default function PreferencesScreen() {
    const router = useRouter();
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSavePreferences = async () => {
        if (!age || !gender || !phone) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const db = getDatabase();
            const userId = auth.currentUser?.uid; // Get the logged-in user ID

            if (!userId) {
                throw new Error('User not logged in');
            }

            // Save user preferences to Firebase Realtime Database
            await set(ref(db, `users/${userId}/preferences`), {
                age,
                gender,
                phone,
            });

            Alert.alert('Success', 'Preferences saved!');
            router.push('/essentials'); // Navigate to home or another screen
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Could not save preferences. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Let's get to know you...</Text>

            <Text style={styles.label}>Choose your age</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your age"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
            />

            <Text style={styles.label}>Select your gender</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your gender"
                value={gender}
                onChangeText={setGender}
            />

            <Text style={styles.label}>Your phone number</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
            />

            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSavePreferences}
                disabled={loading}
            >
                <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Next'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B69191', // Matching theme color
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    button: {
        height: 50,
        backgroundColor: '#5E3A3A',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
