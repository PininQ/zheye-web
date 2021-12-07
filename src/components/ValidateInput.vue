<template>
  <div class="validate-input-container pb-3">
    <textarea
      v-if="tag === 'textarea'"
      type="text"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      v-bind="$attrs"
      @blur="validateInput"
      @input="updateValue"
    />
    <input
      v-else
      type="text"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      v-bind="$attrs"
      @blur="validateInput"
      @input="updateValue"
    />
    <div v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue'
import { emitter } from './ValidateForm.vue'

// 邮箱校验格式
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

interface RuleProp {
  type: 'required' | 'email' | 'custom'
  message: string
  validator?: () => boolean
}

export type RulesProp = RuleProp[]

export type TagType = 'input' | 'textarea'

export default defineComponent({
  name: 'Component',
  inheritAttrs: false,
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: {
      type: String,
      default: '',
    },
    tag: {
      type: String as PropType<TagType>,
      default: 'input',
    },
  },
  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue,
      error: false,
      message: '',
    })

    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }

    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every((rule) => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = inputRef.val.trim() !== ''
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            case 'custom':
              passed = rule.validator ? rule.validator() : true
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }

    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })

    return {
      inputRef,
      updateValue,
      validateInput,
    }
  },
})
</script>

<style scoped></style>
