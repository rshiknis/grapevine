import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B69191',
        paddingHorizontal: 24,
        justifyContent: 'center',
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
        marginBottom: 20,
    },
    input: {
        height: 56,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: 'white',
    },
    button: {
        height: 56,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 16,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    backButton: {
        alignItems: 'center',
    },
    backButtonText: {
        color: '#000',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    // ... rest of your styles from previous implementation
});

export default styles;