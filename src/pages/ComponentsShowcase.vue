<script setup lang="ts">
import { v3 } from "@ciderapp/pluginkit";
import CComponent from "@ciderapp/pluginkit/vue/CComponent.vue";

const mediaItems = ref<MusicKit.Resource[]>();

type Sections = 'media-items' | 'players' | 'immersive';

const currentSection = ref<Sections>("media-items");

const blurMapImage = ref<HTMLImageElement>(new Image())

onMounted(async () => {
    const song = await v3<MusicKit.Resource[]>(
        "/v1/catalog/$STOREFRONT/artists/1244878938/albums", {
        'extend': 'editorialArtwork,plainEditorialNotes,editorialNotes'
    }
    );
    mediaItems.value = song.data.data;

    blurMapImage.value.src = 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/72/63/51/726351e7-2016-48f3-07f8-0891c9eb5e53/075679624161.jpg/316x316bb.webp';
});
</script>

<template>
    <div class="q-pa-lg plugin-base">
        <h1 class="apple-heading">Components Showcase</h1>

        <label>
            Section
            <select v-model="currentSection">
                <option value="players">Players</option>
                <option value="media-items">Media Items</option>
                <option value="immersive">Immersive</option>
            </select>
        </label>

        <template v-if="currentSection === 'players'">
            <div class="component-title"> &lt;cider-mojave-player /&gt; </div>
            <cider-mojave-player />

            <div class="component-title"> &lt;cider-lcdplayer-top /&gt; </div>
            <cider-lcdplayer-top />

            <div class="component-title"> &lt;cider-lcdplayer /&gt; </div>
            <cider-lcdplayer />

            <div class="component-title"> &lt;cider-lcdplayer-glass /&gt; </div>
            <cider-lcdplayer-glass />
            <div class="component-title"> &lt;cider-lcdplayer-glass <i>compact</i> /&gt; </div>
            <cider-lcdplayer-glass compact />

            <div class="component-title"> &lt;cider-lcdplayer-mavericks /&gt; </div>
            <cider-lcdplayer-mavericks />

            <div class="component-title"> &lt;cider-glass-player-actions /&gt; </div>
            <cider-glass-player-actions />

            <div class="component-title"> &lt;cider-explicit /&gt; </div>
            <cider-explicit />

            <div class="component-title"> &lt;cider-playing-indicator /&gt; </div>
            <cider-playing-indicator />

            <div class="component-title"> &lt;cider-live-badge /&gt; </div>
            <cider-live-badge />

        </template>

        <template v-if="mediaItems && currentSection === 'media-items'">
            <div class="component-title"> &lt;cider-media-item /&gt; </div>
            <cider-media-item :item="mediaItems[2]" />

            <div class="component-title"> &lt;cider-power-swoosh /&gt; </div>
            <cider-power-swoosh :item="mediaItems[2]" />

            <div class="component-title"> &lt;cider-media-item-grid /&gt; </div>
            <cider-media-item-grid :items="mediaItems" />

            <div class="component-title"> &lt;cider-rich-album-grid /&gt; </div>
            <cider-rich-album-grid :items="mediaItems" />

            <div class="component-title"> &lt;cider-media-item-slider /&gt; </div>

            <cider-media-item-slider
                title="Title"
                url="#"
                :items="mediaItems"
            />

            <cider-media-item-slider
                title="Multiple Lines"
                chunk-size="2"
                :items="mediaItems"
            />

            <div class="component-title"> &lt;cider-list-item-scroller /&gt; </div>

            <cider-list-item-scroller
                title="Title"
                chunk-size="3"
                :items="mediaItems"
            />

            <div class="component-title"> &lt;cider-hero-item-scroller /&gt; </div>

            <cider-hero-item-scroller
                title="Title"
                :items="mediaItems"
            />

            <div class="component-title"> &lt;cider-power-swoosh-scroller /&gt; </div>

            <cider-power-swoosh-scroller
                title="Power Swoosh Scroller"
                :items="mediaItems"
            />
        </template>

        <template v-if="currentSection === 'immersive'">
            <div class="component-title">
                &lt;cider-immersive-drawer-content /&gt;
            </div>
            <div class="simple-container">
                <cider-immersive-drawer-content style="height:100%;width:100%;flex:1;" />
            </div>

            <div class="component-title">
                &lt;cider-immersive-artwork /&gt;
            </div>
            <div class="simple-container">
                <cider-immersive-artwork style="height:300px;width: 300px;;flex:1;" />
            </div>

            <div class="component-title">
                &lt;CComponent name="ImmersiveMetadata" /&gt;
            </div>
            <div class="simple-container">
                <CComponent name="ImmersiveMetadata"></CComponent>
            </div>

            <div class="component-title">
                &lt;CComponent name="ImmersiveMetadata" /&gt;
            </div>
            <div class="simple-container">
                <cider-immersive-lyric-view style="flex:1;width: 100%;" />
            </div>

            <div class="component-title">
                &lt;cider-artwork-blur-map /&gt;
            </div>
            <div class="simple-container">
                <cider-artwork-blur-map
                    bpm="86"
                    max-framerate="60"
                    :image="blurMapImage"
                />
            </div>
        </template>
    </div>
</template>

<style scoped>
.simple-container {
    width: 100%;
    height: 400px;
    display: flex;
    overflow: hidden;
    position: relative;
}

.section-details {}

.section-title {
    background: var(--keyColor);
    padding: 12px;
    border-radius: 8px;
}

.component-title {
    font-weight: bold;
    font-family: 'Source Code Pro', monospace;
    font-size: 1.6em;
}
</style>
