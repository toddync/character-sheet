<script lang="ts">
    //@ts-nocheck
    import * as ContextMenu from "$lib/components/ui/context-menu";
    import { nodes } from "$lib/stores/nodeStore";
    import { useSvelteFlow } from "@xyflow/svelte";
    import { Pin, Ruler } from "lucide-svelte";

    let { id = "", children } = $props();
    let { updateNode } = useSvelteFlow();
</script>

<ContextMenu.Content
    class="backdrop-blur-md backdrop-filter bg-clip-padding bg-black/80"
>
    {#if children}
        {@render children?.()}
        <ContextMenu.Separator />
    {/if}

    <ContextMenu.Item
        onclick={() => {
            let n = $nodes.find((n) => n.id == id);

            updateNode(id, {
                width: Math.round(n.width / 25) * 25,
                height: Math.round(n.height / 25) * 25
            });
        }}
    >
        <Ruler class="mr-2 size-4" />
        Snap Size
    </ContextMenu.Item>

    <ContextMenu.Item
        onclick={() => {
            let n = $nodes.find((n) => n.id == id);

            updateNode(id, {
                position: {
                    x: Math.round(n.position.x / 25) * 25,
                    y: Math.round(n.position.y / 25) * 25
                }
            });
        }}
    >
        <Pin class="mr-2 size-4" />
        Snap Position
    </ContextMenu.Item>
</ContextMenu.Content>
