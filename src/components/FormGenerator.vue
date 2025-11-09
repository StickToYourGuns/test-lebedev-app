<template>
    <form @submit.prevent="onSubmit" class="form">
        <div v-for="field in schema.fields" :key="field.model" class="form__row">
            <label :for="field.model" class="form__label">
                {{ field.label }}
                <span v-if="field.required"> *</span>
            </label>
            <!-- нативную проверку на minlength не добавляю, т.к. она у меня в валидации -->
            <input v-if="field.type !== 'select'"
                :class="field.type === 'checkbox' ? 'form__input form__input--checkbox' : 'form__input'"
                v-model="formData[field.model]" :type="field.type" :id="field.model">

            <select v-else class="form__input" :id="field.model" v-model="formData[field.model]">
                <option class="form__option" v-for="opt in field.options" :key="opt" :value="opt">
                    {{ opt }}
                </option>
            </select>
            <TransitionGroup tag="div" name="slide" class="form__errors">
                <span v-if="errors[field.model]" v-for="error in errors[field.model]" :key="error" class="form__error">
                    {{ error }}
                </span>
            </TransitionGroup>
        </div>

        <button class="form__button" type="submit">
            Отправить
        </button>
    </form>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
    schema: { type: Object, required: true },
    modelValue: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const formData = reactive({ ...props.modelValue })
const errors = reactive({})
const validateByStep = ref(false)

watch(formData, (val) => emit('update:modelValue', { ...val }), { deep: true })
watch(() => props.modelValue, (val) => Object.assign(formData, val), { deep: true })

function validate() {
    Object.keys(errors).forEach(k => delete errors[k])
    let valid = true
    for (const field of props.schema.fields) {
        const value = formData[field.model]
        errors[field.model] = [];

        if (field.required) {
            const empty = field.type === 'checkbox' ? !value : (value == null || value === '' || value.trim() === '')
            if (empty) {
                errors[field.model].push('Обязательное поле')
                valid = false
            }
        }
        if (field.minLength && (value === undefined ? true : value.length < field.minLength)) {
            errors[field.model].push(`Минимум ${field.minLength} символов`)
            valid = false
        }
    }
    return valid
}

function onSubmit() {
    validateByStep.value = true;
    if (validate()) {
        emit('submit', { ...formData })
    }
}

watch(
    formData,
    () => {
        if (validateByStep.value) validate()
    },
    { deep: true }
)
</script>

<style></style>