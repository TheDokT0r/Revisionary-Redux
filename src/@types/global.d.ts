export { };

declare global {

    // May be seen by everyone
    interface PublicUserData {
        _id: string;
        username: string;
        profilePicture: string;
        bio: string;
        isOnline: boolean;
        registeredAt: Date;
        lastSeen: Date;
        friends: string[];
        revisionsCreated: string[];
        winStreak: number;
        gamesPlayed: number;
        gamesWon: number;
        secondsPlayed: number;
        revisionsPlayed: [];
        likedRevisions: string[];
        dislikedRevisions: string[];
        playlists: string[];
    }

    // May only be seen by the user itself
    interface PersonalUserData extends PublicUserData {
        email: string;
        password?: string;
        friendRequests: string[];
        friendRequestsSent: string[];
    }


    // For faster loading of Revisions
    interface PreviewRevisionData {
        _id: string;
        title: string;
        description: string;
        isPublic: boolean;
        uploadDate: Date;
        views: number;
        likes: number;
        dislikes: number;
        authorID: string;
        tags: string[];
    }


    // Revisions don't really have any personal data, so they are just public
    interface RevisionData {
        _id: string;
        title: string;
        description: string;
        isPublic: boolean;
        uploadDate: Date;
        views: number;
        likes: number;
        dislikes: number;
        authorID: string;
        tags: string[];
        questions: RevisionQuestions[];
    }

    interface RevisionQuestions {
        question: string;
        options: [{
            answer: string;
            isCorrect: boolean;
        }]
    }
}