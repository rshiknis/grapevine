import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { getDatabase, ref, set } from 'firebase/database';
import { auth } from './firebase/config';

export default function EssentialsScreen() {
    const router = useRouter();
    const [university, setUniversity] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSaveEssentials = async () => {
        if (!university || !location) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const db = getDatabase();
            const userId = auth.currentUser?.uid;

            if (!userId) {
                throw new Error('User not logged in');
            }

            // Save essentials to Firebase
            await set(ref(db, `users/${userId}/essentials`), {
                university,
                location,
            });

            Alert.alert('Success', 'Details saved!');
            router.replace('/personal-preferences'); // Navigate to home or next screen
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Could not save details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Now the essentials...</Text>

            <Text style={styles.label}>Choose your university</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter University"
                value={university}
                onChangeText={setUniversity}
            />

            <Text style={styles.label}>Where will you be moving to?</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Location"
                value={location}
                onChangeText={setLocation}
            />

            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSaveEssentials}
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
        backgroundColor: '#B69191',
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
