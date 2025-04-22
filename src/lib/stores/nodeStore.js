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
        position: {
            x: 0,
            y: 0
        },
        width: 550,
        height: 200,
        data: {
            text: '<h2 style="text-align: left"><em>Welcome !!!</em></h2><p style="text-align: left"></p><p style="text-align: left">This is a <span style="color: rgb(0, 166, 244)">character sheet</span> tool designed to be as <span style="color: rgb(0, 166, 244)">modular</span> as possible.</p><p style="text-align: left"></p><p style="text-align: left">To start creation open the menu by hitting <mark class="highlight" data-color="rgba(0, 166, 244, 0.2)" style="background-color: rgba(0, 166, 244, 0.2); color: inherit">cmd+k</mark> or clicking the button on the top of the page.</p><p style="text-align: left"></p><p style="text-align: left">All nodes have a menu, accessible by right-clicking, to access some more option (<strong>like this one!!</strong>)</p>'
        },
        measured: {
            width: 550,
            height: 200
        },
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
