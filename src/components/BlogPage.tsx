
'use client'

import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar, User, MessageSquare, Send, Sparkles } from "lucide-react";
import placeholderData from '@/lib/placeholder-images.json';
import { type BlogPost } from '@/lib/blog-posts';
import { trackClick } from '@/lib/analytics';


const commentSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  comment: z.string().min(10, { message: "Comment must be at least 10 characters." }),
});

const BlogPage = ({ post }: { post: BlogPost }) => {
    const { toast } = useToast();
    const postImage = placeholderData.placeholderImages.find(p => p.id === post.imageId);

    const form = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: { name: "", comment: "" },
    });

    function onSubmit(values: z.infer<typeof commentSchema>) {
        console.log(values);
        toast({
            title: "Comment Submitted!",
            description: "Thank you for your feedback. Your comment is awaiting moderation.",
        });
        form.reset();
    }

    return (
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <article className="max-w-4xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">{post.title}</h1>
                    <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <User className="size-4" />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="size-4" />
                            <span>{post.date}</span>
                        </div>
                    </div>
                </header>

                {postImage && (
                    <div className="relative aspect-video overflow-hidden mb-12 shadow-lg">
                        <Image
                            src={postImage.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            data-ai-hint={postImage.imageHint}
                            priority
                        />
                    </div>
                )}
                
                <div className="prose prose-lg dark:prose-invert max-w-none mx-auto" dangerouslySetInnerHTML={{ __html: post.content }} />

            </article>

            {/* CTA Section */}
            <aside className="max-w-4xl mx-auto my-20 p-8 glass-card bg-primary/5 border-primary/20 text-center">
                 <h2 className="text-3xl font-semibold tracking-tight mb-4">Ready to Scale Your Business?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Transform your vision into a thriving, Deen-aligned enterprise. As a Pro-Islamic business strategist, I can provide the clarity and direction you need.
                </p>
                <Button size="lg" asChild onClick={() => trackClick('blog_cta_book_session')}>
                    <a href="https://calendly.com/scalewitholaiya/20-minute-discovery-call" target="_blank" rel="noopener noreferrer">
                        <Sparkles className="w-5 h-5 mr-2"/>
                        Book a Strategy Session
                    </a>
                </Button>
            </aside>

            {/* Comments Section */}
            <div className="max-w-4xl mx-auto mt-20">
                <h2 className="text-3xl font-semibold tracking-tight mb-8 flex items-center gap-3">
                    <MessageSquare />
                    Join the Conversation
                </h2>

                {/* Comment Form */}
                <div className="mb-12 p-8 glass-card">
                    <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
                     <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                             <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Abdullah Ibn Abbas" {...field} className="light:bg-white light:border-gray-200 dark:bg-white/5 dark:border-border focus:border-primary focus:ring-4 focus:ring-primary/20"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="comment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your Comment</FormLabel>
                                        <FormControl>
                                            <Textarea
                                            placeholder="Share your thoughts..."
                                            className="resize-none light:bg-white light:border-gray-200 dark:bg-white/5 dark:border-border focus:border-primary focus:ring-4 focus:ring-primary/20"
                                            rows={5}
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">
                                <Send className="mr-2 size-4" />
                                Post Comment
                            </Button>
                        </form>
                    </Form>
                </div>
                
                {/* Placeholder for Displaying Comments */}
                <div className="space-y-8">
                     <div className="flex gap-4">
                        <div className="w-12 h-12 bg-muted grid place-items-center flex-shrink-0">
                            <User className="size-6 text-muted-foreground" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h4 className="font-semibold">Fatimah bint Muhammad</h4>
                                <time className="text-xs text-muted-foreground">2 days ago</time>
                            </div>
                            <p className="text-muted-foreground mt-1">This is a placeholder comment. The comment submission is functional, but comments are not yet displayed dynamically.</p>
                        </div>
                    </div>
                     <div className="flex gap-4">
                        <div className="w-12 h-12 bg-muted grid place-items-center flex-shrink-0">
                            <User className="size-6 text-muted-foreground" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h4 className="font-semibold">Umar ibn Al-Khattab</h4>
                                <time className="text-xs text-muted-foreground">1 week ago</time>
                            </div>
                            <p className="text-muted-foreground mt-1">A fantastic read, mashallah! Really puts things into perspective.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    );
}

export default BlogPage;
