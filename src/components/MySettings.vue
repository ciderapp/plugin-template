<script setup lang="ts">
import { useCider } from "@ciderapp/pluginkit";
import PluginConfig from "../plugin.config";

type TemplatePluginConfig = {
  favoriteColor: "red" | "green" | "blue";
  count: number;
  booleanOption: boolean;
};

const config = useCider().config.getRef() as Record<string, any>;
config.plugins ??= {};
config.plugins[PluginConfig.identifier] ??= {
  favoriteColor: "blue",
  count: 0,
  booleanOption: false,
};

const cfg = config.plugins[PluginConfig.identifier] as TemplatePluginConfig;
</script>

<template>
  <div class="q-px-lg plugin-base">
    Custom settings page
    <div>
      <button @click="cfg.count++">config count is: {{ cfg.count }}</button>
    </div>
    <div>
      <label>
        <input type="checkbox" v-model="cfg.booleanOption" /> Switch Setting
      </label>
    </div>
    <div v-if="cfg.booleanOption">
      <label>
        Favorite Color
        <select class="c-select" v-model="cfg.favoriteColor">
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </select>
      </label>
    </div>
  </div>
</template>

<style scoped></style>
