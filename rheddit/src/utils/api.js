import axios from "axios";

const request = axios.create({
  baseURL: "https://rh-nc-news.herokuapp.com/api",
});

export const fetchAllTopics = () => {
  return request.get("/topics").then(({ data: { topics } }) => {
    return topics;
  });
};

export const fetchArticlesByTopic = (topic) => {
  return request
    .get("/articles", { params: { topic } })
    .then(({ data: { articles } }) => articles);
};
