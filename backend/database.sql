CREATE DATABASE IF NOT EXISTS social_network

DROP TABLE IF EXISTS user;

CREATE TABLE User (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT ,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL,
    avatar VARCHAR(200), 
    isAdmin BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (id)
) ENGINE=InnoDB CHARSET=utf8mb4

DROP TABLE IF EXISTS post;

CREATE TABLE Post (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT ,
    content VARCHAR(255) NOT NULL,
    attachment VARCHAR(255) NOT NULL,
    comments INT NOT NULL DEFAULT 0,
    likes INT NOT NULL DEFAULT 0,
    userId SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_user_id FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB CHARSET=utf8mb4

CREATE TABLE Comment (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT ,
    comment VARCHAR(255) NOT NULL,
    likes INT NOT NULL DEFAULT 0,
    userId SMALLINT UNSIGNED NOT NULL,
    postId SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_comment_user_id FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_comment_post_id FOREIGN KEY (postId) REFERENCES Post(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB CHARSET=utf8mb4

CREATE TABLE Likes (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT ,
    userCommentId SMALLINT UNSIGNED NOT NULL,
    userPostId SMALLINT UNSIGNED NOT NULL,
    postId SMALLINT UNSIGNED NOT NULL,
    commentId SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_like_comment_id FOREIGN KEY (commentId) REFERENCES Comment(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_like_post_id FOREIGN KEY (postId) REFERENCES Post(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_user_comment_id FOREIGN KEY (userCommentId) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_user_post_id FOREIGN KEY (userPostId) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB CHARSET=utf8mb4