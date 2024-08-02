<script setup>
import {useMouse} from './composables/mouse.js'

const { x, y } = useMouse()

</script>


<template>
    <h1>Mouse xxx position is at:  {{x}}, {{y}}</h1>
</template>