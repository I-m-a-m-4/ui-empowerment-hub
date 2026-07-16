'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Rocket, Download, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

type Registration = {
    id: string;
    name: string;
    email: string;
    amount: number;
    paystackReference: string;
    status: string;
    webinar: string;
    read?: boolean;
    registeredAt: {
        seconds: number;
        nanoseconds: number;
    } | null;
};

const AdminRevenueRoadmapPage = () => {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<string[]>([]);
    const { toast } = useToast();

    const fetchRegistrations = async () => {
        setLoading(true);
        try {
            const regsRef = collection(db, 'revenueRoadmapRegistrations');
            const q = query(regsRef, orderBy('registeredAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const regsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Registration));
            setRegistrations(regsData);

            // Mark unread as read
            const unread = regsData.filter(reg => !reg.read);
            if (unread.length > 0) {
                const batch = writeBatch(db);
                unread.forEach(reg => {
                    batch.update(doc(db, 'revenueRoadmapRegistrations', reg.id), { read: true });
                });
                await batch.commit();
            }
        } catch (error) {
            console.error("Error fetching registrations:", error);
            toast({
                title: 'Error',
                description: 'Failed to load registrations.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const handleSelection = (id: string) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selected.length === registrations.length) {
            setSelected([]);
        } else {
            setSelected(registrations.map(entry => entry.id));
        }
    };
    
    const downloadCSV = () => {
        const headers = ['Name', 'Email', 'Amount (NGN)', 'Paystack Reference', 'Status', 'Webinar', 'Date Registered'];
        const rows = (selected.length > 0 ? registrations.filter(s => selected.includes(s.id)) : registrations)
            .map(entry => [
            entry.name,
            entry.email,
            entry.amount.toFixed(2),
            entry.paystackReference,
            entry.status,
            entry.webinar,
            entry.registeredAt ? format(new Date(entry.registeredAt.seconds * 1000), 'PPP p') : 'N/A',
        ]);

        let csvContent = "data:text/csv;charset=utf-8," 
            + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "revenue_roadmap_registrations.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = async () => {
        if (selected.length === 0) return;
        const batch = writeBatch(db);
        selected.forEach(id => {
            batch.delete(doc(db, 'revenueRoadmapRegistrations', id));
        });
        await batch.commit();
        toast({ title: `${selected.length} registrations deleted.` });
        fetchRegistrations();
        setSelected([]);
    };

    const handleMarkAsRead = async () => {
        if (selected.length === 0) return;
        const batch = writeBatch(db);
        selected.forEach(id => {
            batch.update(doc(db, 'revenueRoadmapRegistrations', id), { read: true });
        });
        await batch.commit();
        toast({ title: `${selected.length} entries marked as read.` });
        fetchRegistrations();
        setSelected([]);
    };
    
    const totalRevenue = registrations.reduce((acc, reg) => acc + (reg.status === 'success' ? reg.amount : 0), 0);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">2x Revenue Roadmap Registrations</h1>
                <div className="flex items-center gap-2">
                    {selected.length > 0 && (
                        <>
                            <Button variant="outline" size="sm" onClick={handleMarkAsRead}><Eye className="mr-2 h-4 w-4"/>Mark as Read</Button>
                             <AlertDialog>
                                <AlertDialogTrigger asChild><Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4"/>Delete ({selected.length})</Button></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete {selected.length} registrations.</AlertDialogDescription></AlertDialogHeader>
                                    <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction></AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </>
                    )}
                     <Button onClick={downloadCSV} disabled={registrations.length === 0}>
                        <Download className="mr-2 h-4 w-4" />
                        Export {selected.length > 0 ? `(${selected.length})` : 'All'}
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Paid Registrations</CardTitle>
                    <CardDescription>
                        {loading ? 'Loading...' : `A total of ${registrations.length} people have registered. Total revenue: ₦${totalRevenue.toLocaleString()}`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : registrations.length === 0 ? (
                        <div className="text-center py-20 bg-muted/50 rounded-lg border-2 border-dashed">
                            <Rocket className="mx-auto h-16 w-16 text-muted-foreground" />
                            <h2 className="mt-6 text-xl font-semibold">No registrations yet.</h2>
                            <p className="mt-2 text-muted-foreground">New webinar sign-ups will appear here.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">
                                        <Checkbox
                                            checked={selected.length === registrations.length && registrations.length > 0}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Reference</TableHead>
                                    <TableHead className="text-right">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {registrations.map((entry) => (
                                    <TableRow key={entry.id} className={cn(!entry.read && "font-bold bg-primary/5")}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selected.includes(entry.id)}
                                                onCheckedChange={() => handleSelection(entry.id)}
                                            />
                                        </TableCell>
                                        <TableCell>{entry.name}</TableCell>
                                        <TableCell>{entry.email}</TableCell>
                                        <TableCell>₦{entry.amount.toLocaleString()}</TableCell>
                                        <TableCell><span className={cn("px-2 py-1 rounded-full text-xs", entry.status === 'success' ? 'bg-green-500/20 text-green-700' : 'bg-yellow-500/20 text-yellow-700')}>{entry.status}</span></TableCell>
                                        <TableCell>{entry.paystackReference}</TableCell>
                                        <TableCell className="text-right text-muted-foreground">
                                            {entry.registeredAt ? format(new Date(entry.registeredAt.seconds * 1000), 'PPP') : 'N/A'}
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

export default AdminRevenueRoadmapPage;
