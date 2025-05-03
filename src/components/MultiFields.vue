<script setup>
import { ref, computed, onMounted } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'text',
  },
  label: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  rules: {
    type: String,
    required: false,
  },
  error: {
    type: String,
    required: false,
  },
  options: {
    type: Array,
    required: false,
  },
  viewLabel: {
    type: String,
    required: false,
    default: 'label'
  },
  viewValue: {
    type: String,
    required: false,
    default: 'value'
  },
})

const normalizedOptions = ref([])
const searchQuery = ref('')
const isOpen = ref(false)
const highlightedIndex = ref(-1)

const filteredOptions = computed(() => {
  if (!props.options) return []
  return props.options.filter(option =>
      String(option[props.viewLabel]).toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

onMounted(() => {
  if (!props.options) {
    normalizedOptions.value = []
    return
  }

  if (typeof props.options[0] === 'string') {
    normalizedOptions.value = props.options.map((item) => ({
      [props.viewLabel]: item
    }))
  }
  else if (typeof props.options[0] === 'object') {
    normalizedOptions.value = props.options.map(option => {
      if (props.viewValue in option && props.viewLabel in option) {
        return option
      }
    })
  }
})

function selectOption(option) {
  emit('update:modelValue', option[props.viewValue])
  searchQuery.value = option[props.viewLabel]
  isOpen.value = false
}

function handleBlur() {
  setTimeout(() => {
    isOpen.value = false
    if (props.modelValue && props.options) {
      const selected = props.options.find(
          opt => opt[props.viewValue] === props.modelValue
      )
      if (selected) {
        searchQuery.value = selected[props.viewLabel]
      }
    }
  }, 200)
}

function updateValue(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="field">
    <div v-if="props.label">
      {{ props.label }}
    </div>
    <input
        v-if="['text', 'password', 'email', 'time'].includes(props.type)"
        :placeholder="props.placeholder"
        :type="props.type"
        :value="props.modelValue"
        class="input"
        @input="updateValue"
    />

    <textarea
        v-else-if="props.type === 'textarea'"
        :placeholder="props.placeholder"
        :value="props.modelValue"
        class="input textarea"
        @input="updateValue"
    />

    <select
        v-else-if="props.type === 'select'"
        :value="props.modelValue"
        class="input"
        @change="updateValue"
    >
      <option
          v-for="option in normalizedOptions"
          :value="option[props.viewValue]"
      >
        {{ option[props.viewLabel] }}
      </option>
    </select>

    <div v-else-if="props.type === 'combobox'" class="combobox-container">
      <div class="combobox-input-container">
        <input
            v-model="searchQuery"
            :placeholder="props.placeholder"
            class="input combobox-input"
            @focus="isOpen = true"
            @input="isOpen = true"
            @blur="handleBlur"
        />
      </div>

      <ul v-show="isOpen" class="combobox-dropdown">
        <li
            v-for="(option, index) in filteredOptions"
            :key="index"
            @mousedown="selectOption(option)"
            :class="{ 'combobox-highlighted': index === highlightedIndex }"
        >
          {{ option[props.viewLabel] }}
        </li>
        <li v-if="filteredOptions.length === 0" class="combobox-empty">
          Ничего не найдено
        </li>
      </ul>
    </div>

    <div v-if="props.error" class="error">{{ props.error }}</div>
  </div>
</template>

<style scoped>
.field {
  padding-bottom: 10px;
}

.input {
  width: 100%;
  margin: 5px 0;
  padding: 5px 10px;
  border-radius: 0;
  border: 1px #999 solid;
}

.error {
  color: #8a0404;
  font-size: 12px;
  font-style: italic;
}

.combobox-container {
  position: relative;
}

.combobox-input-container {
  display: flex;
}

.combobox-input {
  width: 100%;
  border-radius: 0;
  margin-right: 0;
}

.combobox-dropdown {
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #999;
  border-top: none;
  background: white;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 100;
}

.combobox-dropdown li {
  padding: 5px 10px;
  cursor: pointer;
}

.combobox-dropdown li:hover,
.combobox-highlighted {
  background-color: #f0f0f0;
}

.combobox-empty {
  color: #888;
  font-style: italic;
}
</style>