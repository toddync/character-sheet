<script>
    // @ts-nocheck
    import * as Drawer from "$lib/components/ui/drawer";
    import { Feather } from "lucide-svelte";
    import Editor from "./Editor.svelte";
    import { lock } from "$lib/stores/nodeStore";
    import { derived } from "svelte/store";

    let { content = $bindable("") } = $props();
    let editable = $derived(!$lock);
</script>

<Drawer.Root>
    <Drawer.Trigger
        class="w-full hover:bg-accent hover:text-accent-foreground flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    >
        <Feather class="mr-2 size-4" />
        Edit
    </Drawer.Trigger>
    <Drawer.Content class="h-[80svh] bg-black">
        <Editor
            {content}
            bind:editable
            change={(e) => (content = e.getHTML())}
        />
    </Drawer.Content>
</Drawer.Root>
