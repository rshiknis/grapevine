import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { auth } from './firebaseConfig'; 
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function RegisterScreen() {
    const navigation = useNavigation(); // ✅ Navigation now works correctly

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password should be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });

            Alert.alert('Success', 'Account created successfully!', [
                { text: 'OK', onPress: () => navigation.navigate('Login') } // ✅ Correct navigation
            ]);
        } catch (error) {
            let errorMessage = 'An error occurred';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already registered';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password is too weak';
            }
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                editable={!loading}
            />
            <TextInput
                style={styles.input}
                placeholder="Email Address"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                editable={!loading}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                editable={!loading}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                editable={!loading}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Create Account</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} disabled={loading}>
                <Text style={styles.link}>Back to Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#B69191', paddingHorizontal: 24, justifyContent: 'center' },
    title: { fontSize: 34, fontWeight: '600', color: '#000', textAlign: 'center', marginBottom: 20 },
    input: { height: 56, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, marginBottom: 16, backgroundColor: 'white' },
    button: { height: 56, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginBottom: 16 },
    buttonText: { color: '#fff', fontSize: 16 },
    link: { textAlign: 'center', color: 'blue', textDecorationLine: 'underline' },
});
