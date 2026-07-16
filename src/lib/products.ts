
import { collection, getDocs, doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export type Product = {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number; // in cents
    imageUrl: string;
    downloadUrl?: string; // Optional download URL for free products
    createdAt?: string; // Add this to hold the serialized timestamp
};

export async function getAllProducts(): Promise<Product[]> {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const createdAt = data.createdAt;

        // Convert Firestore Timestamp to a serializable format
        let serializableCreatedAt = null;
        if (createdAt instanceof Timestamp) {
            serializableCreatedAt = createdAt.toDate().toISOString();
        } else if (createdAt && typeof createdAt.toDate === 'function') { // Handle cases where it might be a different timestamp-like object
            serializableCreatedAt = createdAt.toDate().toISOString();
        }

        return {
            ...data,
            id: doc.id,
            slug: doc.id,
            createdAt: serializableCreatedAt,
        } as Product
    });
    return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    const docRef = doc(db, 'products', slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        const createdAt = data.createdAt;

        let serializableCreatedAt = null;
        if (createdAt instanceof Timestamp) {
            serializableCreatedAt = createdAt.toDate().toISOString();
        } else if (createdAt && typeof createdAt.toDate === 'function') {
            serializableCreatedAt = createdAt.toDate().toISOString();
        }
        
        return { 
            ...data, 
            id: docSnap.id, 
            slug: docSnap.id,
            createdAt: serializableCreatedAt 
        } as Product;
    } else {
        return null;
    }
}

    