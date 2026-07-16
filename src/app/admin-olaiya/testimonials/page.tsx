'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import TestimonialEditor, { type Testimonial } from '../TestimonialEditor';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Star, Loader2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const AdminTestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { toast } = useToast();

  const fetchTestimonials = async () => {
    setLoading(true);
    const testimonialsRef = collection(db, 'testimonials');
    const q = query(testimonialsRef, orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    const testimonialsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Testimonial));
    setTestimonials(testimonialsData);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setIsEditorOpen(true);
  };

  const handleAddNew = () => {
    setEditingTestimonial(null);
    setIsEditorOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'testimonials', id));
      toast({ title: 'Success', description: 'Testimonial deleted successfully.' });
      fetchTestimonials();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete testimonial.', variant: 'destructive' });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Testimonials</h1>
        <Button onClick={handleAddNew}><Plus className="mr-2 h-4 w-4" /> Add New Testimonial</Button>
      </div>

       {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-20 bg-muted/50 rounded-lg border-2 border-dashed">
            <Star className="mx-auto h-16 w-16 text-muted-foreground" />
            <h2 className="mt-6 text-xl font-semibold">No Testimonials Found</h2>
            <p className="mt-2 text-muted-foreground">Get started by adding your first client testimonial.</p>
            <Button onClick={handleAddNew} className="mt-6">
                <Plus className="mr-2 h-4 w-4" /> Add Testimonial
            </Button>
        </div>
      ) : (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map(testimonial => (
            <Card key={testimonial.id}>
              <CardHeader>
                <CardTitle>{testimonial.name}</CardTitle>
                <CardDescription>{testimonial.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-4">“{testimonial.quote}”</p>
                <p className="text-sm text-muted-foreground mt-4">Order: {testimonial.order}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="icon" onClick={() => handleEdit(testimonial)}><Edit className='h-4 w-4' /></Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button variant="destructive" size="icon"><Trash2 className='h-4 w-4' /></Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>This will permanently delete this testimonial.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(testimonial.id!)}>Delete</AlertDialogAction>
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
            <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
            <DialogDescription>
                {editingTestimonial ? 'Make changes to an existing testimonial.' : 'Create a new testimonial to display.'}
            </DialogDescription>
          </DialogHeader>
          <TestimonialEditor testimonial={editingTestimonial} onSave={() => { setIsEditorOpen(false); fetchTestimonials(); }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTestimonialsPage;
