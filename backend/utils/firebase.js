import admin from 'firebase-admin';
const serviceAccount = ('../config/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default adminfirebase;