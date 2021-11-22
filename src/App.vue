<template>
  <div id="app">
    <GlobalHeader :user="currentUser" />
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          v-model="emailVal"
          :rules="emailRules"
          placeholder="请输入邮箱地址"
          type="text"
          ref="inputRef"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          v-model="passwordVal"
          :rules="passwordRules"
          placeholder="请输入密码"
          type="password"
        ></validate-input>
      </div>

      <template #submit>
        <button class="btn btn-danger">提交</button>
      </template>
    </validate-form>
    <ColumnList :list="list" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'

const currentUser: UserProps = {
  isLogin: true,
  name: 'China Dci',
}
const testProps: ColumnProps[] = [
  {
    id: '5f3e86d62c56ee13bb83096c',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg',
    title: '铺先生',
    description: '酒店售货机，酒店经营，共享经济，新零售，共享数据线，关注灵趣科技，了解更多',
  },
  {
    id: '5f3e86d62c56ee13bb83096b',
    // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e3a17c305b1070f455202.jpg',
    title: 'Vehicle攻城狮',
    description: '半吊子系统和程序狗，沉迷高端理论，日渐消瘦。',
  },
  {
    id: '5f4db92abb821789a5490ed3',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/6183abd6fc0f930997b02815.jpg',
    title: '帅气专栏11-废品回收',
    description: '这是Akira的专栏',
  },
  {
    id: '5f3e86d62c56ee13bb83096a',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg',
    title: 'CATTI和MTI考研考试资料与资讯',
    description: '公号：高斋CATTI，细致讲解让翻译学习更轻松！',
  },
  {
    id: '5f3e86d62c56ee13bb830969',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e3a17c305b1070f455202.jpg',
    title: '我不是鞋神',
    description: '鞋神号：  sunmen123123',
  },
  {
    id: '5f3e86d62c56ee13bb830968',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41b8b7d9c60b68cdd1ef.jpg',
    title: '爱生活爱眼睛',
    description: '愿你有一颗热爱生活的心和一双不老的眼睛！',
  },
]

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    ColumnList,
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const inputRef = ref<null | HTMLElement>(null)
    const emailVal = ref('')
    const emailRules: RulesProp = [
      { type: 'require', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱地址' },
    ]

    const passwordVal = ref('')
    const passwordRules: RulesProp = [{ type: 'require', message: '密码不能为空' }]

    const onFormSubmit = (result: boolean) => {
      console.log('1234', result)
    }

    return {
      currentUser,
      list: testProps,
      inputRef,
      emailVal,
      emailRules,
      passwordVal,
      passwordRules,
      onFormSubmit,
    }
  },
})
</script>

<style>
#app {
  width: 100%;
  padding: 0 20px;
  overflow-x: hidden;
}
</style>
