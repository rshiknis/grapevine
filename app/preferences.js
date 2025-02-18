import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { getDatabase, ref, set } from 'firebase/database';
import { auth } from './firebase/config';
import DropDownPicker from "react-native-dropdown-picker";

export default function PreferencesScreen() {
    const router = useRouter();
    const [age, setAge] = useState('');
    const [gender, setGender] = useState(null);
    const [otherGender, setOtherGender] = useState("");
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const [genderOpen, setGenderOpen] = useState(false);
    const [genders, setGenders] = useState([
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Prefer not to say", value: "prefer-not" },
        { label: "Other", value: "other" },
    ]);

    // Function to format phone number while typing
    const formatPhoneNumber = (input) => {
        let cleaned = input.replace(/\D/g, ""); // Remove non-numeric characters
        let formatted = "";

        if (cleaned.length > 0) formatted = `(${cleaned.substring(0, 3)}`;
        if (cleaned.length > 3) formatted += `) ${cleaned.substring(3, 6)}`;
        if (cleaned.length > 6) formatted += `-${cleaned.substring(6, 10)}`;

        return formatted;
    };

    const handlePhoneChange = (input) => {
        setPhone(formatPhoneNumber(input));
    };

    const handleSavePreferences = async () => {
        if (!age || !gender || !phone) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (parseInt(age) < 18) {
            Alert.alert('Error', 'Must be at least 18 years old to use!');
            return;
        }
        if (phone.replace(/\D/g, "").length !== 10) { // Check if phone number has exactly 10 digits
            Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
            return;
        }

        setLoading(true);
        try {
            const db = getDatabase();
            const userId = auth.currentUser?.uid;

            if (!userId) {
                throw new Error('User not logged in');
            }

            const finalGender = gender === "other" ? otherGender : gender;

            await set(ref(db, `users/${userId}/preferences`), {
                age,
                gender: finalGender,
                phone,
            });

            Alert.alert('Success', 'Preferences saved!');
            router.push('/essentials');
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

            {/* Age Input */}
            <Text style={styles.label}>Choose your age</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your age"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
            />

            {/* Gender Dropdown */}
            <Text style={styles.label}>Select your gender</Text>
            <DropDownPicker
                open={genderOpen}
                value={gender}
                items={genders}
                setOpen={setGenderOpen}
                setValue={setGender}
                setItems={setGenders}
                placeholder="Select your gender"
                containerStyle={{ marginBottom: 20 }}
                style={styles.dropdown}
                dropDownContainerStyle={{ backgroundColor: "#fff", maxHeight: 300 }}
            />

            {/* If "Other" is selected, show an input box */}
            {gender === "other" && (
                <TextInput
                    style={styles.input}
                    placeholder="Please specify your gender if you feel comfortable"
                    value={otherGender}
                    onChangeText={setOtherGender}
                />
            )}

            {/* Phone Number Input */}
            <Text style={styles.label}>Your phone number</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={handlePhoneChange} // Apply formatting
                maxLength={14} // Max length for formatted (123) 456-7890
            />

            {/* Next Button */}
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
    dropdown: {
        backgroundColor: "#fff",
        borderRadius: 5,
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
