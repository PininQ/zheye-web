<template>
  <el-row :gutter="20">
    <el-col v-for="column of columnList" :key="column.id" :span="8">
      <el-card :body-style="{ padding: '0px' }">
        <div class="column-wrap">
          <el-image class="image" :src="column.avatar" :alt="column.title" fit="fill" />
          <h5>{{ column.title }}</h5>
          <div class="des">
            <p>{{ column.description }}</p>
          </div>
          <div class="btn">
            <el-button type="primary" plain>进入专栏</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

export interface ColumnProps {
  id: string
  title: string
  avatar?: string
  description: string
}

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

<style>
.column-wrap {
  display: flex;
  /* align-content: center; */
  justify-content: center;
  flex-wrap: wrap;
  padding: 15px;
}

.column-wrap .image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
}
.column-wrap h5 {
  width: 100%;
  text-align: center;
}
.column-wrap .des {
  width: 100%;
  height: 60px;
  margin-bottom: 20px;
}
.column-wrap .des p {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.column-wrap .btn {
  width: 100%;
  text-align: center;
}
</style>
