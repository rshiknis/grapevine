import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}
                    >
                        <Text style={styles.eyeIconText}>
                            {showPassword ? '👁️' : '👁️'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <Pressable style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPassword}>Forgot password?</Text>
                </Pressable>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Not a member?</Text>
                    <Pressable onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.registerLink}> Register now</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B69191',
        paddingHorizontal: 24,
    },
    titleContainer: {
        marginTop: '20%',
        marginBottom: 40,
    },
    title: {
        fontSize: 34,
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',
        lineHeight: 41,
    },
    formContainer: {
        width: '100%',
    },
    sectionTitle: {
        fontSize: 24,
        color: '#000',
        marginBottom: 24,
        fontWeight: '400',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        height: 56,
    },
    input: {
        flex: 1,
        paddingHorizontal: 16,
        fontSize: 17,
        color: '#000',
        height: '100%',
    },
    eyeIcon: {
        padding: 12,
        marginRight: 4,
    },
    eyeIconText: {
        fontSize: 20,
        opacity: 0.7,
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    forgotPassword: {
        color: '#000',
        fontSize: 15,
    },
    button: {
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 24,
    },
    buttonText: {
        color: '#000',
        fontSize: 17,
        fontWeight: '500',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerText: {
        color: '#000',
        fontSize: 15,
    },
    registerLink: {
        color: 'blue',
        fontSize: 15,
        textDecorationLine: 'underline',
    },
});