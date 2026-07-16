
'use client';
import { Button } from "@/components/ui/button";
import { type Product } from "@/lib/products";
import { ShoppingCart, MessageSquare, Send, User, Download } from "lucide-react";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { useToast } from "@/hooks/use-toast";
import { trackClick } from "@/lib/analytics";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";

const commentSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  comment: z.string().min(10, { message: "Comment must be at least 10 characters." }),
});

export default function ProductDetailsClient({ product, relatedProducts }: { product: Product, relatedProducts: Product[] }) {
    const { addItem } = useShoppingCart();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: { name: "", comment: "" },
    });

    const handleAddToCart = () => {
        const productToAdd = {
            name: product.name,
            description: product.description,
            id: product.slug,
            price: product.price,
            currency: 'USD',
            image: product.imageUrl,
        };
        addItem(productToAdd);
        toast({
            title: `${product.name} added to cart!`,
        });
        trackClick('add_to_cart');
    };
    
    function onCommentSubmit(values: z.infer<typeof commentSchema>) {
        console.log(values);
        toast({
            title: "Comment Submitted!",
            description: "Thank you for your feedback. Your comment is awaiting moderation.",
        });
        form.reset();
    }

    return (
      <>
        <section className="py-12 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                    <div className="aspect-[3/4] relative rounded-2xl glass-card overflow-hidden shadow-lg group">
                         {product.imageUrl && (
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        )}
                         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">{product.name}</h1>
                        
                        {product.price > 0 ? (
                            <p className="text-3xl font-bold tracking-tight text-primary mb-6">${(product.price / 100).toFixed(2)}</p>
                        ) : (
                             <p className="text-3xl font-bold tracking-tight text-primary mb-6">Free</p>
                        )}
                        
                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">{product.description}</p>
                        
                        <div className="flex items-center gap-4">
                            {product.price > 0 ? (
                                <Button size="lg" onClick={handleAddToCart}>
                                    <ShoppingCart className="mr-2" />
                                    Add to Cart
                                </Button>
                            ) : product.downloadUrl ? (
                                <Button size="lg" asChild>
                                    <a href={product.downloadUrl} target="_blank" rel="noopener noreferrer">
                                        <Download className="mr-2" />
                                        Download Now
                                    </a>
                                </Button>
                            ) : null}
                            <ShareButton title={product.name} />
                        </div>

                         <div className="mt-12 p-6 rounded-2xl glass-card bg-secondary/30">
                            <h3 className="font-semibold text-lg mb-2">Why you'll love this book:</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                                <li>Actionable strategies you can implement today.</li>
                                <li>Rooted in Islamic principles for Deen-aligned growth.</li>
                                <li>Written by a practicing business strategist.</li>
                                <li>Easy to read, hard to put down.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="py-12 md:py-20 bg-secondary/20">
             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-semibold tracking-tight mb-8 flex items-center gap-3">
                        <MessageSquare />
                        Leave a Review
                    </h2>
                    <div className="mb-12 p-8 glass-card">
                         <Form {...form}>
                            <form onSubmit={form.handleSubmit(onCommentSubmit)} className="space-y-6">
                                 <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Your Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Abdullah Ibn Abbas" {...field} />
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
                                            <FormLabel>Your Review</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                placeholder="Share your thoughts on the book..."
                                                className="resize-none"
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
                                    Post Review
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </section>

        {relatedProducts.length > 0 && (
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center">Related Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {relatedProducts.map((relatedProduct) => (
                           <article key={relatedProduct.id} className="group rounded-2xl bg-card border overflow-hidden transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl">
                                <div className="relative">
                                    <Link href={`/shop/${relatedProduct.slug}`} className="block">
                                        <div className="aspect-square w-full relative">
                                            {relatedProduct.imageUrl && (
                                                <Image
                                                    src={relatedProduct.imageUrl}
                                                    alt={relatedProduct.name}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                    </Link>
                                </div>
                                <div className="p-6">
                                    <header className="flex items-start justify-between">
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-lg tracking-tight font-semibold text-foreground">
                                                <Link href={`/shop/${relatedProduct.slug}`}>{relatedProduct.name}</Link>
                                            </h3>
                                        </div>
                                         {relatedProduct.price > 0 ? (
                                            <span className="text-lg font-semibold text-primary ml-4">${(relatedProduct.price/100).toFixed(2)}</span>
                                         ) : (
                                            <span className="text-lg font-semibold text-primary ml-4">Free</span>
                                         )}
                                    </header>
                                     <div className="mt-4">
                                         <Button variant="secondary" asChild className="w-full">
                                            <Link href={`/shop/${relatedProduct.slug}`}>View Details</Link>
                                        </Button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        )}
      </>
    );
}
