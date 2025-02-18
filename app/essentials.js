import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Alert, 
    StyleSheet,
    FlatList,
    ActivityIndicator,
    SafeAreaView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { getDatabase, ref, set } from 'firebase/database';
import { auth } from './firebase/config';

export default function EssentialsScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [universities, setUniversities] = useState([]);
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const [locationQuery, setLocationQuery] = useState('');
    const [locationResults, setLocationResults] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);
    const [searchingLocation, setSearchingLocation] = useState(false);

    // University search debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery.length >= 3) {
                searchUniversities();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Location search debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (locationQuery.length >= 3) {
                searchLocations();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [locationQuery]);

    const searchUniversities = async () => {
        if (searchQuery.length < 3) return;
        
        setSearching(true);
        try {
            const response = await fetch(
                `http://universities.hipolabs.com/search?name=${encodeURIComponent(searchQuery)}`
            );
            const data = await response.json();
            setUniversities(data);
        } catch (error) {
            console.error('Error searching universities:', error);
            Alert.alert('Error', 'Failed to search universities');
        } finally {
            setSearching(false);
        }
    };

    const searchLocations = async () => {
        if (locationQuery.length < 3) return;
        
        setSearchingLocation(true);
        try {
            // Using OpenStreetMap Nominatim API (free, no API key required)
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationQuery)}&format=json&addressdetails=1&limit=5`,
                {
                    headers: {
                        'Accept-Language': 'en-US,en',
                        'User-Agent': 'YourAppName' // Replace with your app name
                    }
                }
            );
            const data = await response.json();
            
            // Format the location results
            const formattedResults = data.map(item => ({
                id: item.place_id,
                display_name: item.display_name,
                city: item.address.city || item.address.town || item.address.village,
                state: item.address.state,
                country: item.address.country,
                lat: item.lat,
                lon: item.lon
            }));
            
            setLocationResults(formattedResults);
        } catch (error) {
            console.error('Error searching locations:', error);
            Alert.alert('Error', 'Failed to search locations');
        } finally {
            setSearchingLocation(false);
        }
    };

    const handleSelectUniversity = (university) => {
        setSelectedUniversity(university);
        setSearchQuery(university.name);
        setUniversities([]);
    };

    const handleSelectLocation = (location) => {
        setSelectedLocation(location);
        setLocationQuery(location.display_name);
        setLocationResults([]);
    };

    const handleSaveEssentials = async () => {
        if (!selectedUniversity || !selectedLocation) {
            Alert.alert('Error', 'Please select both university and location');
            return;
        }

        setLoading(true);
        try {
            const db = getDatabase();
            const userId = auth.currentUser?.uid;

            if (!userId) {
                throw new Error('User not logged in');
            }

            await set(ref(db, `users/${userId}/essentials`), {
                university: selectedUniversity.name,
                universityCountry: selectedUniversity.country,
                location: {
                    fullAddress: selectedLocation.display_name,
                    city: selectedLocation.city,
                    state: selectedLocation.state,
                    country: selectedLocation.country,
                    coordinates: {
                        latitude: selectedLocation.lat,
                        longitude: selectedLocation.lon
                    }
                },
                timestamp: Date.now()
            });

            Alert.alert('Success', 'Details saved!');
            router.replace('/personal-preferences');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Could not save details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderUniversity = ({ item }) => (
        <TouchableOpacity 
            style={styles.searchItem}
            onPress={() => handleSelectUniversity(item)}
        >
            <Text style={styles.primaryText}>{item.name}</Text>
            <Text style={styles.secondaryText}>{item.country}</Text>
        </TouchableOpacity>
    );

    const renderLocation = ({ item }) => (
        <TouchableOpacity 
            style={styles.searchItem}
            onPress={() => handleSelectLocation(item)}
        >
            <Text style={styles.primaryText}>
                {item.city || item.state || item.country}
            </Text>
            <Text style={styles.secondaryText} numberOfLines={2}>
                {item.display_name}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Now the essentials...</Text>

                <Text style={styles.label}>Choose your university</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Search for your university"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                
                {searching && (
                    <ActivityIndicator style={styles.searchingIndicator} />
                )}

                {universities.length > 0 && (
                    <FlatList
                        data={universities}
                        renderItem={renderUniversity}
                        keyExtractor={(item, index) => `${item.name}-${index}`}
                        style={styles.searchResults}
                    />
                )}

                <Text style={styles.label}>Where will you be moving to?</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Search for a location"
                    value={locationQuery}
                    onChangeText={setLocationQuery}
                />

                {searchingLocation && (
                    <ActivityIndicator style={styles.searchingIndicator} />
                )}

                {locationResults.length > 0 && (
                    <FlatList
                        data={locationResults}
                        renderItem={renderLocation}
                        keyExtractor={(item) => item.id.toString()}
                        style={styles.searchResults}
                    />
                )}

                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleSaveEssentials}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Saving...' : 'Next'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#B69191',
    },
    container: {
        flex: 1,
        backgroundColor: '#B69191',
        padding: 20,
        paddingTop: 60,
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
    searchResults: {
        maxHeight: 200,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
    },
    searchItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    primaryText: {
        fontSize: 16,
        fontWeight: '500',
    },
    secondaryText: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    searchingIndicator: {
        marginVertical: 10,
    }
});