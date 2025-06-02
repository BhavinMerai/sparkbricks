import React from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function UserProfileCard() {
  const { userProfile } = useAuth();

  if (!userProfile) {
    return null; // or a loading spinner
  }

  const fullName = userProfile.first_name && userProfile.last_name
    ? userProfile.first_name + ' ' + userProfile.last_name
    : userProfile.username;

  return (
    <div className="flex items-center space-x-4 bg-white text-black rounded p-2 shadow-md">
      {/* Placeholder for user photo */}
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
        {userProfile.first_name ? userProfile.first_name[0] : userProfile.username[0]}
      </div>
      <div className="flex flex-col">
        <span className="font-semibold">{fullName}</span>
        <span className="text-sm text-gray-600">{userProfile.email}</span>
        {userProfile.bio && <span className="text-xs text-gray-500">{userProfile.bio}</span>}
        <Link href="/profile/edit">
          <a className="text-blue-600 hover:underline text-xs mt-1">Edit Profile</a>
        </Link>
      </div>
    </div>
  );
}
