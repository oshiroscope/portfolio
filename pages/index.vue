<template>
  <section class="background">
    <img src="~/assets/images/teaser.png" class="teaser" v-parallax.absY="0.532">
    <div class="container">
      <!-- bio -->
      <div class="box left">
        <div class="thumb">
          <img :src="bio.fields.image.fields.file.url">
        </div>
        <div class="text">
          <h1>{{ bio.fields.name }}</h1>
          <div class="sentence" v-html="$md.render(bio.fields.content)" />
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
      <div class="box right">
        <div class="thumb-small">
          <video :src="bio.fields.animation.fields.file.url" loop autoplay muted playsinline />
        </div>
        <div class="text">
          <h1>Habit</h1>
          <div class="sentence" v-html="$md.render(bio.fields.habit)" />
        </div>
      </div>
      <!-- contents -->
      <div v-for="(post, index) in posts" :key="index" :class="classLeftRight(index)">
        <div class="thumb">
          <img :src="post.fields.image.fields.file.url">
        </div>
        <div class="text">
          <h1>{{ post.fields.title }}</h1>
          <h2>{{ post.fields.keywords }}</h2>
          <div class="sentence" v-html="$md.render(post.fields.content)" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import client from '~/plugins/contentful'
export default {
  methods: {
    classLeftRight (index) {
      if (index % 2 === 0) {
        return 'box left'
      } else {
        return 'box right'
      }
    }
  },
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

<style lang="scss" scoped>
section.background{
  /*フォントの指定*/
  font-family: 'メイリオ', 'Meiryo', 'ヒラギノ角ゴ Pro', 'Hiragino Kaku Gothic Pro', 'Noto Sans Japanese', Osaka, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
  margin: 0;
  padding: 0;
  /*サイトのデフォルトとなる文字の色を指定*/
  color: #333;
}

/*見出しを全て太字で表示 + 文字色を濃い黒に*/
h1, h2, h3, h4, h5, h6 {
  font-weight: bold;
  color: rgb(29, 29, 29);
}

// すべての画像・動画について親要素にサイズが追従するようにする
// https://takayakondo.com/img-max-width-100/
img, video {
  max-width: 100%;
  height: auto;
  width /***/:auto;
}

.teaser{
  width: 100vw; // 画面幅が画像大きい時に合わせて拡大
}

.container{
  background-color: #fff;
  position: relative; // z-indexのために必要
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.box{
  margin: 0 auto; // 中央にalignするよ
  max-width: 1400px; // 拡大しても1400pxよりは大きくならないようにするよ
  padding: 2rem;
  padding-top: 4rem;
  font-size: 20px;
  line-height: 1.6;  /*行間の指定*/
  display: flex; // CSS Gridで子要素を並べるよ
  align-items: center;
}
.left{
  flex-direction: row;
}
.right{
  flex-direction: row-reverse;
}
.thumb{
  flex: 1;
}
.thumb-small{
  flex: 0.9;
}
.text{
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  padding-bottom: 4rem;
  h1 {
    font-size: 2.5rem;
    letter-spacing: 1px;
  }
  h2 {
    font-size: 1.7rem;
  }
  .sentence{
    padding-top: 2rem;
    font-size: 20px;
    text-align: justify;
    text-justify: inter-word;
  }
  .icon{
    font-size: 2.4em;
    color: rgb(48, 48, 48);
  }
}

@media screen and (max-width:992px){
  .box{
    font-size: 14px;
    padding: 0.5rem;
    padding-top: 1rem;
    flex-direction: column;
  }
  .thumb{
    width: 60%;
  }
  .thumb-small{
    width: 54%;
  }
}

@media screen and (max-width:544px){
  .box{
    font-size: 10px;
    padding: 2rem;
    flex-direction: column;
  }
  .thumb{
    width: 60%;
  }
  .thumb-small{
    width: 54%;
  }
  .text{
    padding: 0;
    padding-top: 1rem;
    h1 {
      font-size: 1.5rem;
      letter-spacing: 1px;
    }
    h2 {
      font-size: 1.1rem;
    }
    .sentence{
      font-size: 0.9rem;
      padding-top: 1rem;
    }
  }
}

</style>
