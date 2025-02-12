import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

// Function to generate random names
const generateRandomNames = (count) => {
    const sampleNames = ["Pablo", "Quentin", "Selena", "Prabhu", "Taire", "Liam", "Ava", "Noah", "Emma", "Oliver", "Sophia"];
    let randomNames = [];
    for (let i = 0; i < count; i++) {
        const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
        randomNames.push({ id: i.toString(), name: randomName });
    }
    return randomNames;
};

export default function DiscoverScreen() {
    const router = useRouter();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(generateRandomNames(10)); // Generate 10 random names
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.userCard} onPress={() => router.push(`/profile/${item.id}`)}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.arrow}>➜</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Start discovering...</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterText}>⚙️ Filter</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity><Text style={styles.navIcon}>👤</Text></TouchableOpacity>
                <TouchableOpacity><Text style={styles.navIcon}>🏠</Text></TouchableOpacity>
                <TouchableOpacity><Text style={styles.navIcon}>💬</Text></TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B69191',
        paddingHorizontal: 20,
        paddingTop: 60, // Lowered the title position
    },
    header: {
        marginBottom: 20, // Added space before the list starts
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    filterButton: {
        alignSelf: 'flex-start',
        marginBottom: 10,
        padding: 8,
        borderRadius: 5,
    },
    filterText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    list: {
        paddingBottom: 80,
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D9A5A5',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    arrow: {
        fontSize: 20,
    },
    bottomNav: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    navIcon: {
        fontSize: 24,
    },
});
