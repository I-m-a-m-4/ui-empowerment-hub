
'use client';

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { type BlogPost } from "@/lib/blog-posts";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { getAllPosts } from "@/lib/blog-posts";
import MotionWrap from "./MotionWrap";
import { Badge } from "./ui/badge";

const Blog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const fetchedPosts = await getAllPosts();
            setPosts(fetchedPosts.slice(0, 3)); // Only show latest 3
            setLoading(false);
        };
        fetchPosts();
    }, []);

    const latestPost = posts[0];
    const olderPosts = posts.slice(1);

    return (
        <MotionWrap>
            <section id="blog" className="py-20 bg-secondary/20" style={{'--animation-delay': '0.9s'} as React.CSSProperties}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <header className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">From the Journal</h2>
                        <p className="mt-3 text-muted-foreground">Insights, strategies, and reflections on building a Deen-aligned business and life.</p>
                    </header>
                    <div className="mt-16 max-w-7xl mx-auto">
                        {loading ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <Skeleton className="h-80 w-full rounded-lg" />
                                    <Skeleton className="h-8 w-3/4" />
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-6 w-1/2" />
                                </div>
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <Skeleton className="h-32 w-full rounded-lg" />
                                        <Skeleton className="h-6 w-5/6" />
                                    </div>
                                     <div className="space-y-4">
                                        <Skeleton className="h-32 w-full rounded-lg" />
                                        <Skeleton className="h-6 w-5/6" />
                                    </div>
                                </div>
                            </div>
                        ) : posts.length > 0 && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                                {/* Featured Post */}
                                {latestPost && (
                                    <article className="group relative rounded-2xl overflow-hidden glass-card transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl anim d-2">
                                        {latestPost.imageUrl && (
                                            <div className="aspect-video relative overflow-hidden">
                                                <Link href={`/blog/${latestPost.slug}`}>
                                                    <Image
                                                        src={latestPost.imageUrl}
                                                        fill
                                                        alt={latestPost.title}
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                                </Link>
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <Badge variant="secondary" className="mb-2">Latest Post</Badge>
                                            <h3 className="text-xl tracking-tight font-semibold text-foreground">
                                                <Link href={`/blog/${latestPost.slug}`} className="hover:text-primary transition line-clamp-2">{latestPost.title}</Link>
                                            </h3>
                                            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{latestPost.description}</p>
                                            <div className="mt-4 flex items-center justify-between">
                                                <span className="text-xs text-muted-foreground">{new Date(latestPost.date).toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
                                                <Link href={`/blog/${latestPost.slug}`} className="flex items-center text-sm font-medium text-primary hover:text-primary/80 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    Read More <ArrowRight className="h-4 w-4 ml-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                )}

                                {/* Older Posts */}
                                <div className="space-y-8">
                                    {olderPosts.map((post, index) => (
                                        <article key={post.slug} className={`group relative flex items-center gap-4 rounded-2xl overflow-hidden glass-card transition-all duration-300 hover:scale-[1.03] hover:shadow-xl anim d-${index + 3}`}>
                                            {post.imageUrl && (
                                                <div className="w-1/3 aspect-square relative flex-shrink-0">
                                                    <Link href={`/blog/${post.slug}`}>
                                                        <Image
                                                            src={post.imageUrl}
                                                            fill
                                                            alt={post.title}
                                                            className="object-cover"
                                                            sizes="33vw"
                                                        />
                                                    </Link>
                                                </div>
                                            )}
                                            <div className="p-4 flex-grow">
                                                <h3 className="text-base tracking-tight font-medium text-foreground">
                                                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition line-clamp-2">{post.title}</Link>
                                                </h3>
                                                <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{post.description}</p>
                                                <span className="text-xs text-muted-foreground mt-2 block">{new Date(post.date).toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </MotionWrap>
    );
};

export default Blog;
