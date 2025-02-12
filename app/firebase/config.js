// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCwpX_gy_x8xPtoBB418Y0lsL8XcuSIMOE",
  authDomain: "grapevine-71a7c.firebaseapp.com",
  projectId: "grapevine-71a7c",
  storageBucket: "grapevine-71a7c.firebasestorage.app",
  messagingSenderId: "808409879489",
  appId: "1:808409879489:web:29a8dd0435f630ec319540"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app; // Add default export for Expo Router