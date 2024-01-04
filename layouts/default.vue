<template>
  <div ref="background" class="comp z-0 fixed" />
  <div class="" @pointermove="update">
    <div>
      <!--<MainHeader title="Jamal Bendadi, Software Engineer and AI enthusiast" />-->
      <slot />
      <!--<MainFooter title="Jamal Bendadi" />-->
    </div>
  </div>
</template>
<script setup>
import 'swiper/css';
const background = ref(null)
const update = (e) => {
  const { clientX: x, clientY: y } = e
  const el = background.value
  const { left, top, width, height } = el.getBoundingClientRect()
  el.style.setProperty('--posX', `${x - left - width / 2}`)
  el.style.setProperty('--posY', `${y - top - height / 2}`)
}
</script>
<style scoped>
.comp {
  height: 100vh;
  width: 100vw;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed, scroll;
  margin: 0px;
  color: #fff;
  --x: calc(var(--posX, 0) * 1px);
  --y: calc(var(--posY, 0) * 1px);
  background-image:
    linear-gradient(10deg, rgb(211, 255, 215), rgb(0, 0, 0)),
    radial-gradient(90% 100% at calc(30% + var(--x)) calc(0% + var(--y)), rgb(200, 200, 200), rgb(22, 0, 45)),
    radial-gradient(100% 100% at calc(80% + var(--x)) calc(8% + var(--y)), rgb(250, 255, 0), rgb(36, 0, 0)),
    radial-gradient(150% 210% at calc(100% + var(--x)) calc(8% + var(--y)), rgb(20, 175, 125), rgb(0, 200, 255)),
    radial-gradient(100% 100% at calc(100% + var(--x)) calc(30% + var(--y)), rgb(255, 70, 0), rgb(0, 200, 255)),
    linear-gradient(60deg, rgb(255, 0, 0), rgb(120, 86, 255));

  background-blend-mode: overlay, overlay, difference, difference, difference, normal;
}
</style>