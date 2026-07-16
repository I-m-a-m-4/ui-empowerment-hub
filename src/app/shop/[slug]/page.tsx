

import { notFound } from 'next/navigation';
import { getProductBySlug, getAllProducts } from '@/lib/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import ProductDetailsClient from './ProductDetailsClient';

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found'
    }
  }

  return {
    title: `${product.name} | Scale with Olaiya`,
    description: product.description,
    openGraph: {
        title: product.name,
        description: product.description,
        type: 'website',
        images: [
            {
                url: product.imageUrl,
            }
        ]
    }
  }
}

export async function generateStaticParams() {
  const products = await getAllProducts();
 
  return products.map((product) => ({
    slug: product.slug,
  }));
}

const ProductPage = async ({ params }: Props) => {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }
  
  const allProducts = await getAllProducts();
  const relatedProducts = allProducts
    .filter(p => p.slug !== product.slug) // Exclude the current product
    .slice(0, 3); // Get the first 3

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        <ProductDetailsClient product={product} relatedProducts={relatedProducts} />
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
