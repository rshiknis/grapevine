import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { getDatabase, ref, update } from 'firebase/database';
import { auth } from './firebase/config';

export default function PersonalScreen() {
    const router = useRouter();
    const [interests, setInterests] = useState('');
    const [roommate, setRoommate] = useState('');
    const [work, setWork] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSavePersonalInfo = async () => {
        if (!interests || !roommate || !work) {
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

            // Save personal details to Firebase
            await update(ref(db, `users/${userId}`), {
                interests,
                roommate,
                work
            });

            Alert.alert('Success', 'Personal details saved!');
            router.push('/discover'); // Navigate to the discover page
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Could not save details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                A bit more <Text style={styles.underline}>personal...</Text>
            </Text>
            <Text style={styles.subtitle}>
                Optional, but we recommend filling these out for a better experience
            </Text>

            <Text style={styles.label}>Interests</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Interests (e.g., Music, Gaming)"
                value={interests}
                onChangeText={setInterests}
            />

            <Text style={styles.label}>Looking for a roommate?</Text>
            <TextInput
                style={styles.input}
                placeholder="Yes or No"
                value={roommate}
                onChangeText={setRoommate}
            />

            <Text style={styles.label}>What will you do for work?</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter job type (e.g., Full-time, Part-time)"
                value={work}
                onChangeText={setWork}
            />

            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSavePersonalInfo}
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
        marginBottom: 5,
    },
    underline: {
        textDecorationLine: 'underline',
    },
    subtitle: {
        fontSize: 14,
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
