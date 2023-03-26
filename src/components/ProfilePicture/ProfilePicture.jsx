import React from 'react';

function ProfilePicture({ svgString }) {
  return (
    <div
      style={{ width: "100px", height: "100px" }}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
}

export default ProfilePicture;
