import React from 'react'

interface Props {
    src: string;
    size?: number;
}

export default function ProfilePicture({ src, size=50 }: Props) {

    return (
        <div>
            <img
                src={src}
                alt="Profile Picture"
                style={{
                    width: size,
                    height: size,
                }}
            />
        </div>
    )
}
