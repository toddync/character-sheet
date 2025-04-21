<script lang="ts">
    //@ts-nocheck
    import Command from "$lib/components/Command.svelte";
    import Overlay from "$lib/components/overlay.svelte";
    import { lock, nodes, nodeTypes, viewport } from "$lib/stores/nodeStore.js";
    import { Background, BackgroundVariant, SvelteFlow } from "@xyflow/svelte";
    import { writable } from "svelte/store";

    if (localStorage.getItem("sheet")) {
        $nodes = JSON.parse(localStorage.getItem("sheet"));
    }
    if (localStorage.getItem("view")) {
        $viewport = JSON.parse(localStorage.getItem("view"));
    }
    if (localStorage.getItem("lock")) {
        $lock = JSON.parse(localStorage.getItem("lock"));
    }

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
        fitView={localStorage.getItem("view") == null}
    >
        <Background variant={BackgroundVariant.Dots} size={1} gap={25} />
    </SvelteFlow>

    <Overlay />
    <Command />
</div>
