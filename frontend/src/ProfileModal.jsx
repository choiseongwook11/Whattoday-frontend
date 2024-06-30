import React, { useState } from 'react';
import styles from './ProfileModal.module.css';

const ProfileModal = ({ isOpen, onClose, onSave }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSave = () => {
    onSave(selectedImage);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>프로필 사진 변경</h2>
        <label className={styles.fileInputLabel}>
          사진 업로드
          <input type="file" accept="image/*" onChange={handleImageChange} className={styles.fileInput} />
        </label>
        {selectedImage && <img src={selectedImage} alt="Selected Profile" className={styles.previewImage} />}
        <button onClick={handleSave}>저장</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>
  );
};

export default ProfileModal;
