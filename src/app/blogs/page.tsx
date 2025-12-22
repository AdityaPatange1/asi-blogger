import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import BlogsClient from './BlogsClient';

function BlogsLoading() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <Loader2 size={40} className="animate-spin text-orange-500" />
    </div>
  );
}

export default function BlogsPage() {
  return (
    <Suspense fallback={<BlogsLoading />}>
      <BlogsClient />
    </Suspense>
  );
}
