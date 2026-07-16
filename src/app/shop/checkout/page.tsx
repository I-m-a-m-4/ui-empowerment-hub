'use client';

import { useShoppingCart } from 'use-shopping-cart';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Package } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const WHATSAPP_NUMBER = "2349073999745";

const CheckoutPage = () => {
    const { cartDetails, totalPrice, clearCart } = useShoppingCart();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleCheckout = () => {
        if (!cartDetails) return;

        const items = Object.values(cartDetails).map(item => `${item.name} (x${item.quantity}) - $${(item.price / 100).toFixed(2)}`);
        const message = `Assalamu 'alaykum, I'd like to purchase the following items from Scale with Olaiya:\n\n${items.join('\n')}\n\nTotal: $${(totalPrice! / 100).toFixed(2)}`;
        
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');
        clearCart();
    };

    if (!isClient) {
        return null;
    }

    if (!cartDetails || Object.keys(cartDetails).length === 0) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow flex items-center justify-center text-center">
                    <div className="container mx-auto px-4">
                        <Package className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                        <h1 className="text-3xl font-semibold mb-2">Your Cart is Empty</h1>
                        <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
                        <Button asChild>
                            <Link href="/shop">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Return to Shop
                            </Link>
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
    

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        <section id="checkout" className="py-12 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mx-auto max-w-2xl text-center">
                  <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Checkout</h1>
                  <p className="mt-3 text-xl text-muted-foreground">Finalize your order and get ready to scale.</p>
                </header>

                <div className="mt-16 max-w-4xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Order Summary */}
                        <div className="glass-card p-8">
                             <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
                             <div className="space-y-4">
                                {Object.values(cartDetails).map(item => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <div className="w-16 h-20 bg-muted overflow-hidden relative">
                                            {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold">${(item.value / 100).toFixed(2)}</p>
                                    </div>
                                ))}
                             </div>
                             <div className="h-px bg-border my-6"></div>
                             <div className="space-y-2">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span>${(totalPrice! / 100).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Shipping</span>
                                    <span>Calculated later</span>
                                </div>
                                <div className="h-px bg-border my-2"></div>
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Total</span>
                                    <span>${(totalPrice! / 100).toFixed(2)}</span>
                                </div>
                             </div>
                        </div>

                        {/* Checkout Action */}
                        <div className="flex flex-col items-center justify-center text-center glass-card p-8 bg-primary/5 border-primary/20">
                            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                            <h2 className="text-2xl font-semibold mb-2">Ready to Complete?</h2>
                            <p className="text-muted-foreground mb-6">
                                Clicking "Complete Purchase" will open WhatsApp with your order details pre-filled. We'll finalize payment and shipping with you there.
                            </p>
                            <Button size="lg" className="w-full" onClick={handleCheckout}>
                                Complete Purchase via WhatsApp
                            </Button>
                             <p className="text-xs text-muted-foreground mt-4">
                                By completing your purchase, you agree to our Terms of Service.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
