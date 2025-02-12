import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    Alert,
    ActivityIndicator
} from 'react-native';
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase/config'; // Import Firebase auth instance
import styles from './LoginScreen.styles';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.replace('/preferences'); // Navigate to home after login
        } catch (error) {
            console.log(error);
            let errorMessage = 'An error occurred';
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email';
            } else if (error.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid password';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address';
            }
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Welcome to{'\n'}Grapevine!</Text>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.sectionTitle}>Login</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        editable={!loading}
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                        editable={!loading}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}
                        disabled={loading}
                    >
                        <Text style={styles.eyeIconText}>👁️</Text>
                    </TouchableOpacity>
                </View>

                <Pressable 
                    style={styles.forgotPasswordContainer}
                    disabled={loading}
                >
                    <Text style={styles.forgotPassword}>Forgot password?</Text>
                </Pressable>

                <TouchableOpacity 
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Not a member?</Text>
                    <Pressable 
                        onPress={() => router.push('/register')}
                        disabled={loading}
                    >
                        <Text style={styles.registerLink}> Register now</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
