---
title: "Vissonance"
description: "A WebGL audio visualizer npm package with Three.js, featuring stunning real-time audio visualizations"
technologies: ["TypeScript", "Three.js", "WebGL", "Web Audio API", "npm", "Rollup"]
featured: true
liveUrl: "https://www.npmjs.com/package/vissonance"
githubUrl: "https://github.com/feline-dis/Vissonance"
images: []
publishDate: 2025-05-20
---

# Vissonance

A WebGL audio visualizer package that transforms audio into stunning real-time visual experiences. I discovered an impressive visualizer demo and turned it into a reusable npm package that developers can easily integrate into their projects.

## What It Does

- **Real-time Audio Visualization**: WebGL-powered visualizations that react to music and audio input
- **Multiple Presets**: Collection of beautiful visualization patterns and effects
- **Easy Integration**: Simple API that works with any audio source
- **TypeScript Support**: Full type definitions for better developer experience
- **Browser Compatible**: Works across modern browsers with WebGL support

## The Story Behind It

While working on [Go Radio](/projects/go-radio-v2), I wanted to add audio visualizations to make the listening experience more engaging. I found an amazing visualizer demo by [@tariqksoliman](https://github.com/tariqksoliman).

The original was a standalone demo, but I saw potential to make it accessible to other developers. So I forked it, refactored the code into a proper npm package, added TypeScript definitions, and created a clean API that anyone could use that was inspired by the legendary Milkdrop visualizer (via [Butterchurn](https://github.com/jberg/butterchurn) by [@jberg](https://github.com/jberg)).

## Technical Implementation

### Core Architecture
- **Three.js**: WebGL rendering engine for smooth 60fps visualizations
- **Web Audio API**: Real-time audio analysis and frequency data extraction
- **Shader Programming**: Custom GLSL shaders for visual effects
- **TypeScript**: Full type safety and IntelliSense support

### Package Structure
```typescript
// Simple API design inspired by Butterchurn
const visualizer = Vissonance.createVisualizer(audioContext, canvas, options);
visualizer.connectAudio(audioNode);
visualizer.loadPreset('preset-name');
```

### Key Features I Added
1. **npm Package Structure**: Proper module bundling with Rollup
2. **TypeScript Definitions**: Complete type safety for all APIs
3. **Preset System**: Easy-to-use preset loading and management
4. **Documentation**: Comprehensive README with examples
5. **Browser Compatibility**: Import maps and bundler support

## Integration with Go Radio

The package works perfectly with my web radio app. Users can now enjoy synchronized audio visualizations while listening to music together. The visualizer reacts to the audio stream in real-time, creating an immersive experience that matches the collaborative nature of the radio.

## Credits & Inspiration

This project builds on the excellent work of:

- **[@tariqksoliman](https://github.com/tariqksoliman)**: Original Vissonance demo that inspired this package
- **[@jberg](https://github.com/jberg)**: Butterchurn project, which provided the API design patterns and Milkdrop legacy
- **Milkdrop Community**: The original visualization software that started it all

I focused on packaging, TypeScript integration, and developer experience while preserving the beautiful visual effects from the original work.

## What I Learned

1. **Package Publishing**: First time creating and maintaining an npm package
2. **WebGL & Shaders**: Deeper understanding of GPU-accelerated graphics
3. **Audio Processing**: Web Audio API and real-time frequency analysis
4. **API Design**: Creating intuitive interfaces for other developers
5. **Open Source**: Proper attribution and building on existing work

The project taught me about the balance between innovation and attribution in open source development. Sometimes the best contribution is making great work more accessible to others.

## Future Plans

- **More Presets**: Additional visualization patterns and effects
- **Performance Optimization**: Better memory management and GPU utilization
- **React/Vue Components**: Framework-specific wrappers for easier integration
- **Custom Preset Creation**: Tools for developers to create their own visualizations

Check out the [npm package](https://www.npmjs.com/package/vissonance) or see it in action on [Go Radio]()(https://go-radio-v2.fly.dev).
