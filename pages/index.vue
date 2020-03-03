<template>
  <section class="background">
    <img src="~/assets/images/teaser.png" class="teaser" v-parallax.absY="0.4">
    <div class="container">
      <!-- bio -->
      <div class="post-left">
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
      <div class="post-right" style="--direction: row-reverse">
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
        <div v-if="index % 2 == 0" class="post-left">
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
        <div v-else class="post-right">
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
  background-color: #fff;
  position: relative; // z-indexのために必要
  z-index: 10;
}

.post-left{
  margin: 0 auto; // 中央にalignするよ
  max-width: 1400px; // 拡大しても1400pxよりは大きくならないようにするよ
  padding: 2rem;
  padding-top: 4rem;
  display: flex; // CSS Gridで子要素を並べるよ
  flex-direction: row;
  align-items: center;
}

.post-right{
  margin: 0 auto; // 中央にalignするよ
  max-width: 1400px; // 拡大しても1400pxよりは大きくならないようにするよ
  padding: 2rem;
  padding-top: 4rem;
  display: flex; // CSS Gridで子要素を並べるよ
  flex-direction: row-reverse;
  align-items: center;
}

@media screen and (max-width:1000px){
  .post-left{
    flex-direction: column;
  }

  .post-right{
    flex-direction: column;
  }
}

.thumb{
  flex: 1;
}

.thumb-small{
  flex: 0.9;
}

@media screen and (max-width:1000px){
  .thumb{
    width: 60%;
  }

  .thumb-small{
    width: 54%;
  }
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

</style>
