<script lang="ts">
    //@ts-nocheck
    import * as Card from "$lib/components/ui/card";
    import * as ContextMenu from "$lib/components/ui/context-menu";
    import { NodeResizer, useSvelteFlow } from "@xyflow/svelte";
    import NodeMenu from "../nodeMenu.svelte";
    import TextEdit from "../TextEdit.svelte";
    import { lock } from "$lib/stores/nodeStore";

    let { selected, data, id } = $props();
    let { updateNodeData } = useSvelteFlow();

    let text = $state(
        data.text ||
            `<h4 style="text-align: left"><em>Inventory:</em></h4><ul><li><p style="text-align: left"><em>...</em></p></li></ul>`
    );

    $effect(() => {
        updateNodeData(id, { text });
    });
</script>

<NodeResizer
    nodeId={id}
    isVisible={selected && !$lock}
    minHeight={100}
    minWidth={150}
/>

<ContextMenu.Root>
    <ContextMenu.Trigger class="max-h-full h-full w-full">
        <div class="p-0.5 h-full w-full max-h-full">
            <Card.Root
                class="
                        nowheel .nodrag
                        h-full w-full flex flex-col
                        backdrop-blur-md backdrop-filter
                        bg-clip-padding bg-black/10
                        overflow-hidden"
            >
                <Card.Content
                    class="
                            p-2 flex-1 overflow-auto max-h-full
                            prose dark:prose-invert prose-sm
                            *:!my-0 *:!py-0"
                >
                    {@html text}
                </Card.Content>
            </Card.Root>
        </div>
    </ContextMenu.Trigger>

    <NodeMenu {id}>
        <TextEdit bind:content={text} />
    </NodeMenu>
</ContextMenu.Root>
