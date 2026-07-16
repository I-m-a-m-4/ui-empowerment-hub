
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, deleteDoc, doc, writeBatch, where } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, ListChecks, Download, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

type WaitlistEntry = {
    id: string;
    email: string;
    read: boolean;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    } | null;
};

const AdminWaitlistPage = () => {
    const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<string[]>([]);
    const { toast } = useToast();

    const fetchWaitlist = async () => {
        setLoading(true);
        const waitlistRef = collection(db, 'waitlist');
        const q = query(waitlistRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const waitlistData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as WaitlistEntry));
        setWaitlist(waitlistData);
        setLoading(false);
    };

    useEffect(() => {
        fetchWaitlist();
    }, []);

    const handleSelection = (id: string) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selected.length === waitlist.length) {
            setSelected([]);
        } else {
            setSelected(waitlist.map(entry => entry.id));
        }
    };
    
    const downloadCSV = () => {
        const headers = ['Email', 'Date Joined', 'Read'];
        const rows = (selected.length > 0 ? waitlist.filter(w => selected.includes(w.id)) : waitlist)
            .map(entry => [
            entry.email,
            entry.createdAt ? format(new Date(entry.createdAt.seconds * 1000), 'PPP p') : 'N/A',
            entry.read ? 'Yes' : 'No'
        ]);

        let csvContent = "data:text/csv;charset=utf-8," 
            + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "waitlist_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = async () => {
        if (selected.length === 0) return;
        const batch = writeBatch(db);
        selected.forEach(id => {
            batch.delete(doc(db, 'waitlist', id));
        });
        await batch.commit();
        toast({ title: `${selected.length} entries deleted.` });
        fetchWaitlist();
        setSelected([]);
    };

    const handleMarkAsRead = async () => {
        if (selected.length === 0) return;
        const batch = writeBatch(db);
        selected.forEach(id => {
            batch.update(doc(db, 'waitlist', id), { read: true });
        });
        await batch.commit();
        toast({ title: `${selected.length} entries marked as read.` });
        fetchWaitlist();
        setSelected([]);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Book Waitlist</h1>
                <div className="flex items-center gap-2">
                    {selected.length > 0 && (
                        <>
                            <Button variant="outline" size="sm" onClick={handleMarkAsRead}><Eye className="mr-2 h-4 w-4"/>Mark as Read</Button>
                             <AlertDialog>
                                <AlertDialogTrigger asChild><Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4"/>Delete ({selected.length})</Button></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete {selected.length} entries.</AlertDialogDescription></AlertDialogHeader>
                                    <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction></AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </>
                    )}
                     <Button onClick={downloadCSV} disabled={waitlist.length === 0}>
                        <Download className="mr-2 h-4 w-4" />
                        Export {selected.length > 0 ? `(${selected.length})` : 'All'}
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Waitlist Submissions</CardTitle>
                    <CardDescription>
                        {loading ? 'Loading...' : `A total of ${waitlist.length} people have joined the waitlist.`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : waitlist.length === 0 ? (
                        <div className="text-center py-20 bg-muted/50 rounded-lg border-2 border-dashed">
                            <ListChecks className="mx-auto h-16 w-16 text-muted-foreground" />
                            <h2 className="mt-6 text-xl font-semibold">No one has joined yet.</h2>
                            <p className="mt-2 text-muted-foreground">Share your book to get people excited!</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">
                                        <Checkbox
                                            checked={selected.length === waitlist.length && waitlist.length > 0}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right">Date Joined</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {waitlist.map((entry) => (
                                    <TableRow key={entry.id} className={cn(!entry.read && "font-bold bg-primary/5")}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selected.includes(entry.id)}
                                                onCheckedChange={() => handleSelection(entry.id)}
                                            />
                                        </TableCell>
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

export default AdminWaitlistPage;
