import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const getUserPfpURL = async (uid) => {
    try {
        // Get a reference to the file
        // const storageRef = ref(getStorage(), `pfps/${uid}.jpg`);

        //TODO: Remove later. Only here so it would use the default pfp (for now...)
        const storageRef = ref(getStorage(), `gs://revitionary.appspot.com/pfps/index.jpg`);
        // Get the download URL
        const url = await getDownloadURL(storageRef);

        // Return the download URL
        return url;
    } catch (error) {
        console.error(error);
    }
};

export { getUserPfpURL };
