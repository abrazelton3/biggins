import { defineType, defineField } from 'sanity';

// One object field per section header used across the site.
const sectionObject = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: 'num', title: 'Eyebrow / number', type: 'string' }),
      defineField({ name: 'title', type: 'string' }),
      defineField({
        name: 'emphasis',
        type: 'string',
        description: 'Optional. Substring of the title rendered ochre-italic.',
      }),
      defineField({ name: 'sub', title: 'Subhead', type: 'string' }),
      defineField({ name: 'subtitle', type: 'string', description: 'Used by the creative header.' }),
      defineField({ name: 'intro', type: 'text', rows: 3 }),
      defineField({
        name: 'circle',
        title: 'Circled word',
        type: 'string',
        description: 'Optional, Creative only. A word from the intro to circle in hand-drawn ochre — copy it exactly.',
      }),
    ],
  });

export const sections = defineType({
  name: 'sections',
  title: 'Section headers',
  type: 'document',
  fields: [
    sectionObject('writing', 'Writing (§01)'),
    sectionObject('research', 'Research (§01b)'),
    sectionObject('field', 'From the field (§02)'),
    sectionObject('creative', 'Creative (§03)'),
    sectionObject('social', 'Social (§04)'),
    sectionObject('about', 'About (§05)'),
  ],
  preview: { prepare: () => ({ title: 'Section headers' }) },
});
