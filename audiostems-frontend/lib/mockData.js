// 🎯 MSC & CO PLATFORM - LEGACY COMPATIBILITY LAYER
// This file now acts as a compatibility layer for the new Universal Mock Database
// All new development should use lib/mockDatabase.js directly

import { RELEASE_STATUSES, GENRES, RELEASE_TYPES } from './constants';
import MockDB, { 
  getUsers, 
  getLabels, 
  getReleases, 
  getSongs, 
  getStats,
  getFilteredDataForRole,
  getUsersByRole,
  getReleasesByArtist,
  getUserById,
  getReleasesByStatus
} from './mockDatabase';

// 📊 UNIVERSAL DATA EXPORTS (from new MockDatabase)
export const ARTISTS = getUsers().filter(user => user.role === 'artist');
export const ADMINS = getUsers().filter(user => ['super_admin', 'company_admin', 'label_admin', 'distribution_partner'].includes(user.role));
export const RELEASES = getReleases();
export const SONGS = getSongs();
export const LABELS = getLabels();

// 🔧 HELPER FUNCTIONS (using new Universal Database)
export const getArtistById = (id) => getUserById(id);

export const getApprovedArtistsByLabel = (labelId) => 
  getUsers().filter(user => 
    user.role === 'artist' && 
    user.labelId === labelId && 
    user.approvalStatus === 'approved'
  );

export const getDashboardStats = () => {
  const stats = getStats();
  return {
    platform: {
      totalUsers: stats.totalUsers,
      totalArtists: stats.totalArtists,
      activeArtists: stats.activeArtists,
      totalReleases: stats.totalReleases,
      totalStreams: stats.totalStreams,
      totalEarnings: stats.totalRevenue,
      totalBrands: stats.totalLabels,
      systemFeatures: 15
    },
    artist: {
      totalReleases: stats.totalReleases,
      totalStreams: stats.totalStreams,
      totalEarnings: stats.totalRevenue,
      monthlyGrowth: 12.5
    }
  };
};

// 🎬 LEGACY VIDEO CONTENT (kept for backward compatibility)
export const MOCK_VIDEOS = {
  featured: {
    id: 'video-001',
    title: 'Urban Beat - Official Music Video',
    url: '/videos/urban-beat.mp4',
    views: '125K',
    likes: '8.5K',
    releaseDate: '2024-09-15',
    performance: 'trending',
    streams: '125,000',
    revenue: 8750
  },
  latest: {
    id: 'video-002', 
    title: 'Urban Beat (Club Remix) - Behind the Studio',
    url: '/videos/urban-beat-remix.mp4',
    views: '45K',
    likes: '3.2K',
    releaseDate: '2025-01-15',
    performance: 'new',
    streams: '12,500',
    revenue: 2800
  },
  upcoming: {
    id: 'video-003',
    title: 'Movie Epic Soundtrack - Teaser Trailer',
    url: '/videos/movie-soundtrack-teaser.mp4',
    views: '8.9K',
    likes: '567',
    releaseDate: '2025-04-05',
    performance: 'upcoming',
    expectedStreams: '250K+',
    status: 'In Review'
  }
};

// 🔄 RE-EXPORT UNIVERSAL DATABASE FUNCTIONS
export { 
  getUsers,
  getLabels,
  getReleases as getAllReleases,
  getSongs as getAllSongs,
  getStats,
  getFilteredDataForRole,
  getUsersByRole,
  getReleasesByArtist,
  getUserById,
  getReleasesByStatus
};

// 🎯 STREAMING PLATFORMS (from Universal Database)
export const STREAMING_PLATFORMS = MockDB.STREAMING_PLATFORMS.reduce((acc, platform) => {
  acc[platform.id] = { 
    name: platform.name, 
    streams: platform.totalStreams, 
    revenue: platform.totalRevenue 
  };
  return acc;
}, {});

// ⚠️ DEPRECATION NOTICE
console.warn('📢 DEPRECATION NOTICE: lib/mockData.js is now a compatibility layer. Please use lib/mockDatabase.js for new development.');

export default {
  ARTISTS,
  ADMINS,
  RELEASES,
  SONGS,
  LABELS,
  MOCK_VIDEOS,
  STREAMING_PLATFORMS,
  getArtistById,
  getApprovedArtistsByLabel,
  getDashboardStats,
  getUsers,
  getLabels,
  getReleases,
  getSongs,
  getStats,
  getFilteredDataForRole
};