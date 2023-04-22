import React from 'react';
import styles from './ProfilePicture.module.scss';

interface Props {
  svg: string;
  width?: number;
  height?: number;
}

function ProfilePicture({ svg, width=100, height=100 }: Props) {
  return (
    <div>
      <div
        style={{
            width: `${width}px`,
            height: `${height}px`,
        }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}

export default ProfilePicture;
