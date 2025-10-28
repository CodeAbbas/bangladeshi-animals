import React from 'react';
import PageTransition from '../components/PageTransition';
import BlogPostCard from '../components/BlogPostCard';
import { blogPosts } from '../data/pageData';

/**
 * Blog Page
 * @param {{navigateTo: Function}} props
 */
const BlogPage = ({ navigateTo }) => (
  <PageTransition>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-12">Wildlife Articles & News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map(post => (
          <BlogPostCard key={post.id} post={post} navigateTo={navigateTo} />
        ))}
      </div>
    </div>
  </PageTransition>
);

export default BlogPage;