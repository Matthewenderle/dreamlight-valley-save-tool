<template>
  <div class="my-4 space-x-2 text-sm text-gray-500">
    <button
      type="button"
      class="shadow-xs inline-flex items-center gap-x-1.5 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
      @click.prevent="downloadModifiedJson"
    >
      Download Decrypted JSON
      <icon name="material-symbols:download-for-offline-outline" class="-mr-0.5 size-5" aria-hidden="true" />
    </button>

    <button
      type="button"
      class="shadow-xs inline-flex items-center gap-x-1.5 rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
      @click.prevent="downloadBackup"
    >
      Download Backup
      <icon name="material-symbols:download-for-offline-outline" class="-mr-0.5 size-5" aria-hidden="true" />
    </button>
  </div>
  <div class="mb-6 mt-2 text-sm text-gray-500">
    <h3 class="text-base font-semibold text-gray-900">Make Changes</h3>
    <div class="mt-2 text-sm text-gray-500">
      <p>You can make changes to the decrypted save data below. Once you're done, click the "Download JSON" button.</p>
      <p>Be careful to not make incorrect changes or it will break your save file.</p>
    </div>
  </div>
  <ClientOnly>
    <JsonEditorVue v-model="modifiedJson" :modes="['tree']" :stringified="true" />
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import JsonEditorVue from 'json-editor-vue';

const props = defineProps({
  input: {
    type: Object,
    required: true,
  },
});

const modifiedJson = ref(null);

onMounted(() => {
  modifiedJson.value = structuredClone(JSON.parse(props.input));
});

const getDate = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return date;
};

const downloadBackup = () => {
  const blob = new Blob([JSON.stringify(props.input, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dreamlight-valley-save-backup-${getDate()}.json`;

  a.click();
  URL.revokeObjectURL(url);
};

const downloadModifiedJson = () => {
  const blob = new Blob([JSON.stringify(modifiedJson.value, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dreamlight-valley-modified-save-${getDate()}.json`;

  a.click();
  URL.revokeObjectURL(url);
};
</script>
