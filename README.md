# @space-uy/pulsar-ui

<div align="center">

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A modern React Native UI kit for SpaceDev applications, providing a collection of reusable components and utilities.

</div>

## ✨ Features

- 🎨 Modern and consistent design system
- 📱 Cross-platform components for iOS, Android and Web
- 🚀 Built with performance in mind
- 📦 Easy to integrate and use
- 🔧 Fully typed with TypeScript
- 🎯 Comprehensive component library
- 🌈 Theme support
- 📖 Well-documented components

## 📦 Installation

```sh
# Using npm
npm install @space-uy/pulsar-ui

# Using yarn
yarn add @space-uy/pulsar-ui

# Using pnpm
pnpm add @space-uy/pulsar-ui
```

### Peer Dependencies

This library requires the following peer dependencies to be installed in your project:

```json
{
  "@react-navigation/elements": "^2.3.8", // Required for navigation components
  "lucide-react-native": "^0.503.0", // Required for icons
  "react": "*", // Core React dependency
  "react-native": "*", // Core React Native dependency
  "react-native-gesture-handler": "^2.25.0", // Required for gesture interactions
  "react-native-reanimated": "~3.16.1", // Required for animations
  "react-native-svg": "^15.11.2" // Required for SVG support
}
```

#### Installation

You can install all peer dependencies at once using:

```sh
# Using npm
npm install @react-navigation/elements@^2.3.8 lucide-react-native@^0.503.0 react-native-gesture-handler@^2.25.0 react-native-reanimated@~3.16.1 react-native-svg@^15.11.2

# Using yarn
yarn add @react-navigation/elements@^2.3.8 lucide-react-native@^0.503.0 react-native-gesture-handler@^2.25.0 react-native-reanimated@~3.16.1 react-native-svg@^15.11.2

# Using pnpm
pnpm add @react-navigation/elements@^2.3.8 lucide-react-native@^0.503.0 react-native-gesture-handler@^2.25.0 react-native-reanimated@~3.16.1 react-native-svg@^15.11.2
```

Note: `react` and `react-native` are typically already installed in your React Native project, so you don't need to install them separately.

## 🚀 Quick Start

```jsx
import { Button } from '@space-uy/pulsar-ui';

function MyApp() {
  return (
    <>
      {/* Primary button */}
      <Button text="Click me" onPress={() => console.log('Button pressed!')} />

      {/* Outline button */}
      <Button
        text="Outline Button"
        variant="outlined"
        onPress={() => console.log('Outline button pressed!')}
      />

      {/* Small button with icon */}
      <Button
        text="Small Button"
        size="small"
        iconName="Plus"
        onPress={() => console.log('Small button pressed!')}
      />
    </>
  );
}
```

## 🛠️ Development

### Prerequisites

- Node.js (version specified in `.nvmrc`)
- Yarn (version 3.6.1 or later)
- React Native development environment set up

### Setup

1. Clone the repository:

```sh
git clone https://github.com/SpaceUY/rn-spacedev-uikit.git
cd @space-uy/pulsar-ui
```

2. Install dependencies:

```sh
yarn install
```

3. Start the example app:

```sh
yarn example
```

### Available Scripts

- `yarn example` - Run the example app
- `yarn test` - Run tests
- `yarn typecheck` - Run TypeScript type checking
- `yarn lint` - Run ESLint
- `yarn clean` - Clean build files
- `yarn prepare` - Build the library

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and more.

## 📄 License

MIT © [SpaceDev](https://github.com/SpaceUY)

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
