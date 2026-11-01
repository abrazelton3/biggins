import { defineType, defineField } from 'sanity';

export const about = defineType({
  name: 'about',
  title: 'About page',
  type: 'document',
  fields: [
    defineField({
      name: 'fieldPhoto',
      type: 'object',
      fields: [
        defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'caption', type: 'string' }),
        defineField({ name: 'location', type: 'string' }),
      ],
    }),
    defineField({
      name: 'paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      description: 'One entry per paragraph.',
    }),
    defineField({
      name: 'rightNow',
      title: 'Right now (post-it)',
      type: 'object',
      description: 'Optional. A yellow post-it under your photo. Leave the note empty to hide it.',
      fields: [
        defineField({ name: 'heading', type: 'string', initialValue: 'Right now' }),
        defineField({
          name: 'body',
          title: 'Note',
          type: 'array',
          description: 'Keep it short: a sentence or two. Bold and links work.',
          of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], lists: [] }],
        }),
      ],
    }),
    defineField({
      name: 'sidebar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string' }),
            defineField({ name: 'value', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'About page' }) },
});
