
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Newspaper, Download, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

type NewsletterSubscription = {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    read: boolean;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    } | null;
};

const AdminNewsletterPage = () => {
    const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<string[]>([]);
    const { toast } = useToast();

    const fetchSubscriptions = async () => {
        setLoading(true);
        try {
            const subsRef = collection(db, 'newsletterSubscriptions');
            const q = query(subsRef, orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const subsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as NewsletterSubscription));
            setSubscriptions(subsData);

            // Mark unread as read
            const unread = subsData.filter(sub => !sub.read);
            if (unread.length > 0) {
                const batch = writeBatch(db);
                unread.forEach(sub => {
                    batch.update(doc(db, 'newsletterSubscriptions', sub.id), { read: true });
                });
                await batch.commit();
            }
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
            toast({
                title: 'Error',
                description: 'Failed to load subscriptions.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscriptions();
    }, [toast]);

    const handleSelection = (id: string) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selected.length === subscriptions.length) {
            setSelected([]);
        } else {
            setSelected(subscriptions.map(entry => entry.id));
        }
    };
    
    const downloadCSV = () => {
        const headers = ['First Name', 'Last Name', 'Email', 'Date Subscribed'];
        const rows = (selected.length > 0 ? subscriptions.filter(s => selected.includes(s.id)) : subscriptions)
            .map(entry => [
            entry.firstName || 'N/A',
            entry.lastName || 'N/A',
            entry.email,
            entry.createdAt ? format(new Date(entry.createdAt.seconds * 1000), 'PPP p') : 'N/A',
        ]);

        let csvContent = "data:text/csv;charset=utf-8," 
            + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "newsletter_subscriptions.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = async () => {
        if (selected.length === 0) return;
        const batch = writeBatch(db);
        selected.forEach(id => {
            batch.delete(doc(db, 'newsletterSubscriptions', id));
        });
        await batch.commit();
        toast({ title: `${selected.length} subscriptions deleted.` });
        fetchSubscriptions();
        setSelected([]);
    };

    const handleMarkAsRead = async () => {
        if (selected.length === 0) return;
        const batch = writeBatch(db);
        selected.forEach(id => {
            batch.update(doc(db, 'newsletterSubscriptions', id), { read: true });
        });
        await batch.commit();
        toast({ title: `${selected.length} entries marked as read.` });
        fetchSubscriptions();
        setSelected([]);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Newsletter Subscriptions</h1>
                <div className="flex items-center gap-2">
                    {selected.length > 0 && (
                        <>
                            <Button variant="outline" size="sm" onClick={handleMarkAsRead}><Eye className="mr-2 h-4 w-4"/>Mark as Read</Button>
                             <AlertDialog>
                                <AlertDialogTrigger asChild><Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4"/>Delete ({selected.length})</Button></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete {selected.length} subscriptions.</AlertDialogDescription></AlertDialogHeader>
                                    <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction></AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </>
                    )}
                     <Button onClick={downloadCSV} disabled={subscriptions.length === 0}>
                        <Download className="mr-2 h-4 w-4" />
                        Export {selected.length > 0 ? `(${selected.length})` : 'All'}
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Subscribers</CardTitle>
                    <CardDescription>
                        {loading ? 'Loading...' : `A total of ${subscriptions.length} people have subscribed.`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : subscriptions.length === 0 ? (
                        <div className="text-center py-20 bg-muted/50 rounded-lg border-2 border-dashed">
                            <Newspaper className="mx-auto h-16 w-16 text-muted-foreground" />
                            <h2 className="mt-6 text-xl font-semibold">No subscribers yet.</h2>
                            <p className="mt-2 text-muted-foreground">New newsletter sign-ups will appear here.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">
                                        <Checkbox
                                            checked={selected.length === subscriptions.length && subscriptions.length > 0}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right">Date Joined</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {subscriptions.map((entry) => (
                                    <TableRow key={entry.id} className={cn(!entry.read && "font-bold bg-primary/5")}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selected.includes(entry.id)}
                                                onCheckedChange={() => handleSelection(entry.id)}
                                            />
                                        </TableCell>
                                        <TableCell>{entry.firstName || ''} {entry.lastName || ''}</TableCell>
                                        <TableCell>{entry.email}</TableCell>
                                        <TableCell className="text-right text-muted-foreground">
                                            {entry.createdAt ? format(new Date(entry.createdAt.seconds * 1000), 'PPP') : 'N/A'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminNewsletterPage;
