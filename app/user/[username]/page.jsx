"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${params.username}`);
      const data = await response.json();
      setUser(data[0]);
    };
    fetchUser();
  }, [params.username]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${user._id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (user?._id) fetchPosts();
  }, [user]);

  return (
    <>
      {user && (
        <Profile
          name={session?.user?.id === user._id ? "Your " : `${user?.name}'s `}
          desc={
            session?.user?.id === user._id
              ? `Welcome to  your profile! Here you will find all the prompts you have created.`
              : `Welcome to  ${user.name}'s profile! Here you will find all the prompts they have created.`
          }
          data={posts}
        />
      )}
    </>
  );
};

export default ProfilePage;
