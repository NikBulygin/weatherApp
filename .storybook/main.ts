import type { StorybookConfig } from '@storybook-vue/nuxt';

const config: StorybookConfig = {
  "stories": [
    "../app/components/**/*.mdx",
    "../app/components/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../app/pages/**/*.mdx",
    "../app/pages/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../app/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../app/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook-vue/nuxt",
    "options": {
      builder: {
        viteConfigPath: undefined
      }
    }
  },
  "typescript": {
    "check": false
  }
};
export default config;