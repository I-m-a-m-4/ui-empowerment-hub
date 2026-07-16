
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { type Product } from '@/lib/products';
import Link from 'next/link';
import { useShoppingCart } from 'use-shopping-cart';
import { useToast } from '@/hooks/use-toast';
import { trackClick } from '@/lib/analytics';

export default function ShopPageClient({ products }: { products: Product[] }) {
    const { addItem } = useShoppingCart();
    const { toast } = useToast();

    const handleAddToCart = (product: Product) => {
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

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
                <article key={product.id} className="group rounded-2xl bg-card border overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                    <Link href={`/shop/${product.slug}`} className="block">
                        <div className="relative">
                            <div className="aspect-square w-full relative">
                                {product.imageUrl && (
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                )}
                            </div>
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </Link>
                    <div className="p-6">
                        <header className="flex items-start justify-between">
                            <div className="min-w-0 flex-1">
                                <h3 className="text-lg tracking-tight font-semibold text-foreground">
                                    <Link href={`/shop/${product.slug}`}>{product.name}</Link>
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
                            </div>
                            {product.price > 0 ? (
                                <span className="text-lg font-semibold text-primary ml-4">${(product.price/100).toFixed(2)}</span>
                            ) : (
                                <span className="text-lg font-semibold text-primary ml-4">Free</span>
                            )}
                        </header>
                        <div className="mt-6">
                            {product.price > 0 ? (
                                <Button className="w-full" onClick={() => handleAddToCart(product)}>
                                    <ShoppingCart className="mr-2" /> Add to cart
                                </Button>
                            ) : (
                                <Button asChild className="w-full">
                                    <Link href={`/shop/${product.slug}`}>Get Access</Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}

    