// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore.js";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to record a boss victory
export async function recordBossVictory(bossName) {
    const bossRef = doc(db, "bossStats", bossName);

    try {
        const bossDoc = await getDoc(bossRef);

        if (bossDoc.exists()) {
            await updateDoc(bossRef, {
                kills: bossDoc.data().kills + 1
            });
        } else {
            await setDoc(bossRef, { kills: 1, losses: 0 });
        }

        console.log(`${bossName} victory recorded!`);
    } catch (error) {
        console.error("Error recording victory:", error);
    }
}

// Function to record a boss defeat
export async function recordBossDefeat(bossName) {
    const bossRef = doc(db, "bossStats", bossName);

    try {
        const bossDoc = await getDoc(bossRef);

        if (bossDoc.exists()) {
            await updateDoc(bossRef, {
                losses: bossDoc.data().losses + 1
            });
        } else {
            await setDoc(bossRef, { kills: 0, losses: 1 });
        }

        console.log(`${bossName} defeat recorded!`);
    } catch (error) {
        console.error("Error recording defeat:", error);
    }
}
