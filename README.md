# USD from glTF converter

Universal USD from glTF converter portal leverages the Library, command-line tool, and import plugin for converting [glTF](https://www.khronos.org/gltf/) models to [USD] (https://graphics.pixar.com/usd/docs/index.html) formatted assets for display in [AR Quick Look](https://developer.apple.com/arkit/gallery).


TLDR: [Install](#installation-steps) it, then [convert](#using-the-command-line-tool) with: `usd_from_gltf <source.gltf> <destination.usdz>`

## Background
Converter portal is a web page facilitating conversion for the glTF models to USD models on the fly.

*note*
glTF is a transmission format for 3D assets that is well suited to the web and mobile devices by removing data that is not important for efficient display of assets. USD is an interchange format that can be used for file editing in Digital Content Creation tools (ie. Maya).

However, iOS Quick Look supports displaying [USDZ](https://graphics.pixar.com/usd/docs/Usdz-File-Format-Specification.html) files with a subset of the USD file specification. This tool converts glTF files to USDZ for display in Quick Look, attempting to emulate as much of glTF’s functionality as possible in iOS Quick Look runtime.

The emulation process is lossy. For example, to support double sided glTF materials, the geometry is doubled. This allows the converted glTF to display correctly on iOS, but importing back into a DCC application will not be the same data as the original source file.

This tool specifically addresses the use case of converting a file from glTF->USDZ->QuickLook.
Going DCC->glTF optimizes the asset for runtime viewing, and may lose information if the converted USDZ is imported back in the DCC tool, like subdivision surfaces.

When converting glTF->USD->DCC, Apple's USDPython tools will better preserve the data in the glTF file at the cost of not having the same compatibility with existing versions of iOS Quick Look.

## Installation Steps

Requires to go through several different steps as below:

*   1) Download and build [USD](https://github.com/PixarAnimationStudios/USD). See the associated README for prerequisites and build steps. Refer to USD installation directory as `{USD}`.
*   2) Install [NASM](https://www.nasm.us).
    *   *(Linux)* `sudo apt-get install nasm`
    *   *(OSX)* `brew install nasm` (requires [Homebrew](https://brew.sh))
    *   *(Windows)* Use the installer for the latest stable release.
*   Install [PIL](https://pillow.readthedocs.io).
    *   `pip install Pillow`
*   Download `usd_from_gltf` source to `{UFG_SRC}`.
*   Install to `{UFG_BUILD}` (with optional test data):

        python {UFG_SRC}/tools/ufginstall/ufginstall.py {UFG_BUILD} {USD} --testdata
*   *(Linux/OSX)* Set `LD_LIBRARY_PATH` to the USD and usd_from_gltf `lib` directories. See ufginstall script output for the paths.
*   *(Optional)* Add executable to `PATH`. See ufginstall script output for the exe path.
*   *(Optional)* Build test data. See ufginstall script output for the ufgtest.py command.
*   *(Optional)* Set `PXR_PLUGINPATH_NAME` so the glTF import plugin is available in Usdview. See ufginstall script output for the path.

*   3)  Download portal repository from (https://github.com/KrunalPatel2194/gltf_from_usdz_portal).
    *   change directory to client (/cd client) in seperate terminal.
        *   run -> npm install & node index.js
    *   change directory to backend (/cd backend) in a seperate terminal.
        * run ->  npm install & npm start.
        
## Using the Portal

*   Select valid glTF file in a .zip format.
*   Click on upload
*   Download button will popup on successful conversion of files.
*   Click on Download floating button and decompress the .zip file to use USD models



## Compatibility

While USD and glTF is a general-purpose format, this portal focuses on compatibility with [AR Quick Look](https://developer.apple.com/arkit/gallery). The [AR Quick Look](https://developer.apple.com/arkit/gallery) renderer only supports a subset of the [glTF 2.0 specification](https://github.com/KhronosGroup/glTF) though, so there are several limitations. Where reasonable, missing features are emulated in an effort to reproduce  glTF files as faithfully as possible on iOS. The emulation can be lossy process and the output is not well suited as an interchange format.

### Key Features
*   Reads text (glTF) input files.
*   Generates USDZ output files.
*   Compress USDZ output files.
*   Provides 
*   Reads embedded binary data and [Draco](https://github.com/google/draco)-compressed meshes.
*   Rigid and skinned animation.
*   Untextured, textured, unlit and, PBR lit materials.
*   glTF extensions: [KHR_materials_unlit](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_unlit), [KHR_materials_pbrSpecularGlossiness](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_pbrSpecularGlossiness), [KHR_texture_transform](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_texture_transform) (partially, see notes below), [KHR_draco_mesh_compression](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_draco_mesh_compression)
*   It is expected to convert all well-formed glTF files, although some features may be missing or emulated. It is known to build all Khronos glTF [sample](https://github.com/KhronosGroup/glTF-Sample-Models) and [reference](https://github.com/KhronosGroup/glTF-Asset-Generator) models.

