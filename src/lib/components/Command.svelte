<script lang="ts">
    //@ts-nocheck
    import * as Command from "$lib/components/ui/command";
    import open from "$lib/stores/commandStore";
    import { lock, nodes, nodeTypes, viewport } from "$lib/stores/nodeStore";
    import { useSvelteFlow } from "@xyflow/svelte";
    import {
        Cuboid,
        Download,
        Lock,
        LockOpen,
        Pin,
        Save
    } from "lucide-svelte/icons";

    const close = () => ($open = !$open);
    let { screenToFlowPosition, getViewport, setViewport } = useSvelteFlow();
    let input = $state();

    const addNode = (type) => {
        let { x, y } = screenToFlowPosition({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        });

        let node = {
            id: crypto.randomUUID(),
            position: { x, y },
            type
        };

        if (type == "Avatar" || type == "Image") {
            node.width = node.height = 50;
        } else if (type == "Stat") {
            node.height = 150;
            node.width = 100;
        } else if (type == "Title") {
            node.height = 50;
            node.width = 100;
        } else if (type == "Text") {
            node.height = 100;
            node.width = 150;
        }

        node.position.x -= node.width / 2;
        node.position.y -= node.height / 2;
        $nodes[$nodes.length] = node;

        close();
    };

    function save() {
        const jsonStr = JSON.stringify(
            { sheet: $nodes, lock: $lock, view: getViewport() },
            null,
            2
        );
        const blob = new Blob([jsonStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sheet.json";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        close();
    }

    async function restore(e) {
        const reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        reader.onload = function () {
            try {
                let data = JSON.parse(reader.result);
                $nodes = data.sheet;
                $viewport = data.view;
                $lock = data.lock;
            } catch (e) {}
        };
    }

    function onkeydown(e: KeyboardEvent) {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            $open = !$open;
        }
    }
</script>

<svelte:window {onkeydown} />

<Command.Dialog bind:open={$open} loop class="backdrop-blur-md bg-black">
    <Command.Input placeholder="Type a command or search..." />
    <Command.List>
        <Command.Empty>No results found...</Command.Empty>
        <Command.Group heading="Nodes">
            {#each Object.keys(nodeTypes) as node}
                <Command.Item onSelect={() => addNode(node)}>
                    <Cuboid class="mr-2 size-4" />
                    <span>{node} </span>
                </Command.Item>
            {/each}
        </Command.Group>
        <Command.Group heading="Commands">
            <Command.Item onclick={() => ($lock = !$lock)}>
                {#if $lock}
                    <LockOpen class="mr-2 size-4" />
                    Unlock Nodes
                {:else}
                    <Lock class="mr-2 size-4" />
                    Lock Nodes
                {/if}
            </Command.Item>
            <Command.Item
                onclick={() => {
                    let v = getViewport();

                    setViewport({
                        zoom: v.zoom,
                        x: Math.round(v.x / 25) * 25,
                        y: Math.round(v.y / 25) * 25
                    });
                }}
            >
                <Pin class="mr-2 size-4" />
                Snap Viewport
            </Command.Item>
            <Command.Item onclick={save}>
                <Save class="mr-2 size-4" />
                Export
            </Command.Item>

            <Command.Item onclick={() => input.click()}>
                <Download class="mr-2 size-4" />
                Import
            </Command.Item>
        </Command.Group>
    </Command.List>
</Command.Dialog>

<input
    type="file"
    accept="application/JSON"
    bind:this={input}
    class="hidden"
    onchange={restore}
/>
