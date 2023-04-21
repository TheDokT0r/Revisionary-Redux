import React from 'react';
import styles from './ProfilePicture.module.scss';

function ProfilePicture({ svgString, width=100, height=100 }) {
  return (
    <div>
      <div
        style={{
            width: `${width}px`,
            height: `${height}px`,
        }}
        dangerouslySetInnerHTML={{ __html: svgString }}
      />
    </div>
  );
}

export default ProfilePicture;
