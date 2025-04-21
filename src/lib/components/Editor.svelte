<script lang="ts">
    //@ts-nocheck
    import { Editor } from "@tiptap/core";
    import { Color } from "@tiptap/extension-color";
    import ListItem from "@tiptap/extension-list-item";
    import TaskItem from "@tiptap/extension-task-item";
    import TaskList from "@tiptap/extension-task-list";
    import TextAlign from "@tiptap/extension-text-align";
    import TextStyle from "@tiptap/extension-text-style";
    import Underline from "@tiptap/extension-underline";
    import StarterKit from "@tiptap/starter-kit";
    import { onMount } from "svelte";
    import { createEditor, EditorContent } from "svelte-tiptap";
    import type { Readable } from "svelte/store";
    import EditorMenu from "./EditorMenu.svelte";
    import Highlight from "@tiptap/extension-highlight";

    let {
        editor = $bindable() as Readable<Editor>,
        content = $bindable(""),
        editable = $bindable(true),
        change = () => {}
    } = $props();

    $effect(() => {
        $editor?.setEditable(editable);
    });

    onMount(() => {
        editor = createEditor({
            content,
            editable,
            extensions: [
                Underline,
                Highlight.configure({
                    multicolor: true,
                    HTMLAttributes: {
                        class: "highlight"
                    }
                }),
                Color.configure({
                    types: [TextStyle.name, ListItem.name, TaskItem.name]
                }),
                TextStyle.configure({ types: [ListItem.name, TaskItem.name] }),
                TaskList,
                TaskItem.configure({
                    nested: true,
                    HTMLAttributes: {
                        class: "flex gap-2"
                    }
                }),

                TextAlign.configure({
                    defaultAlignment: "left",
                    types: ["heading", "paragraph"],
                    alignments: ["left", "center", "right", "justify"]
                }),
                StarterKit.configure({
                    bulletList: {
                        keepMarks: true
                    },
                    orderedList: {
                        keepMarks: true
                    },
                    heading: {
                        levels: [1, 2, 3, 4]
                    },
                    codeBlock: false,
                    code: false
                })
            ],
            editorProps: {
                attributes: {
                    class: "editorEl"
                }
            },
            onUpdate() {
                change?.($editor);
            },
            onSelectionUpdate() {
                change?.($editor);
                const { selection } = $editor.state;
                if (selection.to != selection.from) return;

                if (selection.to == 1) {
                    window.scrollTo({
                        top: 1,
                        behavior: "smooth"
                    });
                    return;
                }

                const viewportCoords = $editor.view.coordsAtPos(selection.from);
                const absoluteOffset = window.scrollY + viewportCoords.top;
                if (viewportCoords.top > 0.7 * window.innerHeight) {
                    window.scrollTo({
                        top: absoluteOffset - window.innerHeight * 0.7,
                        behavior: "smooth"
                    });
                } else if (viewportCoords.top < 0.3 * window.innerHeight) {
                    window.scrollTo({
                        top: absoluteOffset - window.innerHeight * 0.3,
                        behavior: "smooth"
                    });
                }
            }
        });

        $editor.commands.focus(null, { scrollIntoView: true });
    });
</script>

<div class="flex flex-col flex-1 pb-5 mx-auto select-none w-full">
    <EditorMenu {editor} />

    <EditorContent editor={$editor} class="editor" />
</div>
