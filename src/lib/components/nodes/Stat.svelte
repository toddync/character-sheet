<script lang="ts">
    //@ts-nocheck
    import * as Card from "$lib/components/ui/card";
    import { Separator } from "$lib/components/ui/separator";
    import * as ContextMenu from "$lib/components/ui/context-menu";
    import { Input } from "$lib/components/ui/input";
    import { NodeResizer, useSvelteFlow } from "@xyflow/svelte";
    import NodeMenu from "../nodeMenu.svelte";
    import { lock } from "$lib/stores/nodeStore";

    let { selected, data, id } = $props();
    let { updateNodeData } = useSvelteFlow();

    let name = $state(data.name || "STR");
    let stat = $state(data.stat || 0);
    let mod = $state(data.mod || 0);

    $effect(() => {
        updateNodeData(id, { name, stat, mod });
    });
</script>

<NodeResizer isVisible={selected && !$lock} minHeight={150} minWidth={100} />

<ContextMenu.Root>
    <ContextMenu.Trigger class="size-full">
        <div class="p-0.5 w-full h-full flex">
            <Card.Root
                class="flex-1 backdrop-blur-md backdrop-filter bg-clip-padding bg-black/10"
            >
                <Card.Content class="p-0.5 h-full flex flex-col">
                    <Input
                        class="border-0 text-center !p-0 my-1 disabled:opacity-100"
                        bind:value={name}
                        disabled={$lock}
                    />
                    <Separator class="w-[calc(100%_-_10px)] mx-auto" />
                    <Input
                        class="border-0 text-center !text-2xl h-10 my-auto font-bold p-0 disabled:opacity-100"
                        bind:value={stat}
                        disabled={$lock}
                    />
                    <Input
                        class="border-0 text-center font-thin p-0 disabled:opacity-100"
                        bind:value={mod}
                        disabled={$lock}
                    />
                </Card.Content>
            </Card.Root>
        </div>
    </ContextMenu.Trigger>
    <NodeMenu {id} />
</ContextMenu.Root>
