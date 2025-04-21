<script lang="ts">
    //@ts-nocheck
    import { Badge } from "$lib/components/ui/badge";
    import { Button } from "$lib/components/ui/button";
    import open from "$lib/stores/commandStore";
    import { lock } from "$lib/stores/nodeStore";
    import { Panel } from "@xyflow/svelte";
    import { Command, Lock, Search } from "lucide-svelte";
</script>

<Panel position="top-center">
    <Button
        onclick={() => ($open = true)}
        class="bg-black/10 backdrop-blur-sm border hover:bg-accent rounded-2xl flex gap-5 group transition-colors"
    >
        <Search class="text-foreground size-5" />
        <p class="text-muted-foreground mx-auto col-span-2">Search...</p>
        <Badge
            variant="secondary"
            class="text-muted-foreground group-hover:bg-red-900/50 transition-colors flex gap-1"
        >
            <Command class="size-4" />
            <span>+</span>
            <span>K</span>
        </Badge>
    </Button>
</Panel>

<Panel position="top-right">
    {#if $lock}
        <Button
            variant="ghost"
            size="icon"
            class="min-w-fit min-h-fit"
            onclick={() => ($lock = false)}
        >
            <Lock class="!size-10 !m-1.5 stroke-blue-500 animate-pulse" />
        </Button>
    {/if}
</Panel>
