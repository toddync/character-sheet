<script lang="ts">
    //@ts-nocheck
    import * as Card from "$lib/components/ui/card";
    import * as ContextMenu from "$lib/components/ui/context-menu";
    import { Input } from "$lib/components/ui/input";
    import { NodeResizer, useSvelteFlow } from "@xyflow/svelte";
    import NodeMenu from "../nodeMenu.svelte";
    import { lock } from "$lib/stores/nodeStore";

    let { selected, data, id } = $props();
    let { updateNodeData } = useSvelteFlow();

    let title = $state(data.title || "STR");

    $effect(() => {
        updateNodeData(id, { title });
    });
</script>

<NodeResizer
    isVisible={selected && !$lock}
    minHeight={50}
    maxHeight={50}
    minWidth={100}
/>

<ContextMenu.Root>
    <ContextMenu.Trigger class="size-full">
        <div class="p-0.5 w-full h-full flex">
            <Card.Root
                class="flex-1 backdrop-blur-md backdrop-filter bg-clip-padding bg-black/10"
            >
                <Card.Content class="p-0.5 h-full flex flex-col">
                    <Input
                        class="border-0 text-center font-bold !p-0 my-1 disabled:opacity-100"
                        bind:value={title}
                        disabled={$lock}
                    />
                </Card.Content>
            </Card.Root>
        </div>
    </ContextMenu.Trigger>
    <NodeMenu {id} />
</ContextMenu.Root>
