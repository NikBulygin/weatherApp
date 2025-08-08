import type { Meta, StoryObj } from '@storybook/vue3'
import ThemeSwitch from './themeSwitch.vue'

const meta: Meta<typeof ThemeSwitch> = {
  title: 'Settings/Theme/Switch',
  component: ThemeSwitch,
  parameters: {
    layout: 'padded'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}