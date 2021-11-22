<template>
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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'

export default defineComponent({
  name: 'App',
  components: {
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const inputRef = ref<null | HTMLElement>(null)
    const emailVal = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱地址' },
    ]

    const passwordVal = ref('')
    const passwordRules: RulesProp = [{ type: 'required', message: '密码不能为空' }]

    const onFormSubmit = (result: boolean) => {
      if (result) {
        store.commit('login')
        router.push('/')
      }
    }

    return {
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

<style></style>
