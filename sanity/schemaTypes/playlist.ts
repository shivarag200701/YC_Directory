import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const playlist = defineType({
  name: "playlist",
  title: "Playlists",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "startups",
      type: "array",
      of: [{type: "reference", to: [{type: "startup"}]}],
    }),
  ],
});