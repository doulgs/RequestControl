import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type OrderFirebaseDTO = {
  patrimony: string;
  description: string;
  status: "open" | "closed";
  solution?: string;
  create_at: FirebaseFirestoreTypes.Timestamp;
  closed_at: FirebaseFirestoreTypes.Timestamp;
};
