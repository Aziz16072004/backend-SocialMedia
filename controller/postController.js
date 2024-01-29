const Post = require("../models/post");
const User = require("../models/user");

const uploadPost = async (req, res) => {
    try {
        const newPost = new Post({
            name: req.body.name,
            image: `uploads/${req.file.filename}`,
            userId: req.body.userId,
        });
        await newPost.save()
        await newPost.populate({
            path: 'userId',
            model: 'User'
        });
        res.status(201).send(newPost);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const showPost = async (req,res) =>{
    postId = req.query.postId
    try {
        const post = await Post.findById(postId).sort({createdAt:-1}).populate({
            path: 'peopleRated.user',
            select: 'username profileImg -_id ',
            model: 'User'
        }).populate({
            path: 'comments.user',
            select: 'username profileImg -_id ',
            model: 'User'
        });
        if (post) {
          res.json(post);
        } else {
          res.status(404).json({ error: 'Post not found' });
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
const showPostJustForProfile = async (req,res) =>{
    const userId = req.query.userId
    try {
        const post = await Post.find( { userId: userId }).select("image rates comments").sort({createdAt:-1})
        if (post) {
          res.json(post);
        } else {
          res.status(404).json({ error: 'Post not found' });
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({createdAt:-1}).populate({
            path: 'userId',
            model: 'User'
        }).populate({
            path: 'peopleRated.user',
            select: 'username profileImg _id',
            model: 'User'
        }).populate({
            path: 'comments.user',
            select: 'username profileImg -_id',
            model: 'User'
        });
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const addRate = async (req, res) => {
    const data = {
        postId: req.body.postId,
        userId: req.body.userId,
    }

    try {
        const posts = await Post.findById(data.postId);

        if (!posts) {
            return res.status(404).json({ error: "Post not found" });
        }
        let test = false;
        if (posts.peopleRated && posts.peopleRated.length > 0) {
            
            test = posts.peopleRated.find((element) => element.user.toString() === data.userId);
        }
        if (test) {
            return res.json({ error: "User has already rated this post" });
        } else {
            posts.rates += 1;
            posts.peopleRated.push({ user: data.userId });
            posts.save();
            res.status(200).send(posts);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const addComment = async (req,res) =>{
    const data = {
        postId: req.body.postId,
        userId: req.body.userId,
        comment: req.body.comment,
    }
    try {
        const posts = await Post.findById(data.postId);

        if (!posts) {
            return res.status(404).json({ error: "Post not found" });
        }else {
            
            posts.comments.push({ user:data.userId , comment : data.comment});
            posts.save();
            res.status(200).send(posts);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }

}
const RemoveRate = async (req, res) => {
    const data = {
        postId: req.body.postId,
        userId: req.body.userId,
    }

    try {
        const posts = await Post.findById(data.postId);
        if (!posts) {
            return res.status(404).json({ error: "Post not found" });
        }
        let test = false;
        if (posts.peopleRated && posts.peopleRated.length > 0) {
            test = posts.peopleRated.find((element) => element.user.toString() === data.userId);
        }
        if (test) {
            newPeopleRated = posts.peopleRated.filter(ele => ele.user.toString() !== data.userId)
            posts.peopleRated = newPeopleRated
            posts.rates = posts.rates - 1 
            posts.save()
            return res.json("removing rate");
        } else {
            
            res.status(200).send("user doesn't rated");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const postMarkes = async (req, res) => {
    const data = {
        postId: req.body.postId,
        userId: req.body.userId,
    }
    try {
        const finduser = await User.findById(data.userId);

        if (!finduser) {
            return res.status(404).json({ error: "user not found" });
        }
        let test = false;
        if (finduser.postMarkes && finduser.postMarkes.length > 0) {
            
            test = finduser.postMarkes.find((element) => element.post.toString() === data.postId);
        }
        if (test) {
            newpostMarked = finduser.postMarkes.filter(ele => ele.post.toString() !== data.postId)
            finduser.postMarkes = newpostMarked
            finduser.save()
            res.json(finduser)
        }
         else {
            finduser.postMarkes.push({ post: data.postId });
            finduser.save();
            res.status(200).send(finduser);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {getPosts ,uploadPost,addRate , RemoveRate ,addComment,showPost ,postMarkes,showPostJustForProfile}