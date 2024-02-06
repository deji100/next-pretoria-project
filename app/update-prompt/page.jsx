"use client"

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from "@components/Form"

const EditPrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    id: "",
    prompt: "",
    tag: "",
  });

  const router = useRouter();
  const {data: session} = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const editPrompt = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const res = await fetch(`/api/prompt/${post.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        })
      })

      if (res.ok) {
        router.push("/");
      }

    }catch (error) {
      console.log(error)
    }finally {
      setSubmitting(false);
    };
  };

  useEffect(() => {
    const getPromptDetails = async () => {
        const res = await fetch(`/api/prompt/${promptId}`);
        const data = await res.json();
        const {_id, prompt, tag} = data;
        setPost({id: _id, prompt: prompt, tag: tag});
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  return (
    <div>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={editPrompt}
      />
    </div>
  )
}

export default EditPrompt;