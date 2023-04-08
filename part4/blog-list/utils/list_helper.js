function dummy() {
    return 1;
}

function totalLikes(blogs = []) {
    return blogs.reduce(function (acc, curr) {
        if (curr.likes !== undefined) {
            return acc + curr.likes;
        }
        return acc;
    }, 0);
}

function favoriteBlog(blogs = []) {
    if (blogs.length < 1) {
        return;
    }
    const f_blog = blogs.reduce(function (prev, curr) {
        if (prev.likes < curr.likes) {
            return curr;
        }
        return prev;
    });
    return {
        author: f_blog.author,
        likes: f_blog.likes,
        title: f_blog.title
    };
}

function mostBlogs(blogList = []) {
    if (blogList.length < 1) {
        return;
    }

    const memo = Object.create(null);
    let author;
    let blogs = -1;

    blogList.forEach(function (el) {
        const a = el.author;
        if (memo[a] === undefined) {
            memo[a] = 1;
        } else {
            memo[a] += 1;
        }
        if (memo[a] > blogs) {
            author = a;
            blogs = memo[a];
        }
    });

    return Object.freeze({
        author,
        blogs
    });
}

function mostLikes(blogList = []) {
    if (blogList.length < 1) {
        return;
    }
    const memo = Object.create(null);
    let author;
    let likes = -1;

    blogList.forEach(function (el) {
        const a = el.author;
        if (memo[a] === undefined) {
            memo[a] = el.likes;
        } else {
            memo[a] += el.likes;
        }
        if (memo[a] > likes) {
            author = a;
            likes = memo[a];
        }
    });

    return Object.freeze({
        author,
        likes
    });
}

module.exports = Object.freeze({
    dummy,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    totalLikes
});