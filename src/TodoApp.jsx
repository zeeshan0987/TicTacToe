import  { useState } from 'react';

function TodoApp() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(file);
  };

  const handleAddVideo = () => {
    if (selectedVideo) {
      const newVideo = {
        id: Date.now(),
        title: selectedVideo.name,
        file: selectedVideo,
        bookmarked: false
      };
      setVideos([...videos, newVideo]);
      setSelectedVideo(null);
    }
  };

  const openModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setShowModal(false);
  };

  const toggleBookmark = (id) => {
    const updatedVideos = videos.map(video =>
      video.id === id ? { ...video, bookmarked: !video.bookmarked } : video
    );
    setVideos(updatedVideos);
  };

  const toggleShowBookmarkedOnly = () => {
    setShowBookmarkedOnly(!showBookmarkedOnly);
  };

  const filteredVideos = showBookmarkedOnly ? videos.filter(video => video.bookmarked) : videos;

  return (
    <div>
      <h1>Todo Video App</h1>
      <div>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
        />
        <button onClick={handleAddVideo}>Add Video</button>
        <button onClick={toggleShowBookmarkedOnly}>
          {showBookmarkedOnly ? "Show All Videos" : "Show Bookmarked Only"}
        </button>
      </div>
      <div>
        <h2>Videos</h2>
        <ul>
          {filteredVideos.map((video) => (
            <li key={video.id} onClick={() => openModal(video)}>
              {video.title}{' '}
              <button onClick={(e) => { e.stopPropagation(); toggleBookmark(video.id); }}>
                {video.bookmarked ? "Unbookmark" : "Bookmark"}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <video controls autoPlay>
              <source src={URL.createObjectURL(selectedVideo.file)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoApp;
