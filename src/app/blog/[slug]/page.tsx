import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog-posts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import BlogPage from '@/components/BlogPage';

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }

  return {
    title: `${post.title} | Scale with Olaiya`,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
        title: post.title,
        description: post.description,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author],
    }
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
 
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const PostPage = async ({ params }: Props) => {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        <BlogPage post={post} />
      </main>
      <Footer />
    </div>
  );
};

export default PostPage;
