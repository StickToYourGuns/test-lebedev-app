<template>
  <main class="app__container">
    <h1 class="app__title">Компонент автоформы</h1>
    <section class="form-container form-container--left">
      <Transition name="slide" mode="out-in">
        <span v-if="error" class="form-container__error" key="error">{{ error }}</span>
        <FormGenerator v-else-if="parsedSchema && !result" :schema="parsedSchema" v-model="formData"
          @submit="handleSubmit" key="form" />
      </Transition>
    </section>
    <section class="form-container form-container--right">
      <h2 class="app__subtitle">Тут можно поиграться с JSON</h2>
      <textarea class="form__schema" v-model="defaultJson" name="defaultJson" id="defaultJson"></textarea>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { usePostScriptum } from '@/composables/usePostScriptum'
import FormGenerator from '@/components/FormGenerator.vue'

const formData = ref({})


const defaultJson = ref(`{
  "fields": [
    { "type": "text", "label": "Имя", "model": "name", "required": true },
    { "type": "email", "label": "Электропочта", "model": "email", "required": true },
    { "type": "password", "label": "Пароль", "model": "password", "required": true, "minLength": 6 },
    { "type": "select", "label": "Роль", "model": "role", "options": ["Админ", "Пользователь"], "required": true },
    { "type": "checkbox", "label": "Согласен с условиями", "model": "terms", "required": true }
    ]
}`)

const parsedSchema = ref(null)

const error = ref(null)

function handleSubmit(data) {
  console.log('Данные формы', data);
  alert('Будем считать, что форма отправлена. В консоли данные')
  usePostScriptum()
}

const parseJson = () => {
  error.value = null
  parsedSchema.value = null
  try {
    const obj = JSON.parse(defaultJson.value)
    parsedSchema.value = obj
  } catch (e) {
    error.value = 'Неверный JSON'
  }
}

watch(defaultJson, parseJson)
onMounted(parseJson)
</script>

<style scoped lang="scss"></style>