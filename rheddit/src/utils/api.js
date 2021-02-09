import axios from "axios";

const request = axios.create({
  baseURL: "https://rh-nc-news.herokuapp.com/api",
});

export const fetchAllTopics = () => {
  return request.get("/topics").then(({ data: { topics } }) => {
    return topics;
  });
};

export const fetchArticles = (topic, author, sort_by, order) => {
  return request
    .get("/articles", { params: { topic, author, sort_by, order } })
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

export const addItem = (type, newItem) => {
  return request.post(`/${type}`, newItem).then(({ data }) => data);
};
