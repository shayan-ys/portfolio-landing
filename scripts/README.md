# Build-Time Image Placeholder Generation

This system implements best-practice lazy loading with blurred image placeholders that are generated during build time, not runtime.

## Overview

Instead of generating blurred placeholder images at runtime (which is slow and blocks the server), this system pre-generates tiny WebP placeholder images during the build process and stores them in `public/gallery/placeholders/`.

## Key Features

- **8px width** placeholders maintaining aspect ratio
- **WebP format** with 75% quality for optimal compression
- **Ultra-small file sizes** (70-102 bytes each)
- **Instant loading** - no runtime processing
- **Build-time generation** following industry best practices
- **Automatic cleanup** of orphaned placeholders

## How It Works

### 1. Build Process

```bash
npm run build
# Runs: npm run generate:placeholders && next build
```

### 2. Manual Placeholder Generation

```bash
npm run generate:placeholders
```

### 3. File Structure

```
public/
  gallery/
    original-image.jpg       # Original images
    placeholders/
      original-image.webp    # 8px wide placeholder
```

### 4. Runtime Behavior

- Image utils first try to load pre-generated placeholders
- Fallback to runtime generation if placeholder missing
- Ultimate fallback to gray placeholder

## Benefits

✅ **Instant placeholder loading** (no server processing)  
✅ **Optimal file sizes** (~80 bytes vs ~800 bytes for runtime generation)  
✅ **Better user experience** with immediate visual feedback  
✅ **Reduced server load** (no Sharp processing at runtime)  
✅ **Industry standard approach** used by major platforms

## Technical Details

### Placeholder Generation Parameters

- **Width**: 8px (height calculated automatically)
- **Quality**: 75% WebP compression
- **Effort**: 6 (high compression efficiency)
- **Format**: WebP for modern browser support

### Caching & Updates

- Placeholders are only regenerated if source image is newer
- Orphaned placeholders are automatically cleaned up
- Build process ensures all images have placeholders

## References

This implementation follows best practices documented by:

- [lqip-modern](https://github.com/transitive-bullshit/lqip-modern)
- [CSS Wizardry LQIP Guide](https://csswizardry.com/2023/09/the-ultimate-lqip-lcp-technique/)
- [Web.dev Lazy Loading Guide](https://web.dev/lazy-loading-images/)
- Medium's LQIP implementation
