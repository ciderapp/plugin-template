<script setup lang="ts">
import { useMainStore } from '../stores/main';
import { ContextMenuAPI, useContextMenu, DialogAPI } from '@ciderapp/pluginkit';

const { createAlert, createPrompt, createConfirm } = DialogAPI

const store = useMainStore();

const showConditionalItem = ref(true);

const simpleMenu = ContextMenuAPI.createMenu(({ actionItem }) => {
    return () => [
        actionItem('Click me!', () => {
            createAlert('You clicked the menu item!');
        }),
        actionItem('Set the counter...', () => {
            createPrompt('Set the counter to what value?', 'Set Counter', {
            }).then((value) => {
                if (value !== null) {
                    const num = parseInt(value, 10);
                    if (!isNaN(num)) {
                        store.count = num;
                    } else {
                        createAlert('Please enter a valid number.');
                    }
                }
            });
        }),
        actionItem('Double the current counter', () => {
            store.count *= 2;
        }),
        actionItem('Reset the counter', () => {
            createConfirm('Reset the counter back to 1?', 'Reset Counter').then((confirmed) => {
                if (confirmed) {
                    store.count = 1;
                }
            });
        }),
        showConditionalItem.value && actionItem('Conditional item', () => {
            createAlert('This item is conditionally rendered based on the value of showConditionalItem');
        }),
    ]
})

/**
 * So you may be wondering why we are using `useContextMenu` here.
 * The `useContextMenu` is a Vue composable that provides a reference to the context menu element.
 * 
 * ## Why not use the createMenu and bind with @contextmenu you may ask?
 * Theres a bug in Chromium where context menu gets fired multiple times under certain conditions.
 * So this composable automatically debounces the context menu events and provides a reference to the context menu element.
 * 
 * It also provides showContextMenu as well so that you can show the context menu programmatically as well as a direct reference to `menu`.
 */
useContextMenu(ContextMenuAPI.createMenu(({ actionItem }) => {
    /**
     * This pattern allows for the context menu content to be recreated on every invocation.
     * This is useful if you want to have dynamic content in your context menu.
     */
    return () => {
        return [
            actionItem('Click me!', () => {
                createAlert('You clicked the menu item from a context menu!');
            })
        ]
    }
}))

</script>

<template>
    <div class="plugin-base">
        <button class="c-btn" @click="simpleMenu.show($event)">Click me for menu</button>
        <button class="c-btn" ref="ctxMenuRef">Right click for context menu</button>
        <br>
        <label>
            <input
                type="checkbox"
                v-model="showConditionalItem"
            />
            Toggle conditional item
        </label>
    </div>
</template>

<style scoped></style>