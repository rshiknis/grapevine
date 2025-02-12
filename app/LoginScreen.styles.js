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
        width:'100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: 'white',
    },
    button: {
        height: 56,
        width: '100%', 
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
        width: '100%'
    },
    backButtonText: {
        color: '#000',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    forgotPasswordContainer: {
        alignSelf: 'left',  // Align it to the right
        marginBottom: 12,
    },
    forgotPassword: {
        color: '#000',
        textDecorationLine: 'underline',
        fontSize: 14,
    },
    eyeIcon: {
        position: 'absolute',  // Place it inside the input field
        right: 12,             // Move it slightly away from the edge
        top: '40%',            // Center it vertically
        transform: [{ translateY: -10 }], // Adjust for better centering
    },
    eyeIconText: {
        fontSize: 18,          // Adjust size if it's too large or small
    },
    registerContainer: {
        flexDirection: 'row', // Ensure text stays on the same line
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8, // Adjust spacing
    },
    registerText: {
        color: '#000',
        fontSize: 14,
    },
    registerLink: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
        textDecorationLine: 'underline', // Underline "Register Now"
    },
});

export default styles;