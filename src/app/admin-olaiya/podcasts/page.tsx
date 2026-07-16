
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import PodcastEditor from '../PodcastEditor';
import { type Podcast } from '@/lib/podcasts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Mic, Loader2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { collection, deleteDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const AdminPodcastsPage = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPodcast, setEditingPodcast] = useState<Podcast | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { toast } = useToast();

  const fetchPodcasts = async () => {
    setLoading(true);
    const podcastsRef = collection(db, 'podcasts');
    const q = query(podcastsRef, orderBy('releaseDate', 'desc'));
    const querySnapshot = await getDocs(q);
    const podcastsData = querySnapshot.docs.map(doc => ({ ...doc.data(), slug: doc.id } as Podcast));
    setPodcasts(podcastsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const handleEdit = (podcast: Podcast) => {
    setEditingPodcast(podcast);
    setIsEditorOpen(true);
  };

  const handleAddNew = () => {
    setEditingPodcast(null);
    setIsEditorOpen(true);
  };
  
  const handleDelete = async (slug: string) => {
     try {
      await deleteDoc(doc(db, 'podcasts', slug));
      toast({ title: 'Success', description: 'Keynote session deleted successfully.' });
      fetchPodcasts();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete keynote session.', variant: 'destructive' });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Keynote Sessions</h1>
        <Button onClick={handleAddNew}><Plus className="mr-2 h-4 w-4" /> Add New Session</Button>
      </div>

       {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : podcasts.length === 0 ? (
        <div className="text-center py-20 bg-muted/50 rounded-lg border-2 border-dashed">
            <Mic className="mx-auto h-16 w-16 text-muted-foreground" />
            <h2 className="mt-6 text-xl font-semibold">No Keynote Sessions Found</h2>
            <p className="mt-2 text-muted-foreground">Get started by adding your first keynote audio session.</p>
            <Button onClick={handleAddNew} className="mt-6">
                <Plus className="mr-2 h-4 w-4" /> Add Session
            </Button>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {podcasts.map(podcast => (
            <Card key={podcast.slug}>
              <div className="relative aspect-square">
                 <Image src={podcast.imageUrl} alt={podcast.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="truncate">{podcast.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{podcast.artist}</p>
                <p className="text-sm text-muted-foreground">{podcast.duration} - {podcast.year}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="icon" onClick={() => handleEdit(podcast)}><Edit className='h-4 w-4' /></Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button variant="destructive" size="icon"><Trash2 className='h-4 w-4' /></Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>This will permanently delete the keynote session.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(podcast.slug)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          )
        )}
      </div>
      )}
      
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingPodcast ? 'Edit Keynote Session' : 'Add New Keynote Session'}</DialogTitle>
            <DialogDescription>{editingPodcast ? 'Update keynote session details.' : 'Add a new keynote session.'}</DialogDescription>
          </DialogHeader>
          <PodcastEditor podcast={editingPodcast} onSave={() => { setIsEditorOpen(false); fetchPodcasts(); }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPodcastsPage;
