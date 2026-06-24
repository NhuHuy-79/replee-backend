import admin from "firebase-admin";

const initFirebase = () => {
  if (admin.apps.length > 0) return admin;

  const serviceAccountRaw = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (!serviceAccountRaw) {
    throw new Error("FATAL ERROR: Environment variable FIREBASE_SERVICE_ACCOUNT is not defined.");
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountRaw);
    
    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }

    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    throw new Error(`FATAL ERROR: Failed to parse or initialize Firebase Admin SDK. ${error instanceof Error ? error.message : String(error)}`);
  }
};

const firebaseAdmin = initFirebase();
export default firebaseAdmin;