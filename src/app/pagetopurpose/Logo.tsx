
'use client';
import Image from "next/image";
import Link from "next/link";
import { BookHeart } from "lucide-react";

const Logo = () => (
    <Link href="/" className="inline-block">
        <div className="flex items-center gap-3">
             <div className="w-12 h-12 grid place-items-center rounded-lg bg-primary/10">
              <BookHeart className="w-7 h-7 text-primary" />
            </div>
            <div className="flex flex-col items-start">
                <span className="text-xl font-bold tracking-tight text-foreground">Page to Purpose™</span>
            </div>
        </div>
    </Link>
);

export default Logo;
