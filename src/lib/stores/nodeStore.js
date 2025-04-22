import Avatar from "$lib/components/nodes/Avatar.svelte";
import Image from "$lib/components/nodes/Image.svelte";
import Stat from "$lib/components/nodes/Stat.svelte";
import Text from "$lib/components/nodes/Text.svelte";
import Title from "$lib/components/nodes/Title.svelte";
import { writable } from "svelte/store";

export const nodes = writable([
    {
        id: "initial",
        type: "Text",
        position: { x: 0, y: 0 },
        width: 625,
        height: 375,
        data: {
            text: '<h3 style="text-align: left"><strong><em>Welcome!!!</em></strong></h3><p style="text-align: left">This is a <span style="color: rgb(0, 166, 244)">modular character sheet</span> tool — flexible, simple, and designed to <span style="color: rgb(0, 166, 244)">fit <em>your</em> style</span>.</p><h4 style="text-align: left">Getting Started:</h4><ul><li><p style="text-align: left">Open the main menu with <mark class="highlight" data-color="rgba(0, 166, 244, 0.2)" style="background-color: rgba(0, 166, 244, 0.2); color: inherit">Cmd+K</mark> or by clicking the top button.</p></li><li><p style="text-align: left">Add a node from the menu.</p></li><li><p style="text-align: left">Drag nodes around to reposition them however you like.</p></li><li><p style="text-align: left">Right-click any node to open its menu for more options.</p></li><li><p style="text-align: left">Edit fields directly or via the node’s menu (depending on the type).</p></li></ul><p style="text-align: left">And that’s it — build your sheet <span style="color: rgb(0, 166, 244)">your way</span>.<br><strong>Have fun! Profit!!!</strong></p>'
        },
        measured: { width: 625, height: 375 },
        selected: false
    }
]);
export const nodeTypes = {
    Avatar,
    Image,
    Stat,
    Text,
    Title
};

export const viewport = writable({ x: 0, y: 0, zoom: 1 });
export const lock = writable(false);
