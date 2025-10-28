import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Reusable Blog Post Card
 * @param {{post: object, navigateTo: Function}} props
 */
const BlogPostCard = ({ post, navigateTo }) => (
  <article
    className="bg-white shadow-xl rounded-2xl overflow-hidden cursor-pointer group"
    onClick={() => navigateTo('blogPost', { postId: post.id })} // Note: 'blogPost' page not yet built
    role="button"
    tabIndex="0"
    aria-label={`Read article: ${post.title}`}
  >
    <div className="p-6">
      <p className="text-sm text-gray-500 mb-1">{post.date}</p>
      <h3 className="text-xl font-bold text-gray-800 group-hover:text-bangla-green transition-colors">
        {post.title}
      </h3>
      <p className="mt-2 text-gray-700 text-sm">{post.excerpt}</p>
      <div className="mt-4 text-bangla-green font-semibold text-sm inline-flex items-center">
        Read More <ArrowRight className="ml-1 h-4 w-4" />
      </div>
    </div>
  </article>
);

export default BlogPostCard;