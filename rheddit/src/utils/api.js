import axios from "axios";

const request = axios.create({
  baseURL: "https://rh-nc-news.herokuapp.com/api",
});

export const fetchAllTopics = () => {
  return request.get("/topics").then(({ data: { topics } }) => {
    return topics;
  });
};

export const fetchArticles = (topic, author, sort_by, order, p) => {
  return request
    .get("/articles", { params: { topic, author, sort_by, order, p } })
    .then(({ data: { articles } }) => articles);
};

export const fetchArticleById = (article_id) => {
  return request
    .get(`/articles/${article_id}`)
    .then(({ data: { article } }) => article);
};

export const fetchCommentsByArticleId = (article_id) => {
  return request
    .get(`/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => comments);
};

export const changeVotes = (type, id, vote_count) => {
  return request
    .patch(`/${type}/${id}`, { inc_votes: vote_count })
    .then(({ data }) => data);
};

export const getTopics = () => {
  return request.get("/topics").then(({ data: { topics } }) => topics);
};

export const addItem = (newItem, article_id) => {
  let path = "/articles";
  if (article_id) path += `/${article_id}/comments`;
  return request.post(path, newItem).then(({ data }) => data);
};

export const deleteItem = (type, id) => {
  return request.delete(`/${type}/${id}`);
};

export const getAllUsers = () => {
  return request.get("/users").then(({ data: { users } }) => users);
};

export const getUser = (username) => {
  return request.get(`/users/${username}`).then(({ data: { user } }) => user);
};

export const getArticleCount = (topic, author) => {
  return request
    .get("/articles", { params: { topic, author, limit: 1000 } })
    .then(({ data: { articles } }) => articles.length);
};
