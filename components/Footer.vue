<template>
  <div class="w-full bg-gray-900">
    <div class="mx-auto max-w-7xl px-6 py-6 md:flex md:items-center md:justify-between lg:px-8">
      <div class="flex justify-center gap-x-6 md:order-2">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          target="_blank"
          class="flex items-center gap-x-2 text-gray-400 hover:text-gray-300"
        >
          <component :is="item.icon" class="size-6" aria-hidden="true" />
          <span class="text-nowrap">{{ item.name }}</span>
        </a>
      </div>
      <div>
        <p class="mt-8 pb-1 text-left text-sm/6 text-gray-400 md:order-1 md:mt-0">
          Made with ❤️ by
          <a href="https://enderle.io/" class="text-sky-400">Enderle.io</a>
        </p>
        <p class="mt-8 w-2/3 text-left text-xs text-gray-400 md:order-1 md:mt-0">
          This website is an independent fan-made project and is not affiliated with, endorsed by, or sponsored by
          Disney, Gameloft, or any related entities associated with Disney Dreamlight Valley. The use of names,
          trademarks, branding, and other intellectual property, including but not limited to "Disney," "Disney
          Dreamlight Valley," and associated Disney and Pixar characters, is solely for informational and referential
          purposes. All rights to these trademarks and intellectual property are the property of their respective
          owners. This website is intended for educational, informational, and fan purposes only and does not claim
          ownership of any Disney or Gameloft intellectual property. No association, endorsement, sponsorship, or
          partnership with Disney, Gameloft, or their subsidiaries is implied or should be inferred. For official
          information about Disney Dreamlight Valley, please visit the official website or contact Disney or Gameloft
          directly.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, h } from 'vue';

const navigation = [
  {
    name: 'View the Source',
    href: 'https://github.com/Matthewenderle/dreamlight-valley-save-tool',
    icon: defineComponent({
      render: () =>
        h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', {
            'fill-rule': 'evenodd',
            d: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
            'clip-rule': 'evenodd',
          }),
        ]),
    }),
  },
];
</script>
