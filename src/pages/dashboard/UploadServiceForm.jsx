import React, { useState } from 'react';
import uploadService from '@/services/uploadService';

export const UploadServiceForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      alert('Please provide a title and select an image.');
      return;
    }

    setIsLoading(true);

    const result = await uploadService(image, title, description);

    if (result) {
      alert('Service uploaded successfully!');
      // Optionally reset the form after successful upload
      setTitle('');
      setDescription('');
      setImage(null);
    } else {
      alert('Failed to upload service.');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold">Upload Dental Service</h2>

      {/* Title */}
      <input
        type="text"
        placeholder="Service Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />

      {/* Description */}
      <textarea
        placeholder="Service Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full rounded"
      ></textarea>

      {/* Image Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="border p-2 w-full rounded"
        required
      />

      {/* Submit Button */}
      <button
        type="submit"
        className={`bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isLoading}
      >
        {isLoading ? 'Uploading...' : 'Upload Service'}
      </button>
    </form>
  );
};

export default UploadServiceForm ;
