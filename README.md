# CodeSnap · Code Rendering for Blogs

> **Version 1.1.1**

---

## Overview

Generate 4:3 landscape-format PNG images of code snippets with a minimalist IDE look. Ideal for illustrating technical posts, tutorials, or documentation on your blog.

<img alt="CodeSnap Preview" height="600" src="example.png" width="800"/>

---

## Features

- **Live Editor**: Paste your code and see it highlighted in real time.
- **Multi-language syntax highlighting**: Select from 13 languages and get accurate token colors powered by [Prism.js](https://prismjs.com/).
- **Custom filename**: Set your own IDE tab label — the file extension updates automatically based on the selected language.
- **Real-time preview** of a mock IDE window.
- **Dynamic resizing**: the window automatically resizes to display **all the code without vertical scrolling** while maintaining the 4:3 aspect ratio.
- **Export to high-definition PNG** (2.5x scale) with a dark background and monospaced font.
- **Minimalist dark theme** inspired by GitHub Dark.
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

## Project Structure

```
/
├── index.html      # Main structure
├── styles.css      # Styles and Prism token overrides
└── script.js       # Preview, highlighting, resizing, and export logic
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
2. Select the language from the dropdown.
3. Type a filename (the extension is added automatically).
4. Paste your code into the left panel.
5. View the preview in the right panel.
6. Click **Export PNG** to download the image.

### Local Use

1. Clone the repository:

   ```
   git clone https://github.com/mherreravsquez/codesnap.git
   cd codesnap
   ```
2. Open `index.html` in your browser.
3. Select the language, set a filename, paste your code, and export.

---

## Customization

You can modify the CSS variables in `styles.css` within the `:root` block to change colors, fonts, borders, or the aspect ratio (currently 4:3). Syntax token colors are also defined as CSS variables (`--syn-keyword`, `--syn-string`, etc.) so the palette is easy to swap out without touching individual token rules.

---

## Changelog

### v1.1.1
- Added game development language support: GLSL, HLSL, GDScript, and Lua.
- Language dropdown now uses grouped sections (General / Game Development).
- Added GLSL/HLSL-specific token overrides for preprocessor directives and qualifiers (`in`, `out`, `uniform`, `varying`).

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

This project is open source and free to use for any comercial or personal purpose. No attribution required, but it is appreciated.

---

Created by [Marchel](https://mherreravsquez.github.io/)
