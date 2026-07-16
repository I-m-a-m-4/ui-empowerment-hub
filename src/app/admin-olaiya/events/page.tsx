'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import EventEditor from '../EventEditor';
import { type Event } from '@/lib/events';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Calendar, Loader2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

const AdminEventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { toast } = useToast();

  const fetchEvents = async () => {
    setLoading(true);
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    const eventsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Event));
    setEvents(eventsData);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsEditorOpen(true);
  };

  const handleAddNew = () => {
    setEditingEvent(null);
    setIsEditorOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'events', id));
      toast({ title: 'Success', description: 'Event deleted successfully.' });
      fetchEvents();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete event.', variant: 'destructive' });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Events</h1>
        <Button onClick={handleAddNew}><Plus className="mr-2 h-4 w-4" /> Add New Event</Button>
      </div>
      
      {loading ? (
         <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-20 bg-muted/50 rounded-lg border-2 border-dashed">
            <Calendar className="mx-auto h-16 w-16 text-muted-foreground" />
            <h2 className="mt-6 text-xl font-semibold">No Events Found</h2>
            <p className="mt-2 text-muted-foreground">Get started by creating your first event.</p>
            <Button onClick={handleAddNew} className="mt-6">
                <Plus className="mr-2 h-4 w-4" /> Create Event
            </Button>
        </div>
      ) : (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map(event => (
            <Card key={event.id} className="flex flex-col">
              {event.imageUrl && (
                <div className="relative aspect-video">
                  <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
                </div>
              )}
              <CardHeader>
                <CardTitle className="truncate">{event.title}</CardTitle>
                <CardDescription>{new Date(event.date).toLocaleDateString('en-US', { dateStyle: 'long' })}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">{event.description}</p>
                {event.featured && <div className="mt-2 text-xs font-bold text-primary">FEATURED</div>}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="icon" onClick={() => handleEdit(event)}><Edit className='h-4 w-4' /></Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button variant="destructive" size="icon"><Trash2 className='h-4 w-4' /></Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>This will permanently delete the event.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(event.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
        ))}
      </div>
      )}
      
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
            <DialogDescription>{editingEvent ? 'Make changes to your existing event.' : 'Create a new event.'}</DialogDescription>
          </DialogHeader>
          <EventEditor event={editingEvent} onSave={() => { setIsEditorOpen(false); fetchEvents(); }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEventsPage;
