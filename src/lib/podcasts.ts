
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export type Podcast = {
    id: number;
    slug: string;
    title: string;
    artist: string;
    album: string;
    year: string;
    duration: string;
    plays: string;
    rating: string;
    imageId: string; // This is now unused.
    imageUrl: string;
    audioSrc: string;
    artistAvatar: string;
    tags: { name: string; color: string }[];
    releaseDate: string;
    waveform: number[];
};

export async function getAllPodcasts(): Promise<Podcast[]> {
    const querySnapshot = await getDocs(collection(db, 'podcasts'));
    const podcasts = querySnapshot.docs.map(doc => ({ ...doc.data(), slug: doc.id } as Podcast));
    // Sort by date, most recent first
    podcasts.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    return podcasts;
}

export async function getPodcastBySlug(slug: string): Promise<Podcast | undefined> {
    const docRef = doc(db, 'podcasts', slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { ...docSnap.data(), slug: docSnap.id } as Podcast;
    } else {
        return undefined;
    }
}
