import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyABPv_I5rt48b0F2OM9PJt0IPH1QGOnq-A",
  authDomain: "clone-8ea9d.firebaseapp.com",
  projectId: "clone-8ea9d",
  storageBucket: "clone-8ea9d.appspot.com",
  messagingSenderId: "521740850796",
  appId: "1:521740850796:web:6a0995d60453f2d962aa49",
  measurementId: "G-YHSEQT5RDX"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;