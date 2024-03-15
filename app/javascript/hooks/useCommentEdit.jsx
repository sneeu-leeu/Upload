import { useState } from 'react';

// Updated to accept folderId as well
const useCommentEdit = (uploadId, folderId) => {
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentBody, setEditCommentBody] = useState('');

  const handleEditChange = (e) => {
    setEditCommentBody(e.target.value);
  };

  const startEdit = (commentId, currentBody) => {
    setEditCommentId(commentId);
    setEditCommentBody(currentBody);
  };

  const cancelEdit = () => {
    setEditCommentId(null);
    setEditCommentBody('');
  };

  const submitEdit = async (e, commentId) => {
    e.preventDefault();

    try {
      await fetch(`/api/v1/folders/${folderId}/uploads/${uploadId}/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: editCommentBody }),
      });
      cancelEdit();
      // Trigger re-fetch or state update to reflect the comment's changes
    } catch (error) {
      console.error('Failed to edit comment:', error);
      // Handle the error (e.g., show an error message)
    }
  };

  return {
    editCommentId,
    editCommentBody,
    handleEditChange,
    startEdit,
    cancelEdit,
    submitEdit,
  };
};

export default useCommentEdit;