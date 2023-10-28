import React, { useState, useEffect } from 'react';

function ContentPage() {
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageId, setImageId] = useState(null); // State to store the image ID

  useEffect(() => {
    // Fetch image data here and set the imageId.
    fetchImageData().then((data) => {
        setImageId(data._id); // Assuming "_id" is the field representing the image ID in your data.
        setDescription(data.description);
        // Other necessary code for setting initial values.
    });
}, []);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('img', imageFile);

    const endpoint = isEditing ? `update/${imageId}` : 'upload'; // Determine the endpoint based on editing or uploading

    await fetch(`http://localhost:5000/image/${endpoint}`, {
      method: isEditing ? 'PUT' : 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));

    console.log('Description:', description);
    console.log('Image File:', imageFile);

    // Clear form and exit editing mode
    setDescription('');
    setImageFile(null);
    setIsEditing(false);
  };

  return (
    <div>
      <h1>Content Page</h1>
      {isEditing ? (
        <div>
          <h2>Edit Content</h2>
          <form method='POST' encType='multipart/form-data'>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Upload Image:</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button type="button" onClick={handleUpload}>
              Save
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2>View Content</h2>
          <p>Description: {description}</p>
          {/* Display the image here if available */}
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Uploaded Image"
              width="200"
            />
          )}
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default ContentPage;