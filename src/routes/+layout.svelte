<script lang="ts">
    import "../app.css";
    import "../altFlow.css";
    import { SvelteFlowProvider } from "@xyflow/svelte";
    let { children } = $props();
</script>

<SvelteFlowProvider>
    {@render children()}
</SvelteFlowProvider>
