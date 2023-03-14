import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';

//Creates the seed based on the username + rng
const genPfp = async (username) => {
    const rng = Math.floor(Math.random() * 1000000);

    const avatar = createAvatar(thumbs, {
        seed: username + rng,
        // ... other options
    });

    const svg = avatar.toString();
    console.log({svg});
    return svg;
}

export default genPfp;