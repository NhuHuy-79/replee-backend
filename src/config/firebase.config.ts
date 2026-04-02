import admin from "firebase-admin";

const initFirebase = () => {
  if (admin.apps.length > 0) return admin;

  const serviceAccountRaw = process.env.FIREBASE_SERVICE_ACCOUNT;

  // 1. Kiểm tra xem biến có tồn tại không
  if (!serviceAccountRaw) {
    console.error("❌ LỖI: Biến FIREBASE_SERVICE_ACCOUNT đang bị undefined!");
    return null;
  }

  try {
    // 2. Parse JSON
    const serviceAccount = JSON.parse(serviceAccountRaw);
    
    // 3. Xử lý dấu xuống dòng cho Private Key
    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }

    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error("❌ LỖI khi parse JSON hoặc Init Firebase:", error);
    return null;
  }
};

const firebaseAdmin = initFirebase();
export default firebaseAdmin;