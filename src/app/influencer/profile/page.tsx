'use client'
import React, { useState } from 'react';


import { Toaster, toast } from 'sonner';
import { getUserProfile, IProfileResponse, IUser } from './(helper)';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import ProfileView from './components/ProfileView';
import ProfileEdit from './components/ProfileEdit';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

 const {data: session} = useSession();




  const { isPending, isError, data : user, error, refetch } = useQuery<IProfileResponse>({
        queryKey: ['profile', session?.user?.id],
        queryFn: () => 
            getUserProfile({user_id: session?.user?.id as string}),
        enabled: session?.user?.id ? true : false,
    });





  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };



  return (
    <>
      {isEditing ? (
        <ProfileEdit
          user={user?.data as IUser}
          onCancel={handleCancelEdit}
          isLoading={isLoading}
        />
      ) : (
        <ProfileView user={user?.data as IUser} onEditClick={handleEditClick} />
      )}
      <Toaster position="top-right" richColors expand={true} closeButton />
    </>
  );
};

export default ProfilePage;
