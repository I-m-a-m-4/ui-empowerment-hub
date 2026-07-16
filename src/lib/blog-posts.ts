import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export type BlogPost = {
    slug: string;
    title: string;
    description: string;
    imageId: string; // This is now unused, but kept for schema compatibility if needed.
    imageUrl: string;
    author: string;
    date: string;
    content: string;
};

export async function getAllPosts(): Promise<BlogPost[]> {
    const querySnapshot = await getDocs(collection(db, 'blogPosts'));
    const posts = querySnapshot.docs.map(doc => ({ ...doc.data(), slug: doc.id } as BlogPost));
    // Sort by date, most recent first
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const docRef = doc(db, 'blogPosts', slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { ...docSnap.data(), slug: docSnap.id } as BlogPost;
    } else {
        return null;
    }
}
