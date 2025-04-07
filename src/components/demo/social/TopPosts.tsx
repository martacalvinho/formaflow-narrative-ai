
import React from 'react';

interface Post {
  id: number;
  imageUrl: string;
  likes: number;
  comments: number;
}

interface TopPostsProps {
  posts: Post[];
}

const TopPosts: React.FC<TopPostsProps> = ({ posts }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Top Performing Posts</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {posts.map(post => (
          <div key={post.id} className="aspect-square rounded-lg overflow-hidden relative group">
            <img src={post.imageUrl} alt="Instagram post" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <div className="text-center">
                <p className="text-sm font-bold">{post.likes} likes</p>
                <p className="text-xs">{post.comments} comments</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPosts;
