<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar"
            :alt="column.title"
            class="rounded-circle border border-light my-3"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <router-link :to="`/column/${column.id}`" class="btn btn-outline-primary">
            进入专栏
          </router-link>
          <!-- <router-link
              :to="{ name: 'column', params: { id: column.id } }"
              class="btn btn-primary"
              plain
            >
              进入专栏
            </router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '@/datas/testData'

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      require: true,
    },
  },
  setup(props) {
    const columnList = computed(() => {
      const lists = props.list || []
      if (lists) {
        lists.map((column) => {
          if (!column.avatar) {
            column.avatar = require('@/assets/avatar.jpg')
          }
          return column
        })
      }
      return lists
    })

    return {
      columnList,
    }
  },
})
</script>

<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>
