import type { Meta, StoryObj } from '@storybook/vue3'
import LanguageSwitch from './languageSwitch.vue'

const meta: Meta<typeof LanguageSwitch> = {
  title: 'Settings/Language/Switch',
  component: LanguageSwitch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'COmponent for switching languages in the application settings.'
      }
    }
  },
  argTypes: {
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default state of the language switch component'
      }
    }
  }
}