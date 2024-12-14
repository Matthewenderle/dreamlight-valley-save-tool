<template>
  <div class="flex min-h-screen w-screen flex-col bg-[#181d57]">
    <div class="flex-grow py-10">
      <header>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-white">Dreamlight Valley Save Tool</h1>
        </div>
      </header>
      <main>
        <div class="mx-auto flex max-w-7xl flex-col gap-y-6 px-4 py-8 sm:px-6 lg:px-8">
          <UploadCard @process-file="processFile" />

          <div class="bg-white shadow-sm sm:rounded-lg">
            <div class="w-full px-4 py-5 sm:p-6">
              <h3 class="text-base font-semibold text-gray-900">Decrypted Save</h3>
              <div class="mt-2 text-sm text-gray-500">
                <p>
                  <span class="font-semibold">PC Users:</span> Save the downloaded JSON file to the following location:
                  <span class="rounded bg-gray-100 px-1 font-mono text-gray-800"
                    >%APPDATA%\..\LocalLow\Gameloft\Disney Dreamlight Valley\profile.json</span
                  >
                </p>
                <p>
                  <span class="font-semibold">Steam Users:</span> Find and upload your save file located in
                  <span class="rounded bg-gray-100 px-1 font-mono text-gray-800"
                    >%APPDATA%\..\LocalLow\Gameloft\Disney Dreamlight Valley\steam_[id]_r</span
                  >
                  where <span class="font-mono text-gray-800">[id]</span> is your Steam ID.
                </p>
                <p class="mt-2">
                  It is recommended that you make a backup of the encrypted
                  <span class="font-thin italic">profile.json</span> prior to replacing it. You can simply rename it to
                  <span class="font-thin italic">profile.json.bak</span>
                </p>
              </div>
              <OutputViewer v-if="decryptedContent" :input="decryptedContent" />
            </div>
          </div>
        </div>
      </main>
    </div>

    <Footer />
  </div>
</template>

<script setup>
const { decryptSave } = useSaveTool();
const fileContent = ref(null);
const decryptedContent = ref(null);

const decryptionKey = ref(null);

const processFile = async ({ file, userDecryptionKey }) => {
  decryptedContent.value = null;
  fileContent.value = null;
  decryptionKey.value = userDecryptionKey;

  const reader = new FileReader();

  reader.onload = (event) => {
    const arrayBuffer = event.target.result;
    const uint8Array = new Uint8Array(arrayBuffer);
    const base64Content = btoa(String.fromCharCode(...uint8Array));
    fileContent.value = base64Content;
  };

  reader.readAsArrayBuffer(file);
};

watch(fileContent, async (newContent) => {
  const content = await decryptSave(newContent, decryptionKey.value);
  decryptedContent.value = content;
});
</script>
