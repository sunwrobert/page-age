class DataProvider {
  promiseHelper = (url, method = "GET", params = {}) => {
    return new Promise((resolve, reject) => {
      window.FB.api(url, method, params, function(response) {
        if (response.error) {
          response.error.error_user_msg ? reject(response.error.error_user_msg) : reject(response.error.message);
        } else {
          if(response.data){
            resolve(response.data);
          }
          resolve(response);
        }
      });
    });
  };

  loadPages = () => {
    return this.promiseHelper("/me/accounts");
  };

  loadPublishedPagePosts = pageId => {
    return this.promiseHelper(`${pageId}/feed`, "GET", {
      fields: "created_time,message,is_published",
    });
  }

  loadUnpublishedPagePosts = pageId => {
    return this.promiseHelper(`${pageId}/promotable_posts`, "GET", {
      fields: "created_time,message,is_published,scheduled_publish_time",
      is_published: false
    });
  };

  loadPostViews = (pageId, postId) => {
    return this.promiseHelper(
      `${pageId}_${postId}/insights/post_impressions_unique`
    );
  };

  writePost = (pageId, params) => {
    return this.promiseHelper(
      `/${pageId}/feed?fields=created_time,id,message,is_published,scheduled_publish_time`,
      "POST",
      params
    );
  };
}

export default new DataProvider();
