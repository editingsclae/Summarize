import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer, setDoc, serverTimestamp, collection, getDocs, deleteDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { StructuredSummary } from '../types/summary';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore with specific database ID (CRITICAL)
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Operation types for Firestore error logging
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection test
export async function testConnection(): Promise<void> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}

// Sign in with Google Popup
export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // Sync user profile to Firestore
  if (user) {
    const userDocPath = `users/${user.uid}`;
    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          id: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (error) {
      console.warn('Could not sync user profile to Firestore:', error);
    }
  }

  return user;
}

// Sign out
export async function logOut(): Promise<void> {
  await signOut(auth);
}

// Save summary to user's Firestore subcollection
export async function saveSummaryToCloud(
  userId: string,
  summary: StructuredSummary,
  isBookmarked: boolean = false
): Promise<void> {
  if (!userId || userId.startsWith('guest_') || !auth.currentUser) {
    return;
  }
  const summaryId = summary.video.id;
  const docPath = `users/${userId}/summaries/${summaryId}`;
  
  try {
    await setDoc(
      doc(db, 'users', userId, 'summaries', summaryId),
      {
        id: summaryId,
        userId,
        videoId: summary.video.id,
        videoTitle: summary.video.title,
        videoChannel: summary.video.channel || '',
        videoThumbnail: summary.video.thumbnail || '',
        tldr: summary.tldr || '',
        language: summary.language || 'en',
        summaryLength: summary.summaryLength || 'detailed',
        style: summary.style || 'professional',
        summaryData: JSON.stringify(summary),
        isBookmarked,
        createdAt: serverTimestamp(),
        ...(isBookmarked ? { bookmarkedAt: serverTimestamp() } : {}),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

// Toggle bookmark for a summary in user's Firestore subcollection
export async function toggleBookmarkInCloud(
  userId: string,
  summary: StructuredSummary,
  isBookmarked: boolean
): Promise<void> {
  if (!userId || userId.startsWith('guest_') || !auth.currentUser) {
    return;
  }
  const summaryId = summary.video.id;
  const docPath = `users/${userId}/summaries/${summaryId}`;

  try {
    await setDoc(
      doc(db, 'users', userId, 'summaries', summaryId),
      {
        id: summaryId,
        userId,
        videoId: summary.video.id,
        videoTitle: summary.video.title,
        videoChannel: summary.video.channel || '',
        videoThumbnail: summary.video.thumbnail || '',
        tldr: summary.tldr || '',
        language: summary.language || 'en',
        summaryLength: summary.summaryLength || 'detailed',
        style: summary.style || 'professional',
        summaryData: JSON.stringify(summary),
        isBookmarked,
        bookmarkedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

// Fetch all summaries and bookmarked IDs from Firestore
export async function fetchUserCloudData(userId: string): Promise<{
  summaries: StructuredSummary[];
  bookmarkedIds: string[];
}> {
  if (!userId || userId.startsWith('guest_') || !auth.currentUser) {
    return { summaries: [], bookmarkedIds: [] };
  }
  const collPath = `users/${userId}/summaries`;
  try {
    const snap = await getDocs(collection(db, 'users', userId, 'summaries'));
    const summaries: StructuredSummary[] = [];
    const bookmarkedIds: string[] = [];

    snap.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.summaryData) {
        try {
          const parsed = JSON.parse(data.summaryData) as StructuredSummary;
          summaries.push(parsed);
          if (data.isBookmarked === true) {
            bookmarkedIds.push(parsed.video.id);
          }
        } catch (e) {
          console.warn('Failed to parse saved summary:', e);
        }
      }
    });

    return { summaries, bookmarkedIds };
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, collPath);
  }
}

// Fetch user's saved summaries from Firestore
export async function fetchUserSummariesFromCloud(userId: string): Promise<StructuredSummary[]> {
  if (!userId || userId.startsWith('guest_') || !auth.currentUser) {
    return [];
  }
  const collPath = `users/${userId}/summaries`;
  try {
    const snap = await getDocs(collection(db, 'users', userId, 'summaries'));
    const list: StructuredSummary[] = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.summaryData) {
        try {
          const parsed = JSON.parse(data.summaryData);
          list.push(parsed);
        } catch (e) {
          console.warn('Failed to parse saved summary:', e);
        }
      }
    });
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, collPath);
  }
}

// Delete a saved summary from Firestore
export async function deleteSummaryFromCloud(userId: string, summaryId: string): Promise<void> {
  if (!userId || userId.startsWith('guest_') || !auth.currentUser) {
    return;
  }
  const docPath = `users/${userId}/summaries/${summaryId}`;
  try {
    await deleteDoc(doc(db, 'users', userId, 'summaries', summaryId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, docPath);
  }
}
