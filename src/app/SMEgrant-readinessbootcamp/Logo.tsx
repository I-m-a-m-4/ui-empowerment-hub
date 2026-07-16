'use client';
import Image from "next/image";
import Link from "next/link";

const Logo = () => (
    <Link href="/" className="inline-block">
        <div className="flex items-center gap-3">
             <div className="w-12 h-12 grid place-items-center rounded-lg">
              <Image src="https://res.cloudinary.com/dd1czj85j/image/upload/v1759697922/icon_eqqhd2.jpg" alt="Scale with Olaiya Logo" width={48} height={48} className="rounded-lg" />
            </div>
        </div>
    </Link>
);

export default Logo;
