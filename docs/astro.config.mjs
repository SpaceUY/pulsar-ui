// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://rn-spacedev-uikit.spaceuy.github.io',
  base: '/',
  integrations: [
    starlight({
      title: 'SpaceDev UI Kit',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/SpaceUY/rn-spacedev-uikit',
        },
      ],
      sidebar: [
        {
          label: 'Overview',
          items: [
            {
              label: 'Introduction',
              slug: 'overview/introduction',
            },
          ],
        },
        {
          label: 'Getting Started',
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: 'Installation',
              slug: 'getting-started/installation',
            },
            {
              label: 'Theming',
              slug: 'getting-started/theming',
            },
          ],
        },
        {
          label: 'Components',
          items: [
            {
              label: 'Accordion',
              slug: 'components/accordion',
            },
            {
              label: 'Bottom Sheet',
              slug: 'components/bottom-sheet',
            },
            { label: 'Button', slug: 'components/button' },
            {
              label: 'Button Container',
              slug: 'components/button-container',
            },
            {
              label: 'Calendar Picker',
              slug: 'components/calendar-picker',
            },
            { label: 'Card', slug: 'components/card' },
            {
              label: 'Checkbox',
              slug: 'components/checkbox',
            },
            { label: 'Chip', slug: 'components/chip' },
            {
              label: 'Copy to Clipboard',
              slug: 'components/copy-to-clipboard',
            },
            { label: 'Dialog', slug: 'components/dialog' },
            { label: 'Header', slug: 'components/header' },
            { label: 'Icon', slug: 'components/icon' },
            {
              label: 'Icon Button',
              slug: 'components/icon-button',
            },
            { label: 'Input', slug: 'components/input' },
            {
              label: 'Input Container',
              slug: 'components/input-container',
            },
            {
              label: 'Loading Indicator',
              slug: 'components/loading-indicator',
            },
            { label: 'OTP Input', slug: 'components/otp-input' },
            { label: 'Select', slug: 'components/select' },
            { label: 'Switch', slug: 'components/switch' },
            { label: 'Tabs', slug: 'components/tabs' },
            { label: 'Text', slug: 'components/text' },
            { label: 'TextArea', slug: 'components/textarea' },
          ],
        },
        {
          label: 'Utils',
          items: [
            { label: 'UI Utils', slug: 'utils/ui-utils' },
            { label: 'String Utils', slug: 'utils/string-utils' },
          ],
        },
      ],
    }),
  ],
});
