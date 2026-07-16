'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Send, Download, Trash2, Eye, Mail, Phone, Briefcase, ChevronDown, Copy } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

type Submission = {
    id: string;
    firstName: string;
    lastName:string;
    email: string;
    phone?: string;
    projectType: string;
    message: string;
    read: boolean;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    } | null;
};

const AdminSubmissionsPage = () => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<string[]>([]);
    const [openItem, setOpenItem] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const submissionsRef = collection(db, 'contactSubmissions');
            const q = query(submissionsRef, orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const submissionsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Submission));
            setSubmissions(submissionsData);

            // Mark unread submissions as read
            const unreadSubmissions = submissionsData.filter(sub => !sub.read);
            if (unreadSubmissions.length > 0) {
                const batch = writeBatch(db);
                unreadSubmissions.forEach(sub => {
                    const submissionDocRef = doc(db, 'contactSubmissions', sub.id);
                    batch.update(submissionDocRef, { read: true });
                });
                await batch.commit();
            }
        } catch (error) {
            console.error("Error fetching or updating submissions:", error);
            toast({
                title: 'Error',
                description: 'Failed to load or update submissions.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const handleSelection = (id: string) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selected.length === submissions.length) {
            setSelected([]);
        } else {
            setSelected(submissions.map(entry => entry.id));
        }
    };
    
    const downloadCSV = () => {
        const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Project Type', 'Message', 'Date Submitted', 'Read'];
        const rows = (selected.length > 0 ? submissions.filter(s => selected.includes(s.id)) : submissions)
            .map(entry => [
            `"${entry.firstName}"`,
            `"${entry.lastName}"`,
            entry.email,
            entry.phone || 'N/A',
            entry.projectType,
            `"${entry.message.replace(/"/g, '""')}"`, // Escape quotes in message
            entry.createdAt ? format(new Date(entry.createdAt.seconds * 1000), 'PPP p') : 'N/A',
            entry.read ? 'Yes' : 'No'
        ]);

        let csvContent = "data:text/csv;charset=utf-8," 
            + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "submissions_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = async () => {
        if (selected.length === 0) return;
        const batch = writeBatch(db);
        selected.forEach(id => {
            batch.delete(doc(db, 'contactSubmissions', id));
        });
        await batch.commit();
        toast({ title: `${selected.length} submissions deleted.` });
        fetchSubmissions();
        setSelected([]);
    };

    const handleMarkAsRead = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selected.length === 0) return;
        const batch = writeBatch(db);
        selected.forEach(id => {
            batch.update(doc(db, 'contactSubmissions', id), { read: true });
        });
        await batch.commit();
        toast({ title: `${selected.length} submissions marked as read.` });
        fetchSubmissions();
        setSelected([]);
    };

    const handleRowClick = (id: string) => {
        setOpenItem(prev => (prev === id ? null : id));
    };

    const handleCopy = (submission: Submission) => {
        const textToCopy = `
Name: ${submission.firstName} ${submission.lastName}
Email: ${submission.email}
Phone: ${submission.phone || 'N/A'}
Project Type: ${submission.projectType}
Date: ${submission.createdAt ? format(new Date(submission.createdAt.seconds * 1000), 'PPP p') : 'N/A'}
---
Message:
${submission.message}
        `.trim();
        navigator.clipboard.writeText(textToCopy);
        toast({
            title: "Copied to clipboard!",
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Contact Submissions</h1>
                <div className="flex items-center gap-2">
                    {selected.length > 0 && (
                        <>
                            <Button variant="outline" size="sm" onClick={handleMarkAsRead}><Eye className="mr-2 h-4 w-4"/>Mark as Read ({selected.length})</Button>
                             <AlertDialog>
                                <AlertDialogTrigger asChild><Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4"/>Delete ({selected.length})</Button></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete {selected.length} submissions.</AlertDialogDescription></AlertDialogHeader>
                                    <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction></AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </>
                    )}
                     <Button onClick={downloadCSV} disabled={submissions.length === 0}>
                        <Download className="mr-2 h-4 w-4" />
                        Export {selected.length > 0 ? `(${selected.length})` : 'All'}
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Inbox</CardTitle>
                    <CardDescription>
                        {loading ? 'Loading...' : `You have ${submissions.length} total submissions.`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : submissions.length === 0 ? (
                        <div className="text-center py-20 bg-muted/50 rounded-lg border-2 border-dashed">
                            <Send className="mx-auto h-16 w-16 text-muted-foreground" />
                            <h2 className="mt-6 text-xl font-semibold">No submissions yet.</h2>
                            <p className="mt-2 text-muted-foreground">New contact form submissions will appear here.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">
                                        <Checkbox
                                            checked={selected.length === submissions.length && submissions.length > 0}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Project Type</TableHead>
                                    <TableHead>Message</TableHead>
                                    <TableHead className="text-right">Date</TableHead>
                                    <TableHead />
                                </TableRow>
                            </TableHeader>
                           <TableBody>
                                {submissions.map((entry) => (
                                    <React.Fragment key={entry.id}>
                                        <TableRow 
                                            className={cn("cursor-pointer", !entry.read && "font-bold bg-primary/5")}
                                            onClick={() => handleRowClick(entry.id)}
                                        >
                                            <TableCell onClick={(e) => e.stopPropagation()}>
                                                <Checkbox
                                                    checked={selected.includes(entry.id)}
                                                    onCheckedChange={() => handleSelection(entry.id)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <p>{entry.firstName} {entry.lastName}</p>
                                                <p className={cn("text-xs text-muted-foreground", !entry.read && "text-primary/80")}>{entry.email}</p>
                                            </TableCell>
                                            <TableCell>{entry.projectType}</TableCell>
                                            <TableCell className="max-w-xs truncate">{entry.message}</TableCell>
                                            <TableCell className="text-right text-muted-foreground">
                                                {entry.createdAt ? format(new Date(entry.createdAt.seconds * 1000), 'PPP') : 'N/A'}
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm" className="w-9 p-0">
                                                    <ChevronDown className={cn("h-4 w-4 transition-transform", openItem === entry.id && "rotate-180")} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        {openItem === entry.id && (
                                            <TableRow>
                                                <TableCell colSpan={6} className="p-0">
                                                    <div className="p-6 bg-muted/50 space-y-4">
                                                        <div>
                                                            <h4 className="font-semibold mb-2">Full Message:</h4>
                                                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{entry.message}</p>
                                                        </div>
                                                        <div className="flex items-center gap-6 text-sm">
                                                            {entry.phone && <p className="flex items-center gap-2"><Phone className="size-4 text-muted-foreground"/> {entry.phone}</p>}
                                                        </div>
                                                        <Button variant="outline" size="sm" onClick={() => handleCopy(entry)}>
                                                            <Copy className="mr-2 h-4 w-4" /> Copy Details
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminSubmissionsPage;
