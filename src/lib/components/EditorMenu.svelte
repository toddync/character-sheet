<script lang="ts">
    //@ts-nocheck
    import colors, { hexToRgba } from "$lib/colors";
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Separator } from "$lib/components/ui/separator";
    import type { Editor } from "@tiptap/core";
    import {
        AlignCenter,
        AlignJustify,
        AlignLeft,
        AlignRight,
        Ban,
        Bold,
        Heading,
        Heading1,
        Heading2,
        Heading3,
        Heading4,
        Highlighter,
        Italic,
        List,
        ListOrdered,
        ListTodo,
        Palette,
        Quote,
        Strikethrough,
        Underline
    } from "lucide-svelte";
    import type { Readable } from "svelte/store";

    let { editor }: { editor: Readable<Editor> } = $props();

    const isActive = (name: string, attrs = {}) =>
        $editor?.isActive(name, attrs);
</script>

<div class="pt-4 pb-3 sticky -top-1 bg-black z-50">
    {#if $editor}
        <div
            class="flex space-x-1.5 rounded-md p-1.5 shadow-sm border-0 border-b rounded-none mx-5"
        >
            <div class="w-fit mx-auto flex gap-1.5">
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger
                        class={`${buttonVariants({ variant: "ghost" })} ${isActive("heading") && "bg-blue-500/30"}`}
                    >
                        <Heading class="size-4" />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content class="dark:prose-invert prose-sm">
                        <DropdownMenu.Group>
                            <DropdownMenu.Item
                                class={isActive("heading", { level: 1 }) &&
                                    "bg-blue-500/30"}
                                onclick={() =>
                                    $editor
                                        .chain()
                                        .focus()
                                        .toggleHeading({ level: 1 })
                                        .run()}
                            >
                                <Heading1 class="size-4 mr-2" />
                                <h1 class="m-0 p-0">Header</h1>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                                class={isActive("heading", { level: 2 }) &&
                                    "bg-blue-500/30"}
                                onclick={() =>
                                    $editor
                                        .chain()
                                        .focus()
                                        .toggleHeading({ level: 2 })
                                        .run()}
                            >
                                <Heading2 class="size-4 mr-2" />
                                <h2 class="m-0 p-0">Header</h2>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                                class={isActive("heading", { level: 3 }) &&
                                    "bg-blue-500/30"}
                                onclick={() =>
                                    $editor
                                        .chain()
                                        .focus()
                                        .toggleHeading({ level: 3 })
                                        .run()}
                            >
                                <Heading3 class="size-4 mr-2" />
                                <h3 class="m-0 p-0">Header</h3>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                                class={isActive("heading", { level: 4 }) &&
                                    "bg-blue-500/30"}
                                onclick={() =>
                                    $editor
                                        .chain()
                                        .focus()
                                        .toggleHeading({ level: 4 })
                                        .run()}
                            >
                                <Heading4 class="size-4 mr-2" />
                                <h4 class="m-0 p-0">Header</h4>
                            </DropdownMenu.Item>
                        </DropdownMenu.Group>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>

                <DropdownMenu.Root>
                    <DropdownMenu.Trigger
                        class={`
                        ${buttonVariants({ variant: "ghost" })}
                        ${(isActive("bulletList") || isActive("orderedList") || isActive("taskList")) && "bg-blue-500/30"}`}
                    >
                        <List class="size-4" />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Group>
                            <DropdownMenu.Item
                                class={isActive("bulletList") &&
                                    "bg-blue-500/30"}
                                onclick={() =>
                                    $editor
                                        .chain()
                                        .focus()
                                        .toggleBulletList()
                                        .run()}
                            >
                                <List class="size-4 mr-2" />
                                Bullet List
                            </DropdownMenu.Item>

                            <DropdownMenu.Item
                                class={isActive("orderedList") &&
                                    "bg-blue-500/30"}
                                onclick={() =>
                                    $editor
                                        .chain()
                                        .focus()
                                        .toggleOrderedList()
                                        .run()}
                            >
                                <ListOrdered class="size-4 mr-2" />
                                Ordered List
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                                class={isActive("taskList") && "bg-blue-500/30"}
                                onclick={() =>
                                    $editor.commands.toggleTaskList()}
                            >
                                <ListTodo class="size-4 mr-2" />
                                Task List
                            </DropdownMenu.Item>
                        </DropdownMenu.Group>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>

                <Button
                    variant="ghost"
                    class={isActive("blockquote") && "bg-blue-500/30"}
                    onclick={() =>
                        $editor.chain().focus().toggleBlockquote().run()}
                >
                    <Quote class="size-4" />
                </Button>

                <Separator orientation="vertical" />

                <Button
                    variant="ghost"
                    class={isActive("bold") && "bg-blue-500/30"}
                    onclick={() => $editor.chain().focus().toggleBold().run()}
                >
                    <Bold class="size-4" />
                </Button>

                <Button
                    variant="ghost"
                    class={isActive("italic") && "bg-blue-500/30"}
                    onclick={() => $editor.chain().focus().toggleItalic().run()}
                >
                    <Italic class="size-4" />
                </Button>

                <Button
                    variant="ghost"
                    class={isActive("strike") && "bg-blue-500/30"}
                    onclick={() => $editor.chain().focus().toggleStrike().run()}
                >
                    <Strikethrough class="size-4" />
                </Button>

                <Button
                    variant="ghost"
                    class={isActive("underline") && "bg-blue-500/30"}
                    onclick={() =>
                        $editor.chain().focus().toggleUnderline().run()}
                >
                    <Underline class="size-4" />
                </Button>

                <DropdownMenu.Root>
                    <DropdownMenu.Trigger
                        class={`${buttonVariants({ variant: "ghost" })} ${isActive("highlight") && "bg-blue-500/30"}`}
                    >
                        <Highlighter class="size-4" />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content
                        class="grid grid-cols-3 gap-1 min-w-none w-fit"
                    >
                        <Button
                            variant="ghost"
                            class="p-0 size-7 rounded-full"
                            onclick={() =>
                                $editor.chain().focus().unsetHighlight().run()}
                        >
                            <Ban class="size-full" />
                        </Button>

                        {#each colors as color}
                            {@const c = hexToRgba(color, 0.2)}
                            <Button
                                variant="ghost"
                                class={`p-0 size-7 rounded-full ${isActive("highlight", { color: c }) && "border-2 border-foreground"}`}
                                style="background-color: {c};"
                                onclick={() =>
                                    $editor
                                        .chain()
                                        .focus()
                                        .toggleHighlight({ color: c })
                                        .run()}
                            />
                        {/each}
                    </DropdownMenu.Content>
                </DropdownMenu.Root>

                <DropdownMenu.Root>
                    <DropdownMenu.Trigger
                        class={`${buttonVariants({ variant: "ghost" })} ${isActive("textStyle") && $editor.getAttributes("textStyle").color && "bg-blue-500/30"}`}
                    >
                        <Palette class="size-4" />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content
                        class="grid grid-cols-3 gap-1 min-w-none w-fit"
                    >
                        <Button
                            variant="ghost"
                            class="p-0 size-7 rounded-full"
                            onclick={() =>
                                $editor.chain().focus().unsetColor().run()}
                        >
                            <Ban class="size-full" />
                        </Button>

                        {#each colors as color}
                            <Button
                                variant="ghost"
                                class={`p-0 size-7 rounded-full ${isActive("textStyle", { color }) && "border-2 border-foreground"}`}
                                style="background-color: {color};"
                                onclick={() =>
                                    $editor
                                        .chain()
                                        .focus()
                                        .setColor(color)
                                        .run()}
                            />
                        {/each}
                    </DropdownMenu.Content>
                </DropdownMenu.Root>

                <Separator orientation="vertical" />

                <Button
                    variant="ghost"
                    class={isActive({ textAlign: "left" }) && "bg-blue-500/30"}
                    onclick={() => $editor.commands.setTextAlign("left")}
                >
                    <AlignLeft class="size-4" />
                </Button>

                <Button
                    variant="ghost"
                    class={isActive({ textAlign: "center" }) &&
                        "bg-blue-500/30"}
                    onclick={() => $editor.commands.setTextAlign("center")}
                >
                    <AlignCenter class="size-4" />
                </Button>

                <Button
                    variant="ghost"
                    class={isActive({ textAlign: "right" }) && "bg-blue-500/30"}
                    onclick={() => $editor.commands.setTextAlign("right")}
                >
                    <AlignRight class="size-4" />
                </Button>

                <Button
                    variant="ghost"
                    class={isActive({ textAlign: "justify" }) &&
                        "bg-blue-500/30"}
                    onclick={() => $editor.commands.setTextAlign("justify")}
                >
                    <AlignJustify class="size-4" />
                </Button>
            </div>
        </div>
    {/if}
</div>
