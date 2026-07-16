
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ProductEditor from '../ProductEditor';
import { type Product } from '@/lib/products';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, ShoppingBag, Loader2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { toast } = useToast();

  const fetchProducts = async () => {
    setLoading(true);
    const productsRef = collection(db, 'products');
    const q = query(productsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const productsData = querySnapshot.docs.map(doc => ({ ...doc.data(), slug: doc.id } as Product));
    setProducts(productsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsEditorOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsEditorOpen(true);
  };

  const handleDelete = async (slug: string) => {
    try {
      await deleteDoc(doc(db, 'products', slug));
      toast({ title: 'Success', description: 'Product deleted successfully.' });
      fetchProducts();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete product.', variant: 'destructive' });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Button onClick={handleAddNew}><Plus className="mr-2 h-4 w-4" /> Add New Product</Button>
      </div>

       {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-muted/50 rounded-lg border-2 border-dashed">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
            <h2 className="mt-6 text-xl font-semibold">No Products Found</h2>
            <p className="mt-2 text-muted-foreground">Get started by adding your first product.</p>
            <Button onClick={handleAddNew} className="mt-6">
                <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
        </div>
      ) : (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
            <Card key={product.slug}>
              <div className="relative aspect-[3/4]">
                <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="truncate">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-primary">${(product.price / 100).toFixed(2)}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="icon" onClick={() => handleEdit(product)}><Edit className='h-4 w-4' /></Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button variant="destructive" size="icon"><Trash2 className='h-4 w-4' /></Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>This will permanently delete the product.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(product.slug)}>Delete</AlertDialogAction>
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
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>{editingProduct ? 'Update your product details.' : 'Add a new product to your store.'}</DialogDescription>
          </DialogHeader>
          <ProductEditor product={editingProduct} onSave={() => { setIsEditorOpen(false); fetchProducts(); }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProductsPage;
