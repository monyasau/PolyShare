
## Installation

To install all of the template files, run the following script from the root of your project's directory:

```
....
```

----

# Building the executables

## Executable Generation

This project uses `pkg` to generate executables for different platforms. Below are the commands to generate the binaries for **Windows (32-bit and 64-bit)**, **Linux (32-bit and 64-bit)**, and **macOS (64-bit and ARM64)**.

### Prerequisites

Ensure that `pkg` is installed globally on your system:
```
npm install -g pkg
```

To generate the 64-bit binaries/executables for **Windows**, **Linux**, and **macOS**.

```
pkg app.js --targets node16-win-x64,node16-linux-x64,node16-macos-x64 --output polyShare
```
This will create the following executables:
 - ``polyShare-win-x64.exe`` for Windows 64-bit
 - ``polyShare-linux-x64`` for Linux 64-bit
 - ``polyShare-macos-x64`` for macOS 64-bit


**Generating Specific Executables**
To generate platform-specific executables, run the following commands.

**1. Windows 64-bit Executable**

```
pkg app.js --targets node16-win-x64 --output polyShare-win-x64.exe
```
**2. Windows 32-bit Executable**
```
pkg app.js --targets node16-win-x86 --output polyShare-win-x86.exe
```
**3. Linux 64-bit Executable**
```
pkg app.js --targets node16-linux-x64 --output polyShare-linux-x64
```
**4. Linux 32-bit Executable**
```
pkg app.js --targets node16-linux-x86 --output polyShare-linux-x86
```
**5. macOS 64-bit Executable**
```
pkg app.js --targets node16-macos-x64 --output polyShare-macos-x64
```
**6. macOS ARM64 Executable (for Apple M1/M2 chips)**
```
pkg app.js --targets node16-macos-arm64 --output polyShare-macos-arm64
```

# Project Title

**Description**:  A local-network file share system


  - **Technology stack**: HTML, CSS, Javascript, NodeJS
  - **Status**:  still in development, Beta version available [CHANGELOG](CHANGELOG.md).

## Dependencies

No dependencies as the ones needed are bundled with the executable

## Installation

... [INSTALL](INSTALL.md) document.

## Configuration

The web port is configurable with a .env file in the root directory

## Usage
...

## Known issues

...

## Getting help

...
If you have questions, concerns, bug reports, etc, please file an issue in this repository's Issue Tracker.

## Getting involved

... [CONTRIBUTING](CONTRIBUTING.md).

## The why

...
