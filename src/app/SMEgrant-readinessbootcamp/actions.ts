'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { SurveyAnswers } from './types';

export async function submitSurvey(data: SurveyAnswers) {
  try {
    await addDoc(collection(db, 'smeGrantBootcampRegistrations'), {
      ...data,
      submittedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error writing document: ", error);
    return { success: false, error: error.message };
  }
}
