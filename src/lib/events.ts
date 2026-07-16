import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export type Event = {
    id: string;
    date: string;
    day: string;
    title: string;
    description: string;
    category?: string;
    location?: string;
    imageUrl?: string;
    featured: boolean;
};

export async function getAllEvents(): Promise<Event[]> {
    const querySnapshot = await getDocs(collection(db, 'events'));
    const events = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Event));
    // Sort by date, most recent first (assuming date is in a format that can be sorted, e.g., YYYY-MM-DD)
    events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return events;
}

export async function getEventById(id: string): Promise<Event | null> {
    const docRef = doc(db, 'events', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id } as Event;
    } else {
        return null;
    }
}
