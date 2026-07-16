'use client';
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";

export default function CartButton() {
    const { cartCount, shouldDisplayCart, handleCartClick, cartDetails, removeItem, incrementItem, decrementItem, totalPrice } = useShoppingCart();

    return (
        <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart />
                    {cartCount !== undefined && cartCount > 0 && (
                         <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                            {cartCount}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
                <SheetHeader className="px-6">
                    <SheetTitle>My Cart ({cartCount})</SheetTitle>
                </SheetHeader>

                <div className="h-full flex flex-col justify-between">
                    <ScrollArea className="flex-grow pr-6">
                        {cartCount === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center">
                                <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                                <p className="mt-4 text-muted-foreground">Your cart is empty.</p>
                            </div>
                        ) : (
                            <div className="space-y-4 mt-4">
                                {Object.values(cartDetails ?? {}).map((item) => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden border">
                                            {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                                        </div>
                                        <div className="flex flex-col gap-1 flex-grow">
                                            <Link href={`/shop/${item.id}`} className="font-medium hover:text-primary transition-colors">{item.name}</Link>
                                            <div className="flex items-center gap-2">
                                                <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => decrementItem(item.id)}><Minus className="h-3 w-3" /></Button>
                                                <span>{item.quantity}</span>
                                                <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => incrementItem(item.id)}><Plus className="h-3 w-3" /></Button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="font-semibold">${(item.value/100).toFixed(2)}</p>
                                            <Button variant="ghost" size="icon" className="text-muted-foreground h-8 w-8" onClick={() => removeItem(item.id)}><Trash2 className="h-4 w-4"/></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                    
                    {cartCount !== undefined && cartCount > 0 && (
                        <div className="border-t px-6 pt-4 mt-auto">
                            <div className="flex justify-between font-semibold">
                                <p>Subtotal</p>
                                <p>${(totalPrice!/100).toFixed(2)}</p>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Shipping and taxes calculated at next step.</p>
                            <Button asChild className="w-full mt-4">
                                <Link href="/shop/checkout">Checkout</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
