import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter properly
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase/config'; // Import Firebase auth instance
import styles from './LoginScreen.styles';
import { Pressable } from 'react-native';


export default function SignUp() {
    const router = useRouter(); // Proper router usage
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert('Sign Up', 'Please fill all the fields!');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Sign Up', 'Passwords do not match!');
            return;
        }

        setLoading(true);

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Success', 'Account created successfully!');
            router.replace('/preferences'); // Navigate to home screen
        } catch (error) {
            console.log(error)
            let errorMessage = 'An error occurred';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Email is already in use';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password should be at least 6 characters';
            }
            Alert.alert('Sign Up Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create an Account</Text>

            <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="rgba(0, 0, 0, 0.5)"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity 
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#000" />
                ) : (
                    <Text style={styles.buttonText}>Register</Text>
                )}
            </TouchableOpacity>

            <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Already a member?</Text>
                    <Pressable 
                        onPress={() => router.push('/login')}
                        disabled={loading}
                    >
                        <Text style={styles.registerLink}> Sign In Now!</Text>
                    </Pressable>
                </View>

        </View>
    );
}
