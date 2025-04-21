<script lang="ts">
    //@ts-nocheck
    import * as Avatar from "$lib/components/ui/avatar";
    import * as Card from "$lib/components/ui/card";
    import * as ContextMenu from "$lib/components/ui/context-menu";
    import { lock } from "$lib/stores/nodeStore";
    import { NodeResizer, useSvelteFlow } from "@xyflow/svelte";
    import { Image } from "lucide-svelte";
    import NodeMenu from "../nodeMenu.svelte";
    let input = $state();

    let { selected, data, id } = $props();
    let { updateNodeData } = useSvelteFlow();

    let img = $state(data.img || "https://github.com/shadcn.png");
    $effect(() => {
        updateNodeData(id, { img });
    });

    function change() {
        if (!input.files || !input.files[0]) return;

        const FR = new FileReader();
        FR.addEventListener("load", (e) => (img = e.target.result));
        FR.readAsDataURL(input.files[0]);
    }
</script>

<NodeResizer isVisible={selected && !$lock} minHeight={50} minWidth={50} />

<ContextMenu.Root>
    <ContextMenu.Trigger class="size-full">
        <div class="p-0.5 w-full h-full flex">
            <Card.Root
                class="flex-1 backdrop-blur-md backdrop-filter bg-clip-padding bg-black/10"
            >
                <Card.Content class="p-0.5 h-full">
                    <Avatar.Root class="size-full rounded-md">
                        <Avatar.Image src={img} />
                    </Avatar.Root>
                </Card.Content>
            </Card.Root>
        </div>
    </ContextMenu.Trigger>
    <NodeMenu {id}>
        <ContextMenu.Item
            onclick={() => {
                if ($lock) return;
                input.click();
            }}
        >
            <Image class="mr-2 size-4" />
            Change Image
        </ContextMenu.Item>
    </NodeMenu>
</ContextMenu.Root>

<input
    type="file"
    class="hidden"
    accept="image/*"
    bind:this={input}
    onchange={change}
/>
