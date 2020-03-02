<template>
  <div class="all">
    <div class="rellax">
      <div class="teaser">
        <img src="~/assets/images/teaser.png">
      </div>
    </div>
    <div class="background">
      <div class="posts">
        <div v-for="(post, index) in posts" :key="index" class="post">
          {{ post.fields.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import client from '~/plugins/contentful'
export default {
  asyncData ({ params }) {
    return client
      .getEntries({
        content_type: 'post',
        order: '-sys.createdAt'
      })
      .then((entries) => {
        return { posts: entries.items }
      })
      .catch(e => console.log(e))
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
