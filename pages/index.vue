<template>
  <section class="background">
    <div class="rellax">
      <img src="~/assets/images/teaser.png" class="teaser">
    </div>
    <div class="container">
      <!-- bio -->
      <div class="post">
        <div class="thumb">
          <img :src="bio.fields.image.fields.file.url">
        </div>
        <div class="post-text">
          <h1>{{ bio.fields.name }}</h1>
          <div class="post-content" v-html="$md.render(bio.fields.content)" />
          <br>
          <div class="icon">
            <a :href="bio.fields.twitter">
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </a>
            <a :href="bio.fields.instagram">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
            <font-awesome-icon :icon="['far', 'envelope']" />
            <!-- <font-awesome-icon icon="envelope" /> -->
          </div>
        </div>
      </div>
      <!-- habit -->
      <div class="post" style="--direction: row-reverse">
        <div class="thumb-small">
          <video :src="bio.fields.animation.fields.file.url" loop autoplay muted playsinline />
        </div>
        <div class="post-text">
          <h1>Habit</h1>
          <div class="post-content" v-html="$md.render(bio.fields.habit)" />
        </div>
      </div>
      <!-- contents -->
      <div v-for="(post, index) in posts" :key="index" :to="'posts/'+post.fields.slug">
        <!-- 左右交互に表示する -->
        <!-- 偶数では左 -->
        <div v-if="index % 2 == 0" class="post" style="--direction: row">
          <div class="thumb">
            <img :src="post.fields.image.fields.file.url">
          </div>
          <div class="post-text">
            <h1>{{ post.fields.title }}</h1>
            <h2>{{ post.fields.keywords }}</h2>
            <div class="post-content" v-html="$md.render(post.fields.content)" />
          </div>
        </div>
        <!-- 奇数では右 -->
        <div v-else class="post" style="--direction: row-reverse">
          <div class="thumb">
            <img :src="post.fields.image.fields.file.url">
          </div>
          <div class="post-text">
            <h1>{{ post.fields.title }}</h1>
            <h2>{{ post.fields.keywords }}</h2>
            <div class="post-content" v-html="$md.render(post.fields.content)" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import client from '~/plugins/contentful'
export default {
  // https://blog.cloud-acct.com/posts/blog-contentful-api/
  async asyncData ({ params }) {
    let posts = []
    await client.getEntries({
      content_type: 'post',
      order: '-sys.createdAt'
    }).then(res => (posts = res.items)).catch(console.error)

    let bio
    await client.getEntry('3izb3S0tzffNV26dkpnFrJ').then(res => (bio = res)).catch(console.error)

    return { posts, bio }
  }
}
</script>

<style lang="scss">
/*見出しを全て太字で表示 + 文字色を濃い黒に*/
h1, h2, h3, h4, h5, h6 {
  font-weight: bold;
  color: rgb(29, 29, 29);
}

h1 {
  font-size: 1.9rem;
  // margin: 0 0 2rem;
  letter-spacing: 1px;
}

h2 {
  font-size: 1.7rem;
  // margin: 3rem 0 2rem;
  // padding: .4rem 0;
  // letter-spacing: 1px;
  // border-bottom: solid 5px #03162f;
}

// すべての画像・動画について親要素にサイズが追従するようにする
// https://takayakondo.com/img-max-width-100/
img, video {
  max-width: 100%;
  height: auto;
  width /***/:auto;
}

section.background{
  /*フォントの指定*/
  font-family: 'メイリオ', 'Meiryo', 'ヒラギノ角ゴ Pro', 'Hiragino Kaku Gothic Pro', 'Noto Sans Japanese', Osaka, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
  /*行間の指定*/
  line-height: 1.6;
  margin: 0;
  padding: 0;
  /*サイトのデフォルトとなる文字の色を指定*/
  color: #333;
}

.teaser{
  width: 100vw; // 画面幅が画像大きい時に合わせて拡大
}

.container{
  margin: 0 auto; // 中央にalignするよ
  max-width: 1400px; // 拡大しても1400pxよりは大きくならないようにするよ
  padding-top: 4rem;
}

.post{
  padding: 2rem;
  padding-top: 4rem;
  display: flex; // CSS Gridで子要素を並べるよ
  flex-direction: var(--direction);
}

.thumb{
  flex: 1;
}

.thumb-small{
  flex: 0.9;
}

.post-text{
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  padding-bottom: 4rem;
}

.post-content{
  padding-top: 2rem;
  font-size: 20px;
  text-align: justify;
  text-justify: inter-word;
}

.icon{
  font-size: 2.4em;
  color: rgb(48, 48, 48);
}
// .post{
//   display: grid; // CSS Gridで子要素を並べるよ
//   grid-template-columns: 1fr 2fr;
//   padding: 2rem;
//   padding-top: 4rem;
// }

// .thumb{
//   grid-column: var(--grid-column);
// }

// .post-text{
//   grid-column: var(--grid-column);
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding: 2rem;
//   padding-bottom: 4rem;
// }

// .post-content{
//   padding-top: 2rem;
//   font-size: 22px;
// }

// .container {
//   margin: 0 auto;
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
// }

// .title {
//   font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
//     'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
//   display: block;
//   font-weight: 300;
//   font-size: 100px;
//   color: #35495e;
//   letter-spacing: 1px;
// }

// .subtitle {
//   font-weight: 300;
//   font-size: 42px;
//   color: #526488;
//   word-spacing: 5px;
//   padding-bottom: 15px;
// }

// .links {
//   padding-top: 15px;
// }
</style>
