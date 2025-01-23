# Inscripedia Handover

Repository for Inscripedia project handover. 

# EPUB-ORDINAL Package
A web-based 3D interactive book viewer with dynamic content loading capabilities.

## Overview
This package provides an interactive 3D book viewing experience with multiple models, dynamic cover switching, snow effects, and responsive mobile controls.

## File Structure

├── EPUB-ORDINAL/ # 3D Book Viewer Package
│ ├── web2-preview.html # Main viewer application
│ ├── read.html # Book reading interface
│ ├── content/ # Asset directory
│ │ ├── book-inscripedia.glb # 3D book model
│ │ ├── gift-inscripedia.glb # 3D gift model
│ │ └── cover[1-5].jpg # Book cover textures
│ └── assets/ # Additional resources
│ ├── fonts/ # Custom typography
│ └── textures/ # Material textures


## Key Features
- 3D Book & Gift Models
  - Switchable between book and gift presentation models
  - Interactive book model with clickable covers
  - Dynamic cover texture switching (5 different covers)
  - Custom material shaders for visual effects

- Visual Effects
  - Dynamic snow particle system
  - Star field background with warping effect
  - Bloom post-processing
  - Custom flare shader effect
  - Smooth camera transitions and zooming

- Mobile Support
  - Touch-friendly controls
  - Responsive mobile UI buttons
  - Adaptive display for touch devices

- Interactive Controls
  - Orbit controls for model inspection
  - Keyboard shortcuts for features
  - Click/touch interactions for model switching
  - Spacebar activated warp effect

## Technical Stack
- Three.js for 3D rendering
- Custom WebGL shaders
- React-Three-Fiber for React integration
- DRACO loader for model compression
- Post-processing effects pipeline

## Usage
The package is designed to be served as a static web application. The main entry point is `web2-preview.html` which loads all required dependencies and initializes the 3D viewer.

### Controls
- `G` - Switch between book and gift models
- `S` - Toggle snow effect
- `1-5` - Switch book covers
- `Spacebar` - Activate warp effect
- Mouse/Touch - Orbit camera

### Mobile Controls
Mobile devices display an additional control panel with buttons for:
- Model switching
- Snow toggle
- Cover changing

## Dependencies
- THREE.js
- POSTPROCESSING
- DRACOLoader
- GLTFLoader
- Custom ordengine script

## Performance Considerations
- Optimized material settings for mobile
- Reduced particle counts for snow effect
- Adaptive post-processing quality
- Frustum culling disabled for consistent rendering

## Notes
This package is designed for web delivery of interactive 3D content with a focus on performance and user experience across different devices.