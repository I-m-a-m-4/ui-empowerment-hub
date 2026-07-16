
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import PostEditor from '../PostEditor';
import { type BlogPost } from '@/lib/blog-posts';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, FileText, Loader2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const AdminPostsPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { toast } = useToast();

  const fetchPosts = async () => {
    setLoading(true);
    const postsRef = collection(db, 'blogPosts');
    const q = query(postsRef, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    const postsData = querySnapshot.docs.map(doc => ({ ...doc.data(), slug: doc.id } as BlogPost));
    setPosts(postsData);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsEditorOpen(true);
  };

  const handleAddNew = () => {
    setEditingPost(null);
    setIsEditorOpen(true);
  };

  const handleDelete = async (slug: string) => {
    try {
      await deleteDoc(doc(db, 'blogPosts', slug));
      toast({ title: 'Success', description: 'Blog post deleted successfully.' });
      fetchPosts();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete post.', variant: 'destructive' });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
        <Button onClick={handleAddNew}><Plus className="mr-2 h-4 w-4" /> Add New Post</Button>
      </div>
      
      {loading ? (
         <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 bg-muted/50 rounded-lg border-2 border-dashed">
            <FileText className="mx-auto h-16 w-16 text-muted-foreground" />
            <h2 className="mt-6 text-xl font-semibold">No Blog Posts Found</h2>
            <p className="mt-2 text-muted-foreground">Get started by creating your first blog post.</p>
            <Button onClick={handleAddNew} className="mt-6">
                <Plus className="mr-2 h-4 w-4" /> Create Post
            </Button>
        </div>
      ) : (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map(post => (
            <Card key={post.slug} className="flex flex-col">
              <div className="relative aspect-video">
                <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="truncate">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{post.author}</p>
                <p className="text-sm text-muted-foreground">{post.date}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="icon" onClick={() => handleEdit(post)}><Edit className='h-4 w-4' /></Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button variant="destructive" size="icon"><Trash2 className='h-4 w-4' /></Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>This will permanently delete the post.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(post.slug)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
        ))}
      </div>
      )}
      
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>{editingPost ? 'Edit Post' : 'Add New Post'}</DialogTitle>
            <DialogDescription>{editingPost ? 'Make changes to your existing blog post.' : 'Create a new blog post.'}</DialogDescription>
          </DialogHeader>
          <PostEditor post={editingPost} onSave={() => { setIsEditorOpen(false); fetchPosts(); }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPostsPage;
