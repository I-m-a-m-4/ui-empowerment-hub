
'use client';

import { useState, useEffect, useMemo } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, BookHeart, Download, Trash2, Eye, Search, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { SurveyAnswers } from '@/app/pagetopurpose/types';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

type Registration = SurveyAnswers & {
    id: string;
    read?: boolean;
    submittedAt: {
        seconds: number;
        nanoseconds: number;
    } | null;
};

const AdminPageToPurposePage = () => {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { toast } = useToast();

    const fetchRegistrations = async (markAsRead = false) => {
        setLoading(true);
        try {
            const regsRef = collection(db, 'pageToPurposeRegistrations');
            const q = query(regsRef, orderBy('submittedAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const regsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Registration));
            setRegistrations(regsData);

            if (markAsRead) {
                const unread = regsData.filter(reg => !reg.read);
                if (unread.length > 0) {
                    const batch = writeBatch(db);
                    unread.forEach(reg => {
                        batch.update(doc(db, 'pageToPurposeRegistrations', reg.id), { read: true });
                    });
                    await batch.commit();
                }
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
        fetchRegistrations(true);
    }, []);

    const handleSelection = (id: string) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (filteredData: Registration[]) => {
        if (selected.length === filteredData.length && filteredData.length > 0) {
            setSelected([]);
        } else {
            setSelected(filteredData.map(entry => entry.id));
        }
    };
    
    const downloadCSV = (dataToExport: Registration[]) => {
        if (dataToExport.length === 0) return;

        const headers = Object.keys(dataToExport[0]).filter(key => key !== 'id' && key !== 'read' && key !== 'submittedAt');
        const headerRow = [...headers, 'Submitted At'].join(',');

        const rows = dataToExport.map(entry => {
             const rowData = headers.map(header => {
                const value = entry[header];
                if (Array.isArray(value)) {
                    return `"${value.join(', ')}"`;
                }
                return `"${String(value || 'N/A').replace(/"/g, '""')}"`;
            });
            const submittedAt = entry.submittedAt ? format(new Date(entry.submittedAt.seconds * 1000), 'PPP p') : 'N/A';
            return [...rowData, `"${submittedAt}"`].join(',');
        });

        let csvContent = "data:text/csv;charset=utf-8," 
            + [headerRow, ...rows].join('\n');
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "pagetopurpose_registrations.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = async () => {
        if (selected.length === 0) return;
        const batch = writeBatch(db);
        selected.forEach(id => {
            batch.delete(doc(db, 'pageToPurposeRegistrations', id));
        });
        await batch.commit();
        toast({ title: `${selected.length} registrations deleted.` });
        await fetchRegistrations();
        setSelected([]);
    };

    const handleMarkAsRead = async () => {
        if (selected.length === 0) return;
        const batch = writeBatch(db);
        selected.forEach(id => {
            batch.update(doc(db, 'pageToPurposeRegistrations', id), { read: true });
        });
        await batch.commit();
        toast({ title: `${selected.length} entries marked as read.` });
        await fetchRegistrations();
        setSelected([]);
    };

    const filteredRegistrations = useMemo(() => registrations.filter(entry => {
        if (!searchQuery) return true;
        const lowercasedQuery = searchQuery.toLowerCase();
        return Object.values(entry).some(value =>
            String(value).toLowerCase().includes(lowercasedQuery)
        );
    }), [registrations, searchQuery]);

    const staticHeaders = ['fullName', 'email'];
    const dynamicHeaders = useMemo(() => {
        if (filteredRegistrations.length === 0) return [];
        return Object.keys(filteredRegistrations[0])
            .filter(key => key !== 'id' && key !== 'read' && key !== 'submittedAt' && !staticHeaders.includes(key));
    }, [filteredRegistrations]);
    const tableHeaders = [...staticHeaders, ...dynamicHeaders];


    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h1 className="text-3xl font-bold">Page to Purpose™ Registrations</h1>
                <div className="flex items-center gap-2 flex-wrap">
                    <Button variant="outline" size="sm" onClick={() => fetchRegistrations(true)} disabled={loading}>
                        <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} /> Refresh
                    </Button>
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
                     <Button onClick={() => downloadCSV(selected.length > 0 ? filteredRegistrations.filter(s => selected.includes(s.id)) : filteredRegistrations)} disabled={registrations.length === 0}>
                        <Download className="mr-2 h-4 w-4" />
                        Export {selected.length > 0 ? `(${selected.length})` : 'All'}
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Registrations</CardTitle>
                    <CardDescription>
                        {loading ? 'Loading...' : `Showing ${filteredRegistrations.length} of ${registrations.length} total registrations.`}
                    </CardDescription>
                    <div className="relative pt-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="Search registrations..." 
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : registrations.length === 0 ? (
                        <div className="text-center py-20 bg-muted/50 rounded-lg border-2 border-dashed">
                            <BookHeart className="mx-auto h-16 w-16 text-muted-foreground" />
                            <h2 className="mt-6 text-xl font-semibold">No registrations yet.</h2>
                            <p className="mt-2 text-muted-foreground">New sign-ups will appear here.</p>
                        </div>
                    ) : (
                        <ScrollArea className="w-full whitespace-nowrap rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px] sticky left-0 bg-background z-10">
                                            <Checkbox
                                                checked={selected.length > 0 && selected.length === filteredRegistrations.length}
                                                onCheckedChange={() => handleSelectAll(filteredRegistrations)}
                                            />
                                        </TableHead>
                                        {tableHeaders.map(header => <TableHead key={header} className="capitalize min-w-[200px]">{header.replace(/([A-Z])/g, ' $1')}</TableHead>)}
                                        <TableHead className="text-right">Submitted At</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredRegistrations.map((entry) => (
                                        <TableRow key={entry.id} data-state={selected.includes(entry.id) ? "selected" : undefined} className={cn(!entry.read && "bg-primary/5")}>
                                            <TableCell className="sticky left-0 bg-background data-[state=selected]:bg-muted z-10">
                                                <Checkbox
                                                    checked={selected.includes(entry.id)}
                                                    onCheckedChange={() => handleSelection(entry.id)}
                                                />
                                            </TableCell>
                                            {tableHeaders.map(header => {
                                                const value = entry[header];
                                                const displayValue = Array.isArray(value) ? value.join(', ') : value;
                                                return <TableCell key={header} className="min-w-[200px] whitespace-normal break-words">{String(displayValue || 'N/A')}</TableCell>
                                            })}
                                            <TableCell className="text-right text-muted-foreground">
                                                {entry.submittedAt ? format(new Date(entry.submittedAt.seconds * 1000), 'PPP') : 'N/A'}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminPageToPurposePage;
