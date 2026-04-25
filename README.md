# CodeSnap Light · Code Rendering for Blogs & Social Media

> **Version 1.2.1**

---

## Overview

Generate 4:3 landscape-format PNG images of code snippets with a minimalist IDE look. Ideal for illustrating technical posts, tutorials, or documentation on your blog.

<img alt="CodeSnap Preview" height="600" src="example.png" width="800"/>

---

## Features

- **Live Editor**: Paste your code and see it highlighted in real time.
- **Multi-language syntax highlighting**: Select from 17 languages powered by [Prism.js](https://prismjs.com/).
- **OS window chrome**: Switch between macOS, Windows, and Linux window styles.
- **Theme selector**: 5 color palettes — GitHub Dark, Dracula, Nord, Monokai, One Dark.
- **Custom filename**: Set your own IDE tab label — the file extension updates automatically.
- **Dynamic resizing**: the window automatically resizes to display **all the code without vertical scrolling** while maintaining the 4:3 aspect ratio.
- **Export to high-definition PNG** (2.5x scale).
- Fully static: powered by pure HTML, CSS, and JavaScript.

---

## Supported Languages

### General

| Language   | Extension |
|------------|-----------|
| Plain text | `.txt`    |
| JavaScript | `.js`     |
| TypeScript | `.ts`     |
| C#         | `.cs`     |
| Python     | `.py`     |
| HTML       | `.html`   |
| CSS        | `.css`    |
| JSON       | `.json`   |
| Java       | `.java`   |
| C++        | `.cpp`    |
| Rust       | `.rs`     |
| Go         | `.go`     |
| Bash       | `.sh`     |

### Game Development

| Language         | Extension | Used in                              |
|------------------|-----------|--------------------------------------|
| GLSL             | `.glsl`   | OpenGL, Unity, Godot, Vulkan         |
| HLSL             | `.hlsl`   | DirectX, Unity (URP/HDRP shaders)    |
| GDScript (Godot) | `.gd`     | Godot Engine                         |
| Lua              | `.lua`    | Roblox, Love2D, many engine scripts  |

---

## Themes

| Theme                  | Style                                          |
|------------------------|------------------------------------------------|
| GitHub Dark            | Default dark, muted blues                      |
| Dracula                | Purple/pink, high contrast                     |
| Nord                   | Arctic blues and greens                        |
| Monokai                | Warm greens, vivid accents                     |
| One Dark               | Atom-inspired, soft purples                    |
| Rider (Darcula)        | JetBrains classic — orange keywords, muted green strings |
| Visual Studio Dark     | Microsoft VS — blue keywords, salmon strings, teal types |

All theme token colors are defined as CSS variables (`--syn-keyword`, `--syn-string`, etc.) in `styles.css`, making it easy to add new palettes.

---

## Window Chrome Styles

| Style   | Description                                              |
|---------|----------------------------------------------------------|
| macOS   | Colored traffic-light dots on the left                   |
| Windows | Flat minimize/maximize/close buttons on the right        |
| Linux   | Monochrome circle buttons with symbols on the right      |

---

## Project Structure

```
/
├── index.html      # Main structure and controls
├── styles.css      # Themes, chrome styles, Prism token overrides
└── script.js       # Highlighting, OS/theme switching, resize, export
```

---

## Technologies

- HTML5 / CSS3 (CSS variables, Flexbox)
- JavaScript (ES6)
- [Prism.js](https://prismjs.com/) for syntax highlighting
- [html2canvas](https://html2canvas.hertzen.com/) for PNG export

---

## How It Works

### Online use

1. Go to [mherreravsquez.github.io/codesnap/](https://mherreravsquez.github.io/codesnap/)
2. Select the language and theme.
3. Choose a window chrome style (macOS / Windows / Linux).
4. Type a filename (the extension is added automatically).
5. Paste your code into the left panel.
6. Click **Export PNG** to download the image.

### Local Use

1. Clone the repository:

   ```
   git clone https://github.com/mherreravsquez/codesnap.git
   cd codesnap
   ```
2. Open `index.html` in your browser.

---

## Customization

CSS variables in `:root` and `body[data-theme="x"]` blocks control every color in the app. To add a new theme, copy any existing `body[data-theme]` block, give it a new name, update the variable values, and add a matching swatch button in `index.html`.

---

## Changelog

### v1.2.1
- Added **Rider (Darcula)** theme — JetBrains' classic dark palette with orange keywords, muted green strings, and amber function names.
- Added **Visual Studio Dark** theme — Microsoft's VS palette with blue keywords, salmon strings, teal class names, and green comments.

### v1.2.0
- Added OS window chrome selector: macOS, Windows, and Linux styles.
- Added theme selector with 5 palettes: GitHub Dark, Dracula, Nord, Monokai, One Dark.
- All syntax token colors now driven by CSS variables — themes apply to Prism highlighting automatically.
- Smooth `transition` on all color-bearing elements for instant live theme switching.

### v1.1.1
- Added game development language support: GLSL, HLSL, GDScript, Lua.
- Language dropdown now uses grouped sections (General / Game Development).
- Added GLSL/HLSL-specific token overrides for preprocessor directives and qualifiers.

### v1.1.0
- Added multi-language syntax highlighting via Prism.js (13 languages).
- Added language selector dropdown; file extension updates automatically.
- Added custom filename input for the IDE tab label.
- Defined syntax token colors as CSS variables aligned with the GitHub Dark palette.

### v1.0.0
- Initial release.
- Comment-only highlighting for plain text snippets.
- 4:3 dynamic resizing and HD PNG export.

---

## License

This project is open source and free to use for any streaming or personal purpose. No attribution required, but it is appreciated.

---

Created by [Marchel](https://mherreravsquez.github.io/)