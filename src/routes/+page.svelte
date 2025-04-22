<script lang="ts">
    //@ts-nocheck
    import Command from "$lib/components/Command.svelte";
    import Overlay from "$lib/components/overlay.svelte";
    import { lock, nodes, nodeTypes, viewport } from "$lib/stores/nodeStore.js";
    import { Background, BackgroundVariant, SvelteFlow } from "@xyflow/svelte";
    import { writable } from "svelte/store";

    try {
        let n = JSON.parse(localStorage.getItem("sheet"));
        if (typeof n == "object" && "length" in n) {
            $nodes = n;
        }
    } catch (e) {}

    try {
        let v = JSON.parse(localStorage.getItem("view"));
        if (typeof v == "object" && "zoom" in v) {
            $viewport = v;
        }
    } catch (e) {}

    try {
        let l = JSON.parse(localStorage.getItem("lock"));
        if (typeof n == "boolean") {
            $lock = l;
        }
    } catch (e) {}

    $effect(() => {
        localStorage.setItem("view", JSON.stringify($viewport));
        localStorage.setItem("sheet", JSON.stringify($nodes));
        localStorage.setItem("lock", JSON.stringify($lock));
    });
</script>

<div class="h-svh select-none">
    <SvelteFlow
        edges={writable([])}
        colorMode="dark"
        minZoom={0.1}
        maxZoom={3}
        {viewport}
        {nodeTypes}
        {nodes}
        nodesDraggable={!$lock}
        fitView={localStorage.getItem("view") == null ||
            localStorage.getItem("view") == "undefined"}
    >
        <Background variant={BackgroundVariant.Dots} size={1} gap={25} />
    </SvelteFlow>

    <Overlay />
    <Command />
</div>
