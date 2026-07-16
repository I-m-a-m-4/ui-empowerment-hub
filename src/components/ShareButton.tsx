
'use client';

import { Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

export default function ShareButton({ title, text }: { title: string; text?: string }) {
    const { toast } = useToast();

    const handleShare = async () => {
        const shareData = {
            title,
            text: text || `Check out this product: ${title}`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error: any) {
                // Silently fail if the user cancels the share dialog (AbortError).
                // This is expected behavior and not a true error.
                if (error.name !== 'AbortError') {
                    console.error('Error sharing:', error);
                }
            }
        } else {
            // Fallback for desktop browsers
            try {
                await navigator.clipboard.writeText(window.location.href);
                toast({
                    title: 'Link Copied!',
                    description: 'The product link has been copied to your clipboard.',
                });
            } catch (error) {
                console.error('Error copying to clipboard:', error);
                toast({
                    title: 'Error',
                    description: 'Could not copy link to clipboard.',
                    variant: 'destructive',
                });
            }
        }
    };

    return (
        <Button variant="outline" size="lg" onClick={handleShare}>
            <Share2 className="mr-2" />
            Share
        </Button>
    );
}
