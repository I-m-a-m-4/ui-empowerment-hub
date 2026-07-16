
'use server';

import { doc, increment, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export const trackClick = async (eventName: string) => {
  if (!eventName) return;

  try {
    const analyticsRef = doc(db, 'analytics', 'button_clicks');
    await setDoc(analyticsRef, {
      [eventName]: increment(1)
    }, { merge: true });
  } catch (error) {
    console.error("Error tracking click: ", error);
    // Fail silently so we don't interrupt the user experience
  }
};
