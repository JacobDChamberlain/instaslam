// class User {
//     constructor(userId) {
//         this.userId = userId;
//         this.photos = [];
//         this.followers = [];
//         this.followees = [];
//     }


// }

// no code
// class Instagram {
//     constructor() {
//         // Write code here...
//     }

//     postPhoto(userId, photoId) {
//         // Write code here..
//     }

//     getFeed(userId) {
//         // Write code here..
//     }

//     follow(followerId, followeeId) {
//         // Write code here..
//     }

//     unfollow(followerId, followeeId) {
//         // Write code here..
//     }

// }

// first attempt
// class Instagram {
//     constructor() {
//         // Write code here...

//         this.photos = {};
//         this.feed = {};
//         this.followers = {};
//         this.followees = {};

//     }

//     postPhoto(userId, photoId) {
//         // Write code here..
//         this.photos[userId].push(photoId);
//         this.feed[userId].push(this.photos[userId]);
//     }

//     getFeed(userId) {
//         // Write code here..
//         return this.feed[userId];
//     }

//     follow(followerId, followeeId) {
//         // Write code here..

//         this.followers[followerId].push(followeeId);
//     }

//     unfollow(followerId, followeeId) {
//         // Write code here..

//         // remove followeeId from list of followees
//         // which should be in this.followers[followerId]
//     }

// }

class Instagram {
    constructor() {
        // Write code here...

        this.feed = {}; // where feed[userId] contains list of photos, sorted by date posted
        this.photos = {}; // where photos[userId] contains list of photo arrays, where photo[0] is photoId and photo[1] is datePosted
        this.followers = {}; // where followers[userId] contains list of userIds that userId follows
        this.datePosted = 0; // initial date of photo post, in order to sort photos in feed by date.
    }

    postPhoto(userId, photoId) {
        // Write code here..

        // O(n)


        const addToFeed = (userId, photoId) => {
            if (this.feed[userId] !== undefined) {
                this.feed[userId].push(photoId);
            } else {
                this.feed[userId] = [photoId];
            }
        }


        this.datePosted++;

        if (this.photos[userId] !== undefined) {
            this.photos[userId].push([photoId, this.datePosted]);
            addToFeed(userId, photoId);
        } else {
            this.photos[userId] = [[photoId, this.datePosted]];
            addToFeed(userId, photoId);
        }

    }

    getFeed(userId) {
        // Write code here..

        // O(n)

        // get userId's followers
        // get photos posted by userId's followers
        // place in feed, return

        console.log(this.feed[userId]);
        return this.feed[userId];
    }

    follow(followerId, followeeId) {
        // Write code here..

        // add followee to list of followerId's followers
        if (this.followers[followerId] !== undefined) {
            this.followers[followerId].push(followeeId);
        } else {
            this.followers[followerId] = [followeeId];
        }

        console.log(this.followers[followerId]);

        // add follower's photos to followee's feed
    }

    unfollow(followerId, followeeId) {
        // Write code here..

        // remove followee from list of followerId's followers
        this.followers[followerId] = this.followers[followerId].filter(id => id !== followeeId);
        console.log(this.followers[followerId]);
    }

}

// Test Case
const instagram = new Instagram();

instagram.postPhoto(1,11) // User with id=1 posts a photo with id=11
instagram.getFeed(1) // returns [11]
instagram.postPhoto(2, 12) // User with id=2 posts a photo with id=12
instagram.getFeed(1) // returns [11]
instagram.follow(1,2) // User 1 follows User 2
// instagram.postPhoto(3, 13) // User with id=3 posts a photo with id=13
// instagram.postPhoto(3, 14) // User with id=3 posts a photo with id=14
// instagram.postPhoto(3, 15) // User with id=3 posts a photo with id=15
// instagram.postPhoto(3, 16) // User with id=3 posts a photo with id=16
// instagram.postPhoto(3, 17) // User with id=3 posts a photo with id=17
// instagram.postPhoto(3, 18) // User with id=3 posts a photo with id=18
// instagram.postPhoto(3, 19) // User with id=3 posts a photo with id=19
// instagram.getFeed(2) // returns [12]
// instagram.follow(2,3) // User 2 follows User 3
// instagram.getFeed(2) // returns [19, 18, 17, 16, 15, 14, 13, 12]
// instagram.postPhoto(4, 20) // User with id=4 posts a photo with id=20
// instagram.postPhoto(4, 21) // User with id=4 posts a photo with id=21
// instagram.postPhoto(4, 22) // User with id=4 posts a photo with id=22
// instagram.postPhoto(4, 23) // User with id=4 posts a photo with id=23
// instagram.follow(2,4) // User 2 follows User 4
// instagram.getFeed(2) // returns [23, 22, 21, 20, 19, 18, 17, 16, 15, 14]
// instagram.unfollow(2,3) // User 2 unfollows User 3
// instagram.getFeed(2) // returns [ 23, 22, 21, 20, 12 ]
// instagram.unfollow(2,4) // User 2 unfollows User 4
// instagram.getFeed(2) // returns [ 12 ]
