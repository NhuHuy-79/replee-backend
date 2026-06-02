import admin from "firebase-admin";

const initFirebase = () => {
  if (admin.apps.length > 0) return admin;

  const serviceAccountRaw = process.env.FIREBASE_SERVICE_ACCOUNT;

  // 1. Kiểm tra xem biến có tồn tại không, throw lỗi nếu thiếu để dừng ứng dụng ngay lập tức
  if (!serviceAccountRaw) {
    throw new Error("FATAL ERROR: Environment variable FIREBASE_SERVICE_ACCOUNT is not defined.");
  }

  try {
    // 2. Phân tích chuỗi JSON
    const serviceAccount = JSON.parse(serviceAccountRaw);
    
    // 3. Xử lý dấu xuống dòng cho Private Key
    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }

    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    // Throw lỗi để ứng dụng dừng lại nếu config sai, giúp phát hiện lỗi sớm
    throw new Error(`FATAL ERROR: Failed to parse or initialize Firebase Admin SDK. ${error instanceof Error ? error.message : String(error)}`);
  }
};

const firebaseAdmin = initFirebase();
export default firebaseAdmin;