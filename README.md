# Inscripedia Handover

Repository for Inscripedia project handover. 

# PART 1 : EPUB-ORDINAL
A web-based 3D interactive book viewer with dynamic content loading capabilities.

## Overview
This package provides an interactive 3D book viewing experience with multiple models, dynamic cover switching, snow effects, and responsive mobile controls.

## File Structure

```
EPUB-ORDINAL/
├── ordinal-view.html     # preview ordinal frame
├── wrapper-preview.html  # web2 preview with controls
├── read.html            # web2 epub reader
├── read.css            # web2 epub reader styling
├── docs.html           # wrapper ordinal generator
├── zip.min.js          # File compression for EPUB handling
│
├── ordinal/            # Core ordinal rendering components test here: https://ordinals.com/inscription/33633842
│   ├── reader-ordinal.html        # Full-featured ordinal reader
│   ├── reader-ordinal-min.html    
│   └── wrapper-ordinal-min.html   
│
├── content/            # 3D models and textures
│   ├── book-inscripedia.glb       # Main book 3D model
│   ├── gift-inscripedia.glb       # Gift presentation model
│   └── cover[1-5].jpg            # Dynamic cover textures
│
└── V1/                 # Legacy version support
    ├── epub-v1.html              # Original EPUB viewer
    ├── test.epub                 # Sample EPUB for testing
    └── zip.min.js               # Legacy compression utility
```

### Wrapper Preview Controls

├── wrapper-preview.html 

- `G` - Switch between book and gift models
- `S` - Toggle snow effect
- `1-5` - Switch book covers
- `Spacebar` - Activate warp effect
- Mouse/Touch - Orbit camera

## Key Features
- 3D Book & Gift Models
  - Switchable between book and gift presentation models
  - Interactive book model with clickable covers
  - Dynamic cover texture switching (5 different covers)
  - Custom material shaders for visual effects

## Technical Stack
- Three.js for 3D rendering
- Custom WebGL shaders
- React-Three-Fiber for React integration
- DRACO loader for model compression
- Post-processing effects pipeline


# PART 2 : PDF-READER

