class Instagram {
    constructor() {
        this.feed = {}; // where feed[userId] contains list of photos, sorted by date posted (photoId)
        this.photos = {}; // where photos[userId] contains list of photo ids posted by userId
        this.followers = {}; // where followers[userId] contains list of users that userId follows
    }


    postPhoto(userId, photoId) {    //* TIME: O(n) (preliminary estimation)
                                    //* SPACE: O()

        // helper to reduce repeated code:
        const addToFeed = (userId, photoId) => {
            if (this.feed[userId] !== undefined) {
                this.feed[userId].push(photoId);
            } else {
                this.feed[userId] = [photoId];
            }
        }

        // add to photos pojo AND to feed.
        if (this.photos[userId] !== undefined) {
            this.photos[userId].push(photoId);
            addToFeed(userId, photoId);
        } else {
            this.photos[userId] = [photoId];
            addToFeed(userId, photoId);
        }

    }


    getFeed(userId) {       //* TIME: O(n) (preliminary estimation)
                            //* SPACE: O()

        this.feed[userId].sort(); // sort by date added (photoId)
        this.feed[userId].reverse(); // newest photos first

        // console.log(this.feed[userId].slice(0,10)); // (for debugging)

        return this.feed[userId].slice(0, 10); // return 10 most recent photos
    }


    follow(followerId, followeeId) {        //* TIME: O(n) (preliminary estimation)
                                            //* SPACE: O()

        // add followee to list of followerId's followers
        if (this.followers[followerId] !== undefined) {
            this.followers[followerId].push(followeeId);
        } else {
            this.followers[followerId] = [followeeId];
        }

        // add followee's photos to follower's feed
        const followeePhotos = this.photos[followeeId]; // get photos from followee

        for (let i = 0; i < followeePhotos.length; i++) { // add to follower's feed
            const photo = followeePhotos[i];
            if (this.feed[followerId] !== undefined) {
                this.feed[followerId].push(photo);
            } else {
                this.feed[followerId] = [photo];
            }
        }
    }


    unfollow(followerId, followeeId) {      //* TIME: O(n) (preliminary estimation)
                                            //* SPACE: O()

        // remove followee from list of followerId's followers
        this.followers[followerId] = this.followers[followerId].filter(id => id !== followeeId);

        // remove followee's photos from followerId's feed
        this.feed[followerId] = this.feed[followerId].filter(id => !this.photos[followeeId].includes(id))
    }
    
}

// Test Case
const instagram = new Instagram();

instagram.postPhoto(1,11) // User with id=1 posts a photo with id=11
instagram.getFeed(1) // returns [11]
instagram.postPhoto(2, 12) // User with id=2 posts a photo with id=12
instagram.getFeed(1) // returns [11]
instagram.follow(1,2) // User 1 follows User 2
instagram.postPhoto(3, 13) // User with id=3 posts a photo with id=13
instagram.postPhoto(3, 14) // User with id=3 posts a photo with id=14
instagram.postPhoto(3, 15) // User with id=3 posts a photo with id=15
instagram.postPhoto(3, 16) // User with id=3 posts a photo with id=16
instagram.postPhoto(3, 17) // User with id=3 posts a photo with id=17
instagram.postPhoto(3, 18) // User with id=3 posts a photo with id=18
instagram.postPhoto(3, 19) // User with id=3 posts a photo with id=19
instagram.getFeed(2) // returns [12]
instagram.follow(2,3) // User 2 follows User 3
instagram.getFeed(2) // returns [19, 18, 17, 16, 15, 14, 13, 12]
instagram.postPhoto(4, 20) // User with id=4 posts a photo with id=20
instagram.postPhoto(4, 21) // User with id=4 posts a photo with id=21
instagram.postPhoto(4, 22) // User with id=4 posts a photo with id=22
instagram.postPhoto(4, 23) // User with id=4 posts a photo with id=23
instagram.follow(2,4) // User 2 follows User 4
instagram.getFeed(2) // returns [23, 22, 21, 20, 19, 18, 17, 16, 15, 14]
instagram.unfollow(2,3) // User 2 unfollows User 3
instagram.getFeed(2) // returns [ 23, 22, 21, 20, 12 ]
instagram.unfollow(2,4) // User 2 unfollows User 4
instagram.getFeed(2) // returns [ 12 ]
