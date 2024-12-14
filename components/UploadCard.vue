<template>
  <div class="bg-white shadow-sm sm:rounded-lg">
    <div class="w-full px-4 py-5 sm:p-6">
      <h3 class="text-base font-semibold text-gray-900">Upload your file</h3>
      <div class="mt-2 text-sm text-gray-500">
        <p>
          <span class="font-semibold">PC Users:</span> Find and upload your save file located in
          <span class="rounded bg-gray-100 px-1 font-mono text-gray-800"
            >%APPDATA%\..\LocalLow\Gameloft\Disney Dreamlight Valley\</span
          >
        </p>
        <p>
          <span class="font-semibold">Steam Users:</span> Find and upload your save file located in
          <span class="rounded bg-gray-100 px-1 font-mono text-gray-800"
            >%APPDATA%\..\LocalLow\Gameloft\Disney Dreamlight Valley\steam_[id]_r</span
          >
          where <span class="font-mono text-gray-800">[id]</span> is your Steam ID.
        </p>
      </div>
      <form
        class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
        @dragover.prevent
        @dragenter.prevent="isDragging = true"
        @dragleave="isDragging = false"
        @drop.prevent="handleDrop"
      >
        <label
          id="fileUploadContainer"
          for="file-upload"
          class="col-span-full block cursor-pointer rounded-lg border border-dashed"
          :class="[isDragging ? 'border-sky-500 bg-sky-50' : 'border-gray-900/25']"
        >
          <div class="px-6 py-10 text-center">
            <icon name="ic:outline-upload-file" class="mx-auto size-12 text-gray-300" aria-hidden="true" />
            <div class="mt-4 flex justify-center text-sm text-gray-600">
              <span v-if="!fileName" class="font-semibold text-sky-600 hover:text-sky-500">Upload a file</span>
              <span v-else class="font-semibold text-gray-700">Selected file: {{ fileName }}</span>
              <p v-if="!fileName" class="pl-1">or drag and drop</p>
              <p v-else class="pl-1 text-gray-500">(Click to change file)</p>
            </div>
            <p v-if="!fileName" class="text-xs text-gray-600">profile.json up to 10MB</p>
          </div>
          <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="handleFileUpload" />
        </label>
      </form>

      <div class="mt-6 gap-x-4">
        <!-- Advanced Mode with Decryption Key -->
        <SwitchGroup as="div" class="col-span-2 flex items-center">
          <Switch
            v-model="advancedMode"
            :class="[
              advancedMode ? 'bg-sky-600' : 'bg-gray-200',
              'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 focus:outline-hidden',
            ]"
          >
            <span
              aria-hidden="true"
              :class="[
                advancedMode ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block size-5 transform rounded-full bg-white ring-0 shadow-sm transition duration-200 ease-in-out',
              ]"
            />
          </Switch>
          <SwitchLabel as="span" class="ml-3 text-sm">
            <span class="font-medium text-gray-900">Advanced Mode</span>
          </SwitchLabel>
        </SwitchGroup>

        <div v-if="advancedMode">
          <div>
            <div class="mt-4 flex items-center space-x-3">
              <label for="decryption-key" class="shrink-0 font-medium text-gray-900"> Decryption Key </label>
              <input
                id="decryption-key"
                v-model="decryptionKey"
                type="text"
                name="decryption-key"
                placeholder="Enter your key"
                class="block w-full max-w-sm rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <span class="text-sm text-gray-500"
              >In the unlikely event that the key is changed and released, enter it here.</span
            >
          </div>

          <button
            type="button"
            class="shadow-xs mt-2 inline-flex items-center gap-x-1.5 rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
            @click="processFile"
          >
            Re-Decrypt
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';

const isDragging = ref(false);
const file = ref(null);
const fileName = ref('');

const advancedMode = ref(false);
const decryptionKey = ref(useRuntimeConfig().public.decryptionKey);

const emit = defineEmits(['process-file']);

const handleDrop = (event) => {
  if (event.dataTransfer.files[0]) {
    file.value = event.dataTransfer.files[0];

    processFile();
  }
  isDragging.value = false;
};

const handleFileUpload = (event) => {
  const uploadedFile = event.target.files[0];
  if (uploadedFile) {
    file.value = uploadedFile;
    fileName.value = uploadedFile.name;

    processFile(file.value);
  }
};

watch(file, (newFile) => {
  if (newFile) {
    fileName.value = newFile.name;
    emit('process-file', { file: newFile, userDecryptionKey: decryptionKey.value });
  }
});

const processFile = () => {
  emit('process-file', {
    file: file.value,
    userDecryptionKey: decryptionKey.value || useRuntimeConfig().public.decryptionKey,
  });
};
</script>
