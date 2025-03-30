import React, { useState, useEffect } from 'react';
import { useCommunity } from '../hooks/useCommunity';
import { useAuth } from '../features/auth/AuthContext';
import CommunityPost from '../components/community/CommunityPost';
import CreatePost from '../components/community/CreatePost';
import CommunityGroups from '../components/community/CommunityGroups';

const Community = () => {
  const { user } = useAuth();
  const { 
    posts, 
    groups, 
    loading, 
    error,
    createPost,
    joinGroup 
  } = useCommunity();

  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="community-page">
      <header className="community-header">
        <h1>Spiritual Community</h1>
        <div className="community-tabs">
          <button 
            className={`tab ${activeTab === 'feed' ? 'active' : ''}`}
            onClick={() => setActiveTab('feed')}
          >
            Feed
          </button>
          <button 
            className={`tab ${activeTab === 'groups' ? 'active' : ''}`}
            onClick={() => setActiveTab('groups')}
          >
            Groups
          </button>
        </div>
      </header>

      {activeTab === 'feed' ? (
        <div className="community-feed">
          <CreatePost onSubmit={createPost} />
          
          {loading ? (
            <div className="loading-spinner" />
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="posts-grid">
              {posts.map(post => (
                <CommunityPost 
                  key={post.id} 
                  post={post}
                  currentUser={user}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <CommunityGroups 
          groups={groups}
          onJoinGroup={joinGroup}
          currentUser={user}
        />
      )}
    </div>
  );
};

export default Community;
