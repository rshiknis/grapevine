import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Pressable,
} from 'react-native';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>Welcome to{'\n'}Grapevine!</Text>

            {/* Login Form */}
            <View style={styles.formContainer}>
                <Text style={styles.sectionTitle}>Login</Text>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        placeholderTextColor="#fff"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#fff"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}
                    >
                        <Text style={{ color: '#fff' }}>
                            {showPassword ? '🙈' : '👁️'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Forgot Password */}
                <Pressable>
                    <Text style={styles.forgotPassword}>Forgot password?</Text>
                </Pressable>

                {/* Login Button */}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                {/* Register Link */}
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>
                        Not a member?{' '}
                    </Text>
                    <Pressable>
                        <Text style={styles.registerLink}>Register now</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B48C8C', // Unified background color
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 40,
    },
    formContainer: {
        padding: 20,
        borderRadius: 12,
    },
    sectionTitle: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 20,
    },
    inputContainer: {
        backgroundColor: '#B48C8C', // Unified text box color
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#fff',
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#fff',
    },
    eyeIcon: {
        padding: 5,
    },
    forgotPassword: {
        color: '#fff',
        textAlign: 'right',
        fontSize: 14,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#B48C8C', // Unified button color
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fff',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    registerText: {
        color: '#fff',
        fontSize: 14,
    },
    registerLink: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});
