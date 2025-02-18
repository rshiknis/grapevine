import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { getDatabase, ref, update } from 'firebase/database';
import { auth } from './firebase/config';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import cameraPic from "../assets/images/camera-png.png";

const SUGGESTED_INTERESTS = [
    'Music', 'Gaming', 'Reading', 'Cooking', 'Fitness', 
    'Photography', 'Travel', 'Art', 'Movies', 'Sports',
    'Technology', 'Fashion', 'Dance', 'Writing', 'Hiking',
    'Yoga', 'Programming', 'Pets', 'Food', 'Shopping'
];

export default function PersonalScreen() {
    const router = useRouter();
    const [interestInput, setInterestInput] = useState('');
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [image, setImage] = useState(null);
    
    // Roommate dropdown states
    const [roommateOpen, setRoommateOpen] = useState(false);
    const [roommate, setRoommate] = useState(null);
    const [roommates, setRoommates] = useState([
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
    ]);

    // Work status dropdown states
    const [workOpen, setWorkOpen] = useState(false);
    const [work, setWork] = useState(null);
    const [workOptions, setWorkOptions] = useState([
        { label: "Full-time", value: "full-time" },
        { label: "Part-time", value: "part-time" },
        { label: "Intern", value: "intern" },
        { label: "Student", value: "student" },
        { label: "Freelancer", value: "freelancer" },
        { label: "Not working", value: "not-working" },
    ]);

    const [loading, setLoading] = useState(false);

    const handleInterestInput = (text) => {
        setInterestInput(text);
        if (text.length > 0) {
            const suggestions = SUGGESTED_INTERESTS.filter(interest =>
                interest.toLowerCase().includes(text.toLowerCase()) &&
                !selectedInterests.includes(interest)
            );
            setFilteredSuggestions(suggestions);
            setShowSuggestions(true);
        } else {
            setFilteredSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const addInterest = (interest) => {
        if (!selectedInterests.includes(interest) && selectedInterests.length < 10) {
            setSelectedInterests([...selectedInterests, interest]);
            setInterestInput('');
            setFilteredSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const removeInterest = (interestToRemove) => {
        setSelectedInterests(selectedInterests.filter(
            interest => interest !== interestToRemove
        ));
    };
    const pickImage = async () => {
        // Request permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permission Denied", "We need access to your camera roll to upload an image.");
            return;
        }
    
        // Open image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1], // Ensures a square crop
            quality: 1,
        });
    
        if (!result.canceled) {
            setImage(result.assets[0].uri); // Store selected image URI
        }
    };

    const handleSavePersonalInfo = async () => {

        setLoading(true);
        try {
            const db = getDatabase();
            const userId = auth.currentUser?.uid;

            if (!userId) {
                throw new Error('User not logged in');
            }

            await update(ref(db, `users/${userId}`), {
                interests: selectedInterests,
                roommate,
                work
            });

            Alert.alert('Success', 'Personal details saved!');
            router.push('/discover');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Could not save details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
            <Text style={styles.title}>
                A bit more <Text style={styles.underline}>personal...</Text>
            </Text>
            <Text style={styles.subtitle}>
                Optional, but we recommend filling these out for a better experience
            </Text>
            <View style={styles.imagePickerContainer}>
                <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.filledImage} />
                    ) : (
                        <Image source={cameraPic} style={styles.cameraPic} />
                    )}
                </TouchableOpacity>
            </View>
        <View style={styles.centeredContainer}>
            <Text style={styles.choosePhotoText}>Choose photo</Text>
        </View>

            <Text style={styles.label}>Interests (Select up to 10)</Text>
            <TextInput
                style={styles.input}
                placeholder="Type to add interests"
                value={interestInput}
                onChangeText={handleInterestInput}
            />

            {showSuggestions && filteredSuggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                    {filteredSuggestions.map((suggestion) => (
                        <TouchableOpacity
                            key={suggestion}
                            style={styles.suggestionItem}
                            onPress={() => addInterest(suggestion)}
                        >
                            <Text>{suggestion}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <View style={styles.selectedInterestsContainer}>
                {selectedInterests.map((interest) => (
                    <TouchableOpacity
                        key={interest}
                        style={styles.interestTag}
                        onPress={() => removeInterest(interest)}
                    >
                        <Text style={styles.interestTagText}>{interest} ×</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.label}>Looking for a roommate?</Text>
            <DropDownPicker
                open={roommateOpen}
                value={roommate}
                items={roommates}
                setOpen={setRoommateOpen}
                setValue={setRoommate}
                setItems={setRoommates}
                placeholder="Select yes or no"
                containerStyle={styles.dropdownContainer}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownList}
                zIndex={2000}
            />

            <Text style={styles.label}>What will you do for work?</Text>
            <DropDownPicker
                open={workOpen}
                value={work}
                items={workOptions}
                setOpen={setWorkOpen}
                setValue={setWork}
                setItems={setWorkOptions}
                placeholder="Select work status"
                containerStyle={styles.dropdownContainer}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownList}
                zIndex={1000}
            />

            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSavePersonalInfo}
                disabled={loading}
            >
                <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Next'}</Text>
            </TouchableOpacity>
            </ScrollView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B69191',
        padding: 20,
        paddingTop: 50,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
        marginTop: 40,
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
        marginBottom: 8,
        backgroundColor: '#fff',
    },
    suggestionsContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    suggestionItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    selectedInterestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    interestTag: {
        backgroundColor: '#5E3A3A',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
    },
    interestTagText: {
        color: '#fff',
        fontSize: 14,
    },
    dropdownContainer: {
        marginBottom: 20,
    },
    dropdown: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
    },
    dropdownList: {
        backgroundColor: '#fff',
        maxHeight: 300,
        borderColor: '#ccc',
    },
    button: {
        height: 50,
        backgroundColor: '#5E3A3A',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 40,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imagePickerContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    imagePicker: {
        width: 120,
        height: 120,
        borderRadius: 60, // Keeps it circular
        backgroundColor: '#D9D9D9',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Ensures the image does not overflow
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    imageText: {
        fontSize: 14,
        color: '#000',
    },
    filledImage: {
        width: "100%",
        height: "100%",
        borderRadius: 60, // Keeps the circular shape when image is loaded
    },
    cameraPic: {
        width: 50,
        height: 50,
        tintColor: '#555',
        resizeMode: 'contain',
    },
    choosePhotoText: {
        fontSize: 14,
        textAlign: 'center',
        paddingBottom: 20,
        fontWeight:'600',
    }
});